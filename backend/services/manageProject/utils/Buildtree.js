export const treebuild = (files)=>{
    const m = {} ; //map
    const tree = [] ; //tree store root node 
    //see const prevents reassignment but can modify objects and array so modification is allowed but reassignment is not allowed

    files.forEach((file)=>{//node creation
        m[file._id.toString()] = {
            ...file,
            children:[]
        }
    });

    files.forEach((file)=>{
        const node = m[file._id.toString()];
        if(file.parentId){
            const parentId = file.parentId.toString();
            if(m[parentId]){
                m[parentId].children.push(node);
            }
        }
        else{
            tree.push(node);//root;
        }
    })

    return tree;
}