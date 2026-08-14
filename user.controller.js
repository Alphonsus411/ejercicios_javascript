const User = {
    get: (req, res) => {
        res.status(200).send('User details');
    },

    list: (req, res) => {
        res.status(200).send('List of users');
    },
    create: (req, res) => {
        res.status(201).send('User created');
    },
    update: (req, res) => {
        res.status(204).send('User updated');
    },
    destroy: (req, res) => {
        res.status(204).send('User deleted');
    }
}

module.exports = User;
