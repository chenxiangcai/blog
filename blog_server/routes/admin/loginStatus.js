module.exports = (req,res)=>{
    if(req.session && req.session.userInfo && req.session.userInfo.role =='admin'){
        const loginStatus = `var loginStatus = true; var userId=\"${req.session.userInfo._id}\"`;
        res.send(loginStatus);
    }else {
        res.send(`var loginStatus = false`);
    }
}