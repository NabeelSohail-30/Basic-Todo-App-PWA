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

app.post("/product", (req, res) => {

    const body = req.body;
    if (
        !body.name ||
        !body.price ||
        !body.category ||
        !body.description
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "category": "value",
            "description": "value"
        }`)
        return;
    }

    productModel.create({
        name: body.name,
        price: body.price,
        category: body.category,
        description: body.description,
    },
        (err, saved) => {
            if (!err) {
                console.log(saved);

                res.send({
                    message: "your product is saved"
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})


app.get('/products', (req, res) => {

    productModel.find({})
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (!err) {
                res.send({
                    message: "here is you todo list",
                    data: data
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });
})

app.get('/product/:id', (req, res) => {

    const id = req.params.id;

    productModel.findOne({ _id: id }, (err, data) => {
        if (!err) {

            if (data) {
                res.send({
                    message: "here is you product",
                    data: data
                })
            } else {
                res.status(404).send({
                    message: "product not found",
                })
            }

        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

app.put('/product/:id', async (req, res) => {

    const id = req.params.id;
    const body = req.body;

    if (
        !body.name ||
        !body.price ||
        !body.category ||
        !body.description
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "category": "value",
            "description": "value"
        }`)
        return;
    }

    try {
        let data = await productModel.findByIdAndUpdate(id,
            {
                name: body.text,
                price: body.price,
                category: body.category,
                description: body.description
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "Product is updated successfully",
            data: data
        })

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }
})

app.delete('/products', (req, res) => {

    productModel.deleteMany({}, (err, data) => {
        if (!err) {
            res.send({
                message: "All Products has been deleted successfully",
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

app.delete('/product/:id', (req, res) => {

    const id = req.params.id;

    productModel.deleteOne({ _id: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Product has been deleted successfully",
                })
            } else {
                res.send({
                    message: "No Product found with this id: " + id,
                })
            }


        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

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