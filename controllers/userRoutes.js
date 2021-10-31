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
    } catch (err) {
        console.group(err);
        res.status(500).json(err);
    }
});
// find user with matching email
const userData = await User.findOne({
    where: {
        email: require.body.email
    }
});

if (!userData) {
    res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' }
        );
    return;
}
//login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorret email or password. Please try again.' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email of password. Please try again.' })
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//verify password entered
const validPassword = await userData.checkPassword(req.body.password);

if (!validPassword) {
    res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' }
        );
    return;
}
// create session based on log in credentials if stil logged in 

// req.session.save(() => {
//     req.session.user_id = userData.id;
//     req.session.logge_in = true;

//     res.json({ user: userData, message: 'You are now logged in' });
//     });

// } catch (err) {
//     res.status(400).json(err);
// }
// })

// router.post('/logout', (req, res) => {
//     if(req.session.logged_in) {
    //Logout function
    router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });

    module.exports = router;
