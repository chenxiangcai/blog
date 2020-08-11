const { Post } = require('../../../model/Post');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util'); // 方法改造为返回promise对象
const unlink = promisify(fs.unlink);
module.exports = async (req,res)=>{
    const id = req.params['id'];
    if(id.indexOf('-') != -1){
        const ids = id.split('-');
        for (const idElement of ids) {
            let post = await Post.findOneAndDelete({_id:idElement});
            if (post.cover) await unlink(path.join(__dirname,'../','../','../','public', post.cover));
        }
        res.send({message:'多选删除完成'});
    }else {
        let post = await Post.findOneAndDelete({_id:id});
        if (post.cover) await unlink(path.join(__dirname,'../','../','../','public', post.cover));
        res.send({message:'单选删除完成'});
    }
}