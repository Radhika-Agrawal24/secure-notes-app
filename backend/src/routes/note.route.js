
const express=require('express');
const router=express.Router();
const {createNote,getNote,updateNote,deleteNote}=require("../controllers/note.controller")

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create",authMiddleware,createNote);
router.get("/get",authMiddleware,getNote);
router.put("/update/:id",authMiddleware,updateNote);
router.delete("/delete/:id",authMiddleware,deleteNote);
router.get("/test", (req, res) => {
  res.send("Notes route working");
});
module.exports= router; 