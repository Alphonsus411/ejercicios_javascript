require('dotenv').config();

const mongoose = require('mongoose');

const Users = require('./user');

const User = {
    get: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await Users.findById(id);

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.status(200).send(user);

        } catch (error) {
            console.error(error);

            res.status(500).send(error);
        }
    },

    list: async (req, res) => {
        try {
            const users = await Users.find({});

            res.status(200).send(users);

        } catch (error) {
            console.error(error);

            res.status(500).send(error);
        }
    },

    create: async (req, res) => {
        try {
            console.log('Request body:', req.body);

            if (!req.body.name || !req.body.email) {
                return res.status(400).send('Name and email are required');
            }

            const user = new Users(req.body);

            const savedUser = await user.save();

            res.status(201).send(savedUser._id);

        } catch (error) {
            console.error(error);

            if (error.code === 11000) {
                return res.status(409).send('Email already exists');
            }

            res.status(500).send(error);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await Users.findById(id);

            if (!user) {
            return res.status(404).send('User not found');
            }

            Object.assign(user, req.body);

            await user.save();

            res.status(200).send(`Updated user with ID: ${id}`);

        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await Users.findByIdAndDelete(id);

            if (!user) {
            return res.status(404).send('User not found');
            }

            res.status(200).send(user);

        } catch (error) {
            console.error(error);

            res.status(500).send(error);
        }
    }

};

module.exports = User;
