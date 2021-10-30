const withAuth = (req, res, next) => {
    console.log("req.session", req.session);
    if (!req.session.logged_in) {
        res.redirect('/login');
    }   else {
        next();
    }
};

module.exports = withAuth;