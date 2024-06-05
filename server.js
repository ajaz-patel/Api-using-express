const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user.model')



const url = "mongodb://localhost:27017/MYDB"


async function dbConnection(url) {
    try {
        await mongoose.connect(url)
        console.log("MongoDB connected successfully!!!!")
    } catch (error) {
        console.error(error.message)
    }
}


const app = express();
app.use(bodyParser.json());

dbConnection(url);

app.post('/user', async (req, res) => {
    try {
        if(!req.body.name || !req.body.email){
            return res.status(400).send({
                error:"Name and Email required"
            })
        }
        const user = await User.create(req.body);
        res.status(201).send(user); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
});

app.get('/user', async(req,res) => {
    try {
        const users = await User.find();
        if(users.length === 0) {
            return res.status(404).send({
                error:"No users found"
            })
        }
        res.send(users)
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
})

app.put('/user/:id', async(req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        res.send(user);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
})

app.delete('/user/:id', async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id )
        res.send(user);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
})


const port = 8080;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});