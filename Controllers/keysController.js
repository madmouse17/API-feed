const express = require("express");
const { Keys, createValidate } = require("../Models/keys");
const { User, loginValidate, registerValidate } = require("../Models/user");

const create = async(req, res) => {
    try {
        const { error } = createValidate(req.body);
        if (error)
            return res
                .status(400)
                .json({ status: "failed", message: error.details[0].message });

        const keys = new Keys(req.body);
        console.log(keys.user);

        await keys.save();

        User.findById(keys.user, function(err, user) {
            if (err)
                return res
                    .status(400)
                    .json({ status: "failed", message: "User Relation not saved" });
            user.keys = keys.user.toString();
            user.save();
        });

        res.json({ status: "Success", message: "Keys Created", keys });
    } catch (error) {
        res.json({ status: "failed", message: "An error occured" });
        console.error(error);
    }
};

const showAll = async(req, res) => {
    try {
        const keys = await Keys.find().populate("user");
        res.json({ status: "Success", keys });
    } catch (err) {
        res.json({ status: "failed", message: "An error occured" });
        console.error(error);
    }
};

const update = async(req, res) => {
    await res.send(`edit ${req.params.id}`);
};

const deletes = async(req, res) => {
    await res.send(`delete ${req.params.id}`);
};

module.exports = { create, showAll };