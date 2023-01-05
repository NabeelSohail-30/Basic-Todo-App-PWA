import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';

/*------------------------Schema-------------------------------*/


let todoSchema = new mongoose.Schema({
    todo: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});
const todoModel = mongoose.model('dbTodos', todoSchema);


/*--------------------------------------------------------------*/


const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5001;


/*---------------------APIs--------------------------*/


app.get('/todos', (req, res) => {

    todoModel.find({})
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


app.post("/todo", (req, res) => {

    const body = req.body;
    if (
        !body.todo
    ) {
        res.status(400).send(` required parameter missing, todo is required `)
        return;
    }

    todoModel.create({
        todo: body.todo
    },
        (err, saved) => {
            if (!err) {
                console.log(saved);

                res.send({
                    message: "your todo is saved"
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})


app.delete('/todo/:id', (req, res) => {

    const id = req.params.id;

    todoModel.deleteOne({ _id: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "todo has been deleted successfully",
                })
            } else {
                res.send({
                    message: "No todo found with this id: " + id,
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