const { Slide,validateSlide } = require('../../../model/Slide');
module.exports = async (req,res)=>{
    const { error } = validateSlide(req.fields);
    if(error) return res.send({message:error.message});
    let slide = new Slide(req.fields);
    await slide.save()
    res.send(slide);
}
