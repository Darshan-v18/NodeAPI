const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/productModels');



app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes
app.get('/', (req, res) => {
    res.send('Hello Node API ');
})

app.get('/blog', (req, res) => {
    res.send('Hello Node API Blog');
})



app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({message:error.message});
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
       }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

//update product
app.put('/products/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        //we cannot find product in db
        if(!product){
            return res.status(404).json({message:`Cannot find any product ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
        
})

//delete a product by id

app.delete('/products/:id', async(req, res) => {
try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });

        }
        res.status(200).json({product})
} catch (error) {
    console.log(error.message)
    res.status(500).json({messsage:error.message});
}   
})

 
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://darshan_v:COqNSUpwOungTG6G@cluster0.ecbnyfn.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongoDB!')
    app.listen(3000, () => {
        console.log('Node API is running on port 3000');
    });

}).catch((err) => {
    console.log('Error connecting to mongoDB', err)
})