import File from "../model/file.js";
import { treebuild } from "../utils/Buildtree.js";


const getLanguageFromExtension = (name) => {
    const extension = name.split(".").pop()?.toLowerCase();

    const languages = {
        js: "javascript",
        jsx: "javascript",
        mjs: "javascript",
        cjs: "javascript",
        ts: "typescript",
        tsx: "typescript",
        py: "python",
        json: "json",
        html: "html",
        css: "css",
        scss: "scss",
        java: "java",
        c: "c",
        cpp: "cpp",
        h: "cpp",
        cs: "csharp",
        php: "php",
        go: "go",
        rs: "rust",
        rb: "ruby",
        sql: "sql",
        md: "markdown",
        xml: "xml",
        yaml: "yaml",
        yml: "yaml",
        sh: "shell",
        bash: "shell",
    };

    return languages[extension] || "plaintext";
};



export const createFile = async (req, res) => {
    try {
        const {
            projectId,
            name,
            parentId,
            content = "",
            language: givenLanguage
        } = req.body;

        const userId = req.headers["x-user-id"];

        if (!projectId || !name || !parentId) {
            return res.status(400).json({
                message: "id(parent, project) and name of file required"
            });
        }

        // Check for duplicate file names under the same parent
        const exist = await File.findOne({
            projectId,
            parentId,
            name,
            isDeleted: false
        });

        if (exist) {
            return res.status(400).json({
                message: "File name already exists"
            });
        }

        const extension = name.includes(".")
            ? name.split(".").pop()?.toLowerCase()
            : "";

        // Use the provided language or detect it from the extension
        const language = givenLanguage || getLanguageFromExtension(name);

        const file = await File.create({
            name,
            user: userId,
            projectId,
            parentId,
            type: "file",
            content,
            language,
            size: content.length,
            extension
        });

        return res.status(201).json({
            message: "File created successfully",
            data: file
        });

    } catch (e) {
        console.error("File creation error:", e);

        return res.status(500).json({
            success: false,
            message: "Error in file creation"
        });
    }
}


export const createRootFolder = async (req, res) => {
    try {
        const { projectId, projectName } = req.body;
        const userId = req.headers["x-user-id"];
        if (!projectId || !projectName) {
            return res.status(400).json({
                message: "id and name of project required"
            })
        }
        //root folder is according to projectid means ek project ka ek root folder and root folder have no parent.
        const existingRoot = await File.findOne({
            projectId,
            parentId: null,
            isDeleted: false
        });


        if (existingRoot) {
            return res.status(200).json({
                success: true,
                data: existingRoot,
            });
        }

        const folderRoot = await File.create({
            user: userId,
            name: projectName,
            projectId,
            type: "folder",
            parentId: null
        })

        return res.status(201).json({
            success: true,
            data: folderRoot,

        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "error in root file creation..."
        })
    }
}

export const createFolder = async (req, res) => {
    try {
        const { projectId, name, parentId } = req.body;
        const userId = req.headers["x-user-id"];
        if (!projectId || !name || !parentId) {
            return res.status(400).json({
                message: "id(parent,project) and name of project required"
            })
        }

        //same name can't take so under same parent
        const exist = await File.findOne({
            projectId,
            parentId,
            name,
            isDeleted: false
        })

        if (exist) {
            return res.status(400).json({
                message: "folder name already exist ",
            })
        }

        const folder = await File.create({
            name,
            user: userId,
            projectId,
            parentId,
            type: "folder",
        });

        return res.status(201).json({
            message: "folder created",
            data: folder
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "error in folder creation..."
        })
    }
}


export const updateFile = async (req, res) => {
    try {
        const { name, content } = req.body;
        const userId = req.headers["x-user-id"];
        const fileId = req.params.id;

        const file = await File.findOne({
            _id: fileId,
            user: userId,
            isDeleted:false
        });


        if (!file) {
            return res.status(400).json({
                message: "file not found"
            })

        }

        if (name && name!=file.name) {

            const existingFilewithsameName = await File.findOne({
                name,
                user: userId,
                parentId: file.parentId,
                _id: { $ne: fileId },
                isdeleted:false
            });

            if (existingFilewithsameName) {
                return res.status(409).json({
                    success: false,
                    message: "File name already exists"
                });
            }

            file.name = name;
            const extension = (name.includes(".")) ? name.split(".").pop() : "";
            file.extension = extension;
        }

        if (content !== undefined   && file.type == 'file') {
            file.content = content;
            file.size = content.length
        }

        await file.save();

        return res.status(200).json({
            success: true,
            data: file
        })


    } catch (e) {
        res.status(500).json({
            success: false,
            message: "error in file updation..."
           
        })
         console.log(e);
    }
}


export const getFileTree = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.headers["x-user-id"];

        const files = await File.find({
            projectId,
            user: userId,
            isDeleted: false
        }).sort({ name: 1, type: -1 }).lean();

        const tree = treebuild(files);

        return res.status(200).json({
            success: true,
            data: tree
        });

    } catch (e) {
        console.error("Error fetching file tree:", e);

        return res.status(500).json({
            success: false,
            message: "Error fetching file tree"
        });
    }
};



export const deleteFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const fileId = req.params.id;

        const file = await File.findOne({
            _id: fileId,
            user: userId,
            isDeleted: false
        });

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File or folder not found"
            });
        }

        const deleteRecursive = async (parentId) => {
            const children = await File.find({
                parentId,
                projectId: file.projectId,
                user: userId,
                isDeleted: false
            }).select("_id");

            for (const child of children) {
                await deleteRecursive(child._id);
            }

            await File.updateOne(
                {
                    _id: parentId,
                    projectId: file.projectId,
                    user: userId,
                    isDeleted: false
                },
                {
                    $set: {
                        isDeleted: true
                    }
                }
            );
        };

        await deleteRecursive(file._id);

        return res.status(200).json({
            success: true,
            data:file,
            message: "File or folder and all its contents deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in file deletion"
        });
    }
};
export const getFile = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        const fileId = req.params.id;

        const file = await File.findOne({
            _id: fileId,
            user: userId,
            isDeleted: false
        });


        if (!file) {
            return res.status(400).json({
                message: "file not found"
            })

        }

        return res.status(200).json({
            data: file
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "error in file get..."
        })
    }
}


