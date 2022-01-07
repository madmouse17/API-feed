const express = require("express");
const { User, loginValidate, registerValidate } = require("../Models/user");
const bcrypt = require("bcrypt");

const login = async(req, res) => {
    try {
        const { error } = loginValidate(req.body);
        if (error)
            return res
                .status(400)
                .json({ status: "failed", message: error.details[0].message });

        const user = await User.findOne({
            status: "failed",
            email: req.body.email,
        });
        if (!user)
            return res
                .status(400)
                .json({ status: "failed", message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res
                .status(400)
                .json({ status: "failed", message: "Invalid email or password" });

        const token = user.generateAuthToken();
        res.json({
            status: "Success",
            message: "Login Success",
            email: req.body.email,
            token,
        });
    } catch (error) {
        console.error(error);
        res.json({ status: "failed", message: "An error occured" });
    }
};

const register = async(req, res) => {
    try {
        const { error } = registerValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.json({ status: "Success", message: "User Created", user });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                status: "failed",
                message: `email ${req.body.email} already taken`,
            });
        }
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

module.exports = { login, register, update, deletes };