const parameter_model = require('./parameter_model');


// HELPERS

const parameter_data = (req) => {
    let data = {
        name: req.body.name,
        tool_name: req.body.tool_name,
        material: req.body.material,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate,
    };
    return data;
};

// CREATE
const api_post_parameter = (req, res, next) => {
    console.log('api_post_parameter');
    let data = parameter_data(req);

    let new_parameter = parameter_model(data);

    new_parameter.save().then(() => {
        console.log(new_parameter);
        res.send(JSON.stringify(new_parameter));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// READ
const api_get_parameters = (req, res, next) => {
    console.log('api_get_parameters');

    parameter_model.find({})
        .lean()
        .then(parameters => {
            res.send(JSON.stringify(parameters));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};

// UPDATE
//PUT /api/material/5e877016c4bd517bd8ef178a
const api_put_parameter = (req, res, next) => {
    console.log('api_put_parameter');
    let id = req.params.id;
    let data = parameter_data(req);

    parameter_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((parameter) => {
        res.send(paremeter);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};

// DELETE
// DELETE /api/material/5e877016c4bd517bd8ef178a
const api_delete_parameter = (req, res, next) => {
    let id = req.params.id;
    // material_model.findOneAndDelete({
    //     name: id
    // }).then(() => {
    //     res.send();
    // }).catch(err => {
    //     res.status(500);
    //     res.send(err.errmsg);
    //     console.log(err);
    // });

    parameter_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


// EXPORTS
module.exports.api_post_parameter = api_post_parameter;
module.exports.api_get_parameters = api_get_parameters;
module.exports.api_put_parameter = api_put_parameter;
module.exports.api_delete_parameter = api_delete_parameter;
//5e8771b74c898e14b86c7285
//5e87624fa3db07507634b197