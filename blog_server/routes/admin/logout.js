module.exports = (req,res)=>{
    req.session.destroy(function () {
        res.clearCookie('connect-id');
        res.send({message:'退出成功'})
    })
}