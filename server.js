const express = require('express');
const app = express();


//routes
app.get('/', (req, res) => {
    res.send('Hello Node API ');
})

app.get('/blog', (req, res) => {
    res.send('Hello Node API Blog');
})
app.listen(3000, () => {
    console.log('Node API is running on port 3000');
    })