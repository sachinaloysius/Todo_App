const express=require('express')
const app=express()
const multer=require('multer')
const bodyparser=require('body-parser')
const mysql=require('mysql2')
const cors=require('cors')
const port=7777;

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.listen(port,()=>{
console.log("It's running YO!");
})

const db=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"db_Todo"
})

db.connect((err)=>{
if(err){
    console.log(err);
    return
}
console.log("Database Connected");
})

app.post("/Todo_Create",(req,res)=>{
    const data=req.body.inputdata;
    let qry=`insert into tbl_todo(data) values('${data}')`
    db.query(qry,(err,result)=>{
     if(err){
        console.log(err);
     }
     else{
        res.send({
            message:"Data Saved"
        })
     }
    })
})

app.get("/Todo_Read",(req,res)=>{
    let qry=`select * from tbl_todo`
    db.query(qry,(err,result)=>{
       if(err){
        console.log(err);
       }
       else if(result.length>0){
        res.send({
            read:result
        })
       }
       else{
        res.send({
            read:[]
        })
       }
    })
})

app.delete("/Todo_Delete/:id",(req,res)=>{
const id =req.params.id
let qry=`delete from tbl_Todo where data_id='${id}'`
db.query(qry,(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        res.send({
            message:"Data Saved"
        })
    }
})
})
app.put("/Todo_Update",(req,res)=>{
    const inputdata=req.body.inputdata
    const id=req.body.eid
    let qry= `update tbl_todo set data='${inputdata}' where data_id='${id}'`
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({
               message:"Data Updated"
            })
        }

    })
})
app.get("/Todo_Update/:id",(req,res)=>{
    const id=req.params.id
    let qry=`select * from tbl_todo where data_id='${id}'`
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            res.send({
             update:result   
            })
        }
        else{
          res.send({
            update:[]
          })
        }
    })
})