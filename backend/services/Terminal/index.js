import express from 'express'
import dotenv from "dotenv"
import { dbconnect } from './config/db.js'
import http from 'http'
import { Server } from 'socket.io';
import os from 'os'
import fs from 'fs/promises'
import pty from 'node-pty'
import path from "path";
dotenv.config();
const port = process.env.PORT || 8004

const app = express();
app.use(express.json());



const OSfolder_Root = path.resolve(os.tmpdir(), "devspace-app"); //  c://temp/devspace-app

const shell = process.platform === 'win32' ? "cmd.exe" : "bash";
const sessions = new Map();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true
    }
})

//helper function for sending events from socketio

const send = (socket, data) => {
    if (!socket.connected) {
        return;
    }

    socket.emit('terminal:data', String(data || "")) //using this key we access in frontend using on 
}

const joiningWithOsFolder = (projectId) => {
    return path.join(OSfolder_Root, String(projectId))
}



const colNormalise = (cols) => {
    const c = Number(cols);
    if (!Number.isFinite(c)) {
        return 90;
    }

    return Math.max(19, Math.min(Math.floor(c), 500));

}

const rowNormalise = (rows) => {
    const r = Number(rows);
    if (!Number.isFinite(r)) {
        return 28;
    }
    return Math.max(5, Math.min(200, Math.floor(r)));
}


const nameValidate = (name) => {
    if (!name || name.includes('/') || name.includes('\\') || name === '.' || name === '..') {
        throw new Error("invalid folder/file name ");
    }

    return name;
}


//tree get 

export const getFileTree = async (userId, projectId) => {
    try {
        const url = `${process.env.FILE_SERVICE_URL}/getTree/${projectId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-user-id": String(userId)
            },

        });
        //convert to text as want in terminals 
        const text = await response.text();
        let data = {};
        try {
            data = text ? JSON.parse(text) : {}
        } catch (e) {
            data = {
                message: text
            }
        }

        if (!response.ok) {
            throw new Error(data?.message || `terminal send ${response.status}`)
        }

        return Array.isArray(data.data) ? data.data : [];
    } catch (e) {
        console.error("get file tree  failed:", e.response?.data || e.message);
        throw e;
    }
};



const cleanupProjectFolder = async (folderPath) => {
    try {
        await fs.rm(folderPath, {
            recursive: true,
            force: true,
            maxRetries: 5,
            retryDelay: 300
        });

        console.log("Temporary folder deleted:", folderPath);
    } catch (error) {
        console.error(
            "Temporary folder cleanup failed:",
            error.message
        );
    }
};

//converting tree into tmpdir -->folders and file 


const makeNodes = async (nodes, currdir) => {
    if (!Array.isArray(nodes)) return;

    for (const node of nodes) {
        const name = nameValidate(node.name);
        const targetpath = path.join(currdir, name);

        if (node.type == 'folder') {
            await fs.mkdir(targetpath, { recursive: true });
            await makeNodes(node.children || [], targetpath);
            continue;
        }
        if (node.type == 'file') {
            await fs.mkdir(path.dirname(targetpath), { recursive: true })//path.dirname(target)-->>prev directory got
            await fs.writeFile(targetpath, node.content || "", "utf-8");
        }
    }
}



//combining all these calls 

const combiningProjectCalls = async (projectId, userId) => {
    const tree = await getFileTree(userId, projectId);
    const root = joiningWithOsFolder(projectId);

    

    //creating root folder 
    await fs.mkdir(root, { recursive: true });

    if (tree.length == 1 && tree[0].type == 'folder') {
        await makeNodes(tree[0].children || [], root);
    }
    else {
        await makeNodes(tree, root);
    }

    return { tree, root }
}

io.on("connection", (socket) => {
    console.log("terminal connected");

    socket.on("terminal:start", async ({ projectId, userId, cols = 80, rows = 30 }) => { //on event catch and emit event send
        try {
            projectId = String(projectId);
            userId = String(userId);
            if (!projectId || !userId) {
                throw new Error("project ID and userId required.")
            }

            const existingsession = sessions.get(socket.id);
            if (existingsession) {
                try {
                    existingsession.ptyProcess.kill();
                } catch (e) {
                    sessions.delete(socket.id)
                }
            }

            cols = colNormalise(cols);
            rows = rowNormalise(rows);
            const { tree, root } = await combiningProjectCalls(projectId, userId);

            //terminal initialise -->>by ptyProcess creation.
            const ptyProcess = pty.spawn(shell, [],
                {
                    name: "xterm-256color",
                    cols,
                    rows,
                    cwd: root, //current working directory
                    env: {
                        ...process.env,
                        FORCE_COLOR: "1"
                    }
                })

            ptyProcess.onData((data) => {
                send(socket, data);
            })

            ptyProcess.onExit(async({ exitCode }) => {
                send(socket, `\r\n\x1b[90m[shell excited:${exitCode}]\x1b[0m\r\n`) // \r\n\x1b -->>signaling used standard. \r\n — moves to a new line (carriage return + line feed).

                //         \x1b[90m — sets the foreground color to bright gray.

                //         [shell exited: ${exitCode}] — displays the exit message and exit code.

                //         \x1b[0m — resets terminal formatting.

                //         \r\n — moves to the next line.

                const session = sessions.get(socket.id);
                if (session?.ptyProcess == ptyProcess) {
                    sessions.delete(socket.id);
                      await cleanupProjectFolder(session.cwd);
                }
            })

            sessions.set(socket.id, {
                projectId, userId, cwd: root, ptyProcess
            })

            socket.emit("terminal:ready", { cols, rows })
        } catch (e) {
            console.log("terminal starting error", e);
            send(socket, `\r\n\x1b[30m[shell excited:${e.message}]\x1b[0m\r\n`)
        }
    })






    socket.on('disconnect', async () => {
        console.log("terminal disconnect");
        const session = sessions.get(socket.id);
        if (!session) return;

        try {
            session.ptyProcess.kill();
        } catch (e) { }
        sessions.delete(socket.id);

          await cleanupProjectFolder(session.cwd);
    })

    socket.on("terminal:write", (data) => {
        const session = sessions.get(socket.id);
        if (!session) return;

        session.ptyProcess.write(String(data));
    })

    socket.on('terminal:resize', ({ cols, rows }) => {
        const session = sessions.get(socket.id);
        if (!session) return

        cols = colNormalise(cols);
        rows = rowNormalise(rows);
        session.ptyProcess.resize(cols, rows);
    })
})
app.get('/terminal', (req, res) => {
    return res.json({
        success: true,
        message: "terminal good"
    })
})


server.listen(port, () => {
    dbconnect();
    console.log("terminal service running")
})