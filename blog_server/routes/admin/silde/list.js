const { Slide } = require('../../../model/Slide');
module.exports = async (req,res)=>{
    const slide = await Slide.find();
    res.send(slide)
}