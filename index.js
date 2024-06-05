const express = require('express');

const fs = require('fs');

const users = require('./MOCK_DATA.json');

const app = express();

const PORT = 5000;

//Middleware - plugins
app.use(express.urlencoded({ extended:false }))

//Routes

app.get('/users',(req,res)=>{
    const html = `
    <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html);
})

//REST API

app.get('/api/users',(req,res)=>{
    return res.json(users);
})

//1.
// app.get('/api/users/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     if(user){
//         return res.json(user);
//     }else{
//         return res.status(404).json({message:'User not found'});
//     }
// })

//2.
// app.patch('/api/users/:id',(req,res)=>{
//     //To Do: Edit the user with id
//     return res.json({status:'pending'});
// })

//3.
// app.delete('/api/users/:id',(req,res)=>{
//     //To Do: Delete the user with id
//     return res.json({status:'pending'});
// })

//1,2 and 3 combined in single route.

app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    if(user){
        return res.json(user);
    }else{
        return res.status(404).json({message:'User not found'});
    }
}).patch((req,res)=>{
    //To Do: Edit the user with id
    return res.json({status:'pending'});
}).delete((req,res)=>{
    //To Do: Delete the user with id
    return res.json({status:'pending'});
})

app.post('/api/users',(req,res)=>{
    //To Do: Create new user
    const body = req.body;
    // console.log('Body :',body);
    // console.log(`Body: ${JSON.stringify(body)}`);
    users.push({id:users.length+1,...body});
    fs.writeFile('MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:'Success',id:users.length});
    })
})

app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`)
})



