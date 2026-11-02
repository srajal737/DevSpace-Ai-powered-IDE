import { tool } from '@langchain/core/tools'
import { createFile, createFolder, deleteFile, getFile, getFileTree, updateFile } from '../utils/fileapisFetch.js';
import z from 'zod/v3';


const compactTree = (tree = []) => {
    return tree.map((node) => ({
        _id: node._id,
        parentId: node.parentId,
        name: node.name,
        type: node.type,
        language: node.language,
        extension: node.extension,
        children: compactTree(node.children || [])
    }))
}

export const fileTools = ({ projectId, userId }) => {
    const getTreeTool = tool(//tools(function what to do , about tool like name, description, schema ) //zod used for schema validation so zod install.
        async () => {
            console.log("tree get tool");
            const res = await getFileTree({ projectId, userId });
            const finalTree = compactTree(res);
            return JSON.stringify({
                success: true,
                finalTree
            });
        },
        {
            name: "get_Tree",
            description: `
            get the complete project file and folder tree. 
            IMPORTANT:
            1.use this when project structure is unknown .
            2.do not repeatedly call get_tree
            3.type="folder" means folder 
            4.type="file" means file 
            5.folder ids are used as parentTd .
            6.never call get_file with a folder Id
            7.do not user terminal commands to inspect the project.
            8.use exact IDs returned by this tool

            tree contains;
            _id,
            parentId,
            name,
            type,
            language,
            extension,
            children
            `,
            schema: z.object({}) //it means {}-->what are the parameter that require to call this tool
        }
    )

    const getFileTool = tool(
        async ({ fileid }) => {
            console.log("file get tool");
            const res = await getFile({ userId, id: fileid });
            if (res && res.type != 'file') {
                console.log("get file failed  , id is of folder")
                return JSON.stringify({
                    success: false,
                    error: "the provided Id belongs to a folder not a file",
                    instruction: "do not call get_file for folders. use folder id as parentid"
                })
            }
            if (!res) {
                return JSON.stringify({
                    success: false,
                    error: "file not found "
                })
            }
            return JSON.stringify({
                success: true,
                file: {
                    _id: res._id,
                    name: res.name,
                    content: res.content || "",
                    language: res.language,
                    type: res.type,
                    extension: res.extension,
                    parentId: res.parentId
                }
            });
        },
        {
            name: "get_File",
            description: `
            Read an existing file before modifying it .
            strict Rules:
            1.fileId must belong to a file ,
            2.never pass a folder Id ,
            3.use Exact file Id from get_Tree,
            4.call this before update_File,
            5.do not call this for newly created files unless necessary ,
            6.do not call this repeatedly for same file

            the response contains the  complete file content.

            `,
            schema: z.object({
                fileid: z.string()
            }) //it means {}-->what are the parameter that require to call this tool
        }
    )

    const createFolderTool = tool(
        async ({ name, parentId }) => {
            console.log("folder create tool");
            const res = await createFolder({ userId, projectId, name, 
                parentId:parentId===""?null : parentId });

            return JSON.stringify({
                success: true,
                operation: "folder_created",
                folder: {
                    _id: res._id,
                    name: res.name,
                    type: res.type,
                    parentId: res.parentId
                }
            });
        },
        {
            name: "create_Folder",
            description: `
            create a new folder
            Rules:
            1.create parent folders first ,
            2.use exact parentId from get_Tree
            3.never create duplicate folders.
            4.a folder directly inside another folder must use that folder's id as parentid,
            5.after creation continue with the remaining files,
            6.do not call get_Tree again just to verify the folder .
            `,
            schema: z.object({
                name: z.string(),
                parentId: z.string()
            }) //it means {}-->what are the parameter that require to call this tool
        }
    )

    const createFileTool = tool(
        async ({ name, parentId, content, language }) => {
            console.log("file create tool");
            const res = await createFile({ userId, projectId, name, parentId, content, language: language || "plaintext" });

            return JSON.stringify({
                success: true,
                operation: "file_creation_done",
                file: {
                    _id: res._id,
                    name: res.name,
                    type: res.type,
                    parentId: res.parentId,
                    language: res.language,
                    content: res.content
                }
            });
        },
        {
            name: "create_File",
            description: `
            Create a New file.
            Rules:
            1.use get_tree first when project structure is unknown
            2.use Exact folder Id as parentId
            3.never create duplicate files 
            4.send complete file content
            5.create folders before files inside them .
            6.never user terminal commands to create files.
            7.do not call get_file immediately after creating a file 
            8.continue creating all required files 
            9.do not stop after creating only one file.

            for a react/vite project , create all required files
            `,
            schema: z.object({
                name: z.string(),
                parentId: z.string(),
                language: z.string(),
                content: z.string()
            }) //it means {}-->what are the parameter that require to call this tool
        }
    )

    const updateFileTool = tool(
        async ({ name, fileid, content }) => {
            console.log("file update tool");
            const res = await updateFile({ userId, name, content, id: fileid });
            if (!res || !res._id) {
    throw new Error("File update failed: no updated file returned.");
}
            return JSON.stringify({
                success: true,
                operation: "file_updation_done",
                file: {
                    _id: res._id,
                    name: res.name,
                    type: res.type,
                    parentId: res.parentId,
                    language: res.language,
                    content: res.content
                }
            });
        },
        {
            name: "update_File",
            description: `
Update an existing file or folder when the user requests a modification.

For file content changes:
1. Call get_File first to read the current content.
2. Apply the requested changes.
3. Call update_File with the exact fileid and complete updated content.

For renaming:
1. Provide the exact fileid and new name.
2. Content is optional when only renaming and when only renaming don't change the content the content must remain same so

Use the exact IDs returned by get_Tree.
Do not call this tool unless an actual change is requested.
`,
            schema: z.object({
                name: z.string().optional(),
                fileid: z.string(),
                content: z.string().optional()
            }) //it means {}-->what are the parameter that require to call this tool
        }
    )

    const deleteFileTool = tool(
        async ({ fileid }) => {
            console.log("file delete tool");
            const res = await deleteFile({ userId, id: fileid });

            return JSON.stringify({
                success: true,
                operation: "file_deletion_done",
                file: {
                    _id: res._id,
                    name: res.name
                }
            });
        },
        {
            name: "delete_File",
           description: `
Delete an existing file or folder from the project.

Rules:
1. Use get_Tree first to identify the correct item and obtain its exact ID.
2. Delete only the file or folder explicitly requested by the user.
3. Never delete the root folder (parentId is null).
4. Use the exact fileid from get_Tree.
5. Never use terminal commands to delete files or folders.
6. If the requested item cannot be identified clearly, ask the user for clarification.
`,
            schema: z.object({
                fileid: z.string(),

            }) //it means {}-->what are the parameter that require to call this tool
        }
    )



    //TODO :- SEE IN BACKNED CONTROLLER I USED DELETEFILE AND UPDATEFILE FOR BOTH FILE AND FOLDER OPERATIONS SO HERE IN DESCRIPTION UPDATE THE POINT WHERE I RESTRICT ONLY FILE ID TO CALL THIS AS BOTH FILE AND FOLDER ID CAN CALL IT 

    return [
        getTreeTool,
        getFileTool,
        createFolderTool,
        createFileTool,
        updateFileTool,
        deleteFileTool,
    ];

}