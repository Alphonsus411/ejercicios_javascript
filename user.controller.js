require('dotenv').config();

const mongoose = require('mongoose');

const Users = require('./user')

const User = {
    get: (req, res) => {
        res.status(200).send('User details');
    },

    list: async (req, res) => {
        const users = await Users.find({}, (err, users) => {
            res.status(200).send(users);
        });
    },
    create: async (req, res) => {
        console.log('Request body:', req.body); // Log the request body for debugging
        if (!req.body.name || !req.body.email) {
            return res.status(400).send('Name and email are required');
        }
        const user = new Users(req.body);
        await user.save();
        res.status(201).send('User created');
    },
    update: async (req, res) => {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(user);
    },
    destroy: async (req, res) => {
        const user = await Users.findByIdAndRemove(req.params.id);
        res.status(200).send(user);
    }
}

module.exports = User;
