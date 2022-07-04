module.exports = (app) => {
    app.use('/trucapay', require('./user.routes'));
    app.use('/products', require('./product.routes'));
}