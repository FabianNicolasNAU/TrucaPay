module.exports = (app) => {
    app.use('/trucapay', require('./user.routes'));
}