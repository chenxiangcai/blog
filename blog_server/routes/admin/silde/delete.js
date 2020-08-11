const { Slide } = require('../../../model/Slide');
const {promisify} = require('util');
const path = require('path');
const fs = require('fs');
const unlink = promisify(fs.unlink)
module.exports = async (req,res)=>{
    const id = req.params['id'];
    let slide = await Slide.findOneAndDelete({_id:id});
    if(slide.image) await unlink(path.join(__dirname,'../','../','../','public',slide.image));
    res.send(slide);
}