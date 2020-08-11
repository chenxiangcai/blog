const { User } = require('../../../model/User');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util'); // 方法改造为返回promise对象
const unlink = promisify(fs.unlink);
module.exports = async (req,res)=>{
    const id = req.params['id'];
    if (id.indexOf('-') != -1) {
       const ids = id.split('-');
        for (const id of ids) {
            let user = await User.findOneAndDelete({_id:id})
            if(user.avatar) await unlink(path.join(__dirname,'../','../','../','public', user.avatar));
        }
        res.send({message:'删除成功'});
    } else {
    let user = await User.findOneAndDelete({_id: id});
    if (user.avatar) await unlink(path.join(__dirname,'../','../','../','public', user.avatar));//删除头像
        res.send({message:'删除成功'});
    }
}