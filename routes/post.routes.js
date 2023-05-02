


const express=require('express')
const { PostModel } = require('../models/post.model')
const postRouter =express.Router()



postRouter.post("/create",async(req,res)=>{
    try {
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"post gets created successfully"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


postRouter.get("/",async(req,res)=>{
    const {device}=req.query
    try {
        if(device){
            express.query.device=device
        }
        const posts=await PostModel.find({authorID:req.body.authorID})
        res.send(posts)
        console.log({"msg":'getting all the post of user'})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={
    postRouter
}

postRouter.patch("/update/:id",async(req,res)=>{

    const {id}=req.params
    const post=await PostModel.findOne({_id:id})
     try {
        if(req.body.authorID != post.authorID){
            res.status(200).send({"msg":"you are not authorized to to this"})
        }else{
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"post gets updated successfully"})
        }
     } catch (error) {
        res.status(400).send({"msg":error.message})
     }
})

postRouter.delete("/delete/:id",async(req,res)=>{

    const {id}=req.params
    const post=await PostModel.findOne({_id:id})
     try {
        if(req.body.authorID != post.authorID){
            res.status(200).send({"msg":"you are not authorized to to this"})
        }else{
            await PostModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"post gets deleted successfully"})
        }
     } catch (error) {
        res.status(400).send({"msg":error.message})
     }
})