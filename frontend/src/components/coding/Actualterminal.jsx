import React from 'react'
import { useSelector } from 'react-redux'
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { useRef } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client'
import { useState } from 'react';
const Actualterminal = ({ projectId }) => {
    const { currentProject } = useSelector(state => state.project);
    const userId = currentProject?.madeBy;
    const terminal_url = import.meta.env.VITE_TERMINAL_SERVICE_URL;
    const [connected, setconnected] = useState(false);
    const containerref = useRef();
    const [showTerminalTip, setShowTerminalTip] = useState(true);

    useEffect(() => {
        setShowTerminalTip(true);

        const tipTimer = setTimeout(() => {
            setShowTerminalTip(false);
        }, 6000);
        if (!projectId || !userId) return;
        const terminal = new XTerm({
            cursorBlink: true,
            fontSize: 14,
            fontFamily: "Menlo, Monaco, Consolas, monospace",
            scrollback: 5000,
           
            theme: {
                background: "#00000",
                foreground: "#e6edf3",
                cursor: "#e6edf3",
                selectionBackground: "#264f78"
            },
        })


        const fitAddon = new FitAddon()//it resizes the terminal inside the given container
        terminal.loadAddon(fitAddon);
        terminal.open(containerref.current);


        const fitTerminalInContainer = () => {
            try {
                fitAddon.fit();
            } catch (e) {

            }
        }
        fitTerminalInContainer();

        if (!terminal_url) {
            terminal.write("\r\n\x1b[31mTERMINAL_URL_MISSING\x1b[0m\r\n");
            return () => terminal.dispose();
        }

        const socket = io(terminal_url, {
            transports: ["websocket"],
            withCredentials: true
        })

        socket.on("connect", () => {
            setconnected(true);
            fitTerminalInContainer();
            socket.emit("terminal:start", { projectId, userId, rows: terminal.rows, cols: terminal.cols });
        }) // connect is buildin event


        socket.on("terminal:data", (data) => {
            terminal.write(String(data || ""));
        })

        socket.on("terminal:ready", () => {
            socket.emit("terminal:resize", { rows: terminal.rows, cols: terminal.cols })
            terminal.focus()
        })

        //for writing by user in teminal
        const input = terminal.onData((data) => {
            if (!socket.connected) return;

            socket.emit("terminal:write", data)
        })


        //terminal resizeing 

        const terminalResize = () => {
            fitTerminalInContainer()
            socket.emit("terminal:resize", { cols: terminal.cols, rows: terminal.rows });
        }

        window.addEventListener("resize", terminalResize);

        const resizeObserver = new ResizeObserver(terminalResize);
        resizeObserver.observe(containerref.current)


        const focusTerminal = () => {
            terminal.focus();
        }

        containerref.current.addEventListener("click", focusTerminal)

        socket.on("connect_error", (e) => {
            setconnected(false);
            terminal.write(`\r\n\x1b[31m${e.message}\x1b[0m\r\n`);
        })

        socket.on("disconnect", () => {
            setconnected(false);
        })



        return () => {
          
            window.removeEventListener("resize", terminalResize);
            resizeObserver.disconnect();
            containerref.current?.removeEventListener("click", focusTerminal);

            input.dispose();
            socket.disconnect();
            terminal.dispose();
        }
    }, [projectId, userId])



    return (
        <div className='flex h-full flex-col bg-black'>
         {showTerminalTip && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20
                        w-[90%] max-w-2xl rounded-lg border border-sky-500/30
                        bg-[#161b22]/95 p-3 shadow-xl backdrop-blur-sm">

            <div className="flex items-start gap-3">
                <div className="rounded-md bg-sky-500/15 p-2 text-sky-400">
                    <span>💡</span>
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">
                        Full-stack project tip
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-300">
                        Run your frontend and backend simultaneously using
                        <span className="font-semibold text-sky-400"> concurrently</span>.
                    </p>

                    <code className="mt-2 block break-all rounded bg-black/40 p-2 text-xs text-green-400">
                        npx concurrently "npm run dev --prefix client" "npm run dev --prefix server"
                    </code>
                </div>

                <button
                    onClick={() => setShowTerminalTip(false)}
                    className="text-gray-400 hover:text-white"
                    title="Dismiss tip"
                >
                    ✕
                </button>
            </div>
        </div>
    )}
            <div className='flex items-center gap-3 my-3 border-b border-white/7 px-3'>
                <span className={`h-1.5  w-1.5 rounded-full ${connected ? "bg-green-500" : "bg-gray-600"}`}></span>
                <span className='text-md text-gray-400 font-medium'>{connected ? "connected" : "not-connected"}</span>
            </div>
            <div ref={containerref} className='min-h-0 flex-1 cursor-text bg-black overflow-hidden'></div>
        </div>
    )
}

export default Actualterminal