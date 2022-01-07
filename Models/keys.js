const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const keysSchema = new Schema({
    fb: {
        type: String,
        required: true,
    },
    cloud: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: true,
});

const Keys = mongoose.model("keys", keysSchema);

const createValidate = (keys) => {
    const schema = Joi.object({
        fb: Joi.string().required(),
        cloud: Joi.string().required(),
        user: Joi.string().required(),
    });
    return schema.validate(keys);
};

// const registerValidate = (keys) => {
//     const schema = Joi.object({
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string()
//             .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//             .required(),
//         repeat_password: Joi.ref("password"),
//     }).with("password", "repeat_password");

//     return schema.validate(keys);
// };

module.exports = { Keys, createValidate };