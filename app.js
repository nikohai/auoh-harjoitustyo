const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();

const body_parser = require('body-parser');

const material_controller = require('./parameter_controller');

// npm init
// npm install express
// npm install mongoose
// npm install nodemon --save-dev
// npm run start-dev

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended: true
})); // parameter/id

app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
}); // GET /api/parameters

//  GET /index.html
// -->  /public/index.html
app.use("/", express.static("public"));


// RESTful API
// CRUD OPERATIONS

//CREATE
app.post("/api/machining-parameter-set", material_controller.api_post_parameter);

//api.domain.com/materials
// READ
app.get("/api/machining-parameter-sets", material_controller.api_get_parameters);

// UPDATE
//app.patch korvaa vain tietyt kentät
//app.put korvaa koko tiedon
app.put("/api/machining-parameter-set/:id", material_controller.api_put_parameter);

// DELETE
app.delete("/api/machining-parameter-set/:id", material_controller.api_delete_parameter);


const database_uri = "mongodb+srv://nikohai:7XCMOgzSOcMlvAen@harjoitustyo-uhkhz.mongodb.net/test?retryWrites=true&w=majority";

//password: 7XCMOgzSOcMlvAen


mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});