module.exports =async (req,res)=>{
    let avatar = [];
    if(req.files){
        for (const reqKey in req.files) {
            if(req.files[reqKey].path){
                //avatar[reqKey] = req.files[reqKey].path.split('public')[1];
                avatar.push({
                    [reqKey]: req.files[reqKey].path.split('public')[1]
                })
            }
        }
    }
    res.send(avatar);
}