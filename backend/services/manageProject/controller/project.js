import Project from "../model/project.js";
import redis from '../../../shared/redis/redis.js'
import File from '../model/file.js'
export const createProject = async(req,res)=>{
    try{
        const userId = req.headers["x-user-id"];
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"not get userid"
            })
        }

        const {name,description} =req.body;
        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Project name is required",
            });
        }

        const project = await Project.create({
            madeBy: userId,
            name: name.trim(),
            description,
        });

         await redis.del(`projects-${userId}`);
         //then simple call getallprojects


        return res.status(201).json({//201 as successfully created
            success:true,
            project
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message:"project creation failed"
        })
    }
}


//project get -->>1.getusing project id and 2.getall project .

export const getProjectById = async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.headers["x-user-id"];
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const project = await Project.findOne({
            _id: id,
            madeBy: userId,
        });

        if(!project){
            return res.status(404).json({
                message:" project not found"
            })
        }
        project.lastUpdate = new Date();
        await project.save();
        
        const key = `projects-${userId}`;
         await redis.del(key);//since updated so sequence changes to display .

        return res.status(200).json(project);
    }catch(e){
        return res.status(500).json({
            message:"project get by id failed..."
        })
    }
}


export const getAllProjects = async(req,res)=>{
    try{
        const userId = req.headers["x-user-id"];
         if(!userId){
            return res.status(401).json({
                success:false,
                message:"not get userid"
            })
        }

        //getting first by redis then if not found then by DB

        const key = `projects-${userId}`;
        
        let data = await redis.get(key);
        if(data){
            return res.status(200).json({
               projects: JSON.parse(data)
            });
        }

        const projects = await Project.find({
            madeBy:userId
        }).sort({lastUpdate:-1});

        await redis.set(key,JSON.stringify(projects));
        return res.status(200).json({//200 as successfully get 
            success:true,
            projects
        })
    }catch(e){
         return res.status(500).json({
            message:"project fetching failed"
        })
    }
}

//get all starred marked project .
export const getStarredproject = async(req,res)=>{
    try{
        const userId = req.headers["x-user-id"];
         if(!userId){
            return res.status(401).json({
                success:false,
                message:"not get userid"
            })
        }
        const key = `starred-projects-${userId}`;
        let data = await redis.get(key);
        if(data){
            return res.status(200).json({
                projects:JSON.parse(data)
            })
        }
        const projects = await Project.find({
            madeBy:userId,
            starMark:true
        }).sort({lastUpdate:-1});

        await redis.set(key,JSON.stringify(projects));

        return res.status(200).json({//200 as successfully get 
            success:true,
            projects
        })
    }catch(e){
          return res.status(500).json({
            message:"project get starred failed..."
        })
    }
}


//starred toggle 

export const starToggle = async(req,res)=>{
    try{
        const userId = req.headers["x-user-id"];
          const {id} = req.params;
          if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const project = await Project.findOne({
            _id: id,
            madeBy: userId,
        });
        if(!project){
            return res.status(404).json({
                message:" project not found"
            })
        }
    
        const isstar = project.starMark;
        project.starMark = !isstar
        await redis.del(`starred-projects-${userId}`);
        await redis.del(`projects-${userId}`);
        await project.save();

        return res.status(200).json(project)
    }catch(e){
        return res.json(500).json({
            success:false,
            message:"staring error.."
        })
    }
}


//delete the project 


export const deleteProject = async(req,res)=>{
    try{
        const userId = req.headers["x-user-id"];
         const {id} = req.params;
         if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
         const project = await Project.findOne({
            _id: id,
            madeBy: userId,
        });
        if(!project){
            return res.status(404).json({
                message:" project not found"
            })
        }

        //userId already validated above when project finding so no need to validate again just delete all files and folders 
        await File.deleteMany({
            projectId: project._id,
        });

        // Delete the project
        await Project.deleteOne({
            _id: project._id,
            madeBy: userId,
        });

        await redis.del(`starred-projects-${userId}`);
        await redis.del(`projects-${userId}`);

        return res.status(200).json(project)
    }catch(e){
        return res.json(500).json({
            success:false,
            message:"deleting project error.."
        })
    }
}

