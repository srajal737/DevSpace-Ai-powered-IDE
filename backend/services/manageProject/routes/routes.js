import express from "express"
import { createProject, deleteProject, getAllProjects, getProjectById, getStarredproject, starToggle } from "../controller/project.js";
const router = express.Router();
import { createRootFolder,createFolder,createFile, updateFile, deleteFile, getFile, getFileTree } from '../controller/file.js'
//project route 
router.post('/createproject' , createProject);
router.get('/getallproject',getAllProjects);
router.get('/getprojectbyid/:id',getProjectById);
router.get('/getstarredproject',getStarredproject);
router.patch('/togglestar/:id',starToggle);
router.delete('/deleteproject/:id',deleteProject);


//file routes 
router.post("/createRoot",createRootFolder);
router.post("/createFolder" ,createFolder);
router.post("/createfile",createFile);
router.post('/updatefile/:id',updateFile);
router.delete('/deletefile/:id',deleteFile);
router.get('/getfile/:id',getFile);
router.get('/getTree/:projectId',getFileTree);

export default router ;
