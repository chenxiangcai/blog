const {Setting} = require('../../../model/Setting');
module.exports =async (req,res)=>{
    const setting = await Setting.find();
    res.send(setting)
}