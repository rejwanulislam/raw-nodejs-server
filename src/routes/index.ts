import { readUser, rightUser } from "../helpers/fileDB"
import parseBody from "../helpers/parseBody"
import addRoute from "../helpers/routeHandler"
import sendJson from "../helpers/sendJson"

addRoute("GET", '/', (req, res) => {
    sendJson(res, 200, {
        message: "Hallo from node js with typescript",
        path: req.url
    })
})

addRoute("GET","/api",(req,res)=>{
    sendJson(res,200,
    {
            message: "Helth status ok",
            path: req.url
        }   
    )
})


addRoute("POST",'/api/users',async(req,res)=>{
    const body=await parseBody(req)
   const users=readUser()
    const data={
       
        ...body
    }

    users.push(data)
    rightUser(users)

    sendJson(res,201,{sucess:true,data:body})
})

addRoute("PUT","/api/users/:id",async(req,res)=>{
    const {id}=(req as any).params;
    const body =await parseBody(req)
    const users=readUser()
    const index=users.findIndex((user: any)=>user.id==id)
    if(index==-1){
      return  sendJson(res,404,{
            sucess:false,
            message:"user no fond"
        })
    }
    users[index]={
        ...users[index],
        ...body
    }
    rightUser(users)
    sendJson(res,202,{
        sucess:true,
        message:`id ${id} user updated`,
        data:users[index]
    })
})