const router = require('express').Router();
const { User } = require('../../models');

//create new user 
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: require.body.username,
            email: req.body.email,
            password: req.body.password,
    });

    req.session.save(() => {
        req.session.loggedIn = true;

        res.status(200).json(dbUserData);
    });
    }   catch (err) {
        console.group(err);
        res.status(500).json(err)
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email;
            },
        });
    if (!dbUserData) {
        res
            .status(400)
            .json({message: 'Incorret email or password. Please try again.' });
            return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
        res