import bodyParser from 'body-parser';
import express from 'express';

const users = [
    { id: 546, username: 'John' },
    { id: 894, username: 'Mary' },
    { id: 326, username: 'Jane' },
];

const app = express();
app.use(bodyParser.json());

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    if (!newUser.id || !newUser.username) {
        return res.status(400).json({ error: "Both id and username are required" });
    }
    if (users.find(user => user.id === newUser.id)) {
        return res.status(400).json({ error: "User with the same id already exists" });
    }
    users.push(newUser);
    res.send("Data added");
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        res.send("DELETE Request Called");
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        const updatedUser = req.body;
        if (!updatedUser.id || !updatedUser.username) {
            return res.status(400).json({ error: "Both id and username are required" });
        }
        users[userIndex] = updatedUser;
        res.send("User updated successfully");
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
