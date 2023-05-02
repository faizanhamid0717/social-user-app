
const jwt=require("jsonwebtoken")

const auth=(req,res)=>{
      const token=req.headers.authorization
      if(token){
          try {
                const decoded=jwt.verify(token.split(' ')[1], "masai")
                if (decoded){
                    console.log(decoded)
                    req.body.authorID=decoded.authorID
                    req.body.author=decoded.author
                    next()
                }else{
                    res.send({"msg":"please login first"})
                }

          } catch (error) {
               res.status(400).send({"msg":error.message})
          }

      }else{
        res.status(400).send({"msg":"please login first"})
      }
    }

    module.exports={
        auth
    }