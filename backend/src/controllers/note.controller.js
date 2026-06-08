const noteSchema= require("../models/note.model");

const createNote=async(req,res)=>{
    try{
const{title,content}=req.body;

const note=await noteSchema.create({
    title,
    content,
    user:req.user._id,
})
res.status(201).json(note);

    }
    catch(error){
     return  res.status(500).json({
            message:"Error in creating note",
            error:error.message
        })
    }
}
const getNote=async(req,res)=>{
    try{
const notes=await noteSchema.find({
    user:req.user._id,
})
res.status(200).json(notes);
    }
       catch(error){
     return  res.status(500).json({
            message:"Error in creating note",
            error:error.message
        })
    }
}
const updateNote=async(req,res)=>{
    try{
const updated= await noteSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
)
res.json(updated);
    }
    catch(error){
        return res.status(500).json({
            message:"jcskdhk",
            error:error.message
        })
    }
}
const deleteNote=
async(req,res)=>{

await noteSchema.findByIdAndDelete(
 req.params.id
);

res.json({
 message:"Deleted"
});

}
module.exports={
    updateNote,deleteNote,getNote,createNote
}