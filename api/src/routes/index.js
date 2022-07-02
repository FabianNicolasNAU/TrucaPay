module.exports = (app) => {
    app.use('/auth', require('./auth.routes'));
    app.use('/users', require('./user.routes'));
    app.use('/products', require('./product.routes'));
};