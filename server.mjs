import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';

/*------------------------Schema-------------------------------*/

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    category: String,
    description: String,
    createdOn: { type: Date, default: Date.now }
});
const productModel = mongoose.model('products', productSchema);

/*--------------------------------------------------------------*/

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5001;

/*---------------------APIs--------------------------*/



/*--------------------------------------------------------------*/

const __dirname = path.resolve();
app.get('/', express.static(path.join(__dirname, "/Web/index.html")));
app.use('/', express.static(path.join(__dirname, "/Web")));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/*-------------------------Mongodb Connection URL--------------------------------*/

let dbURL = 'mongodb+srv://NabeelSohail:Nabeel30@cluster0.lidnkc6.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURL);

/*---------------------Mongodb Connected Disconnected Events--------------------------*/

mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

/*--------------------------------------------------------------*/