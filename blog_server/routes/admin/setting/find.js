const {Setting} = require('../../../model/Setting');
module.exports =async (req,res)=>{
    const setting = await Setting.findOne();
    res.send(setting)
}
