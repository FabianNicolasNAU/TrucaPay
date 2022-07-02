'use-strict'

const router = require('express').Router();
const { basicAuthMiddleware } = require('./_helpers')
const jwt = require('jsonwebtoken');

// /auth/
router.get('/', basicAuthMiddleware, async function (req, res) {
    try {
        const customer_id = req.query.customer_id;

        if (!customer_id) {
            return res.status(400).json("customer_id is required");
        }

        const payload = { customer_id };

        jwt.sign({ data: payload }, process.env["JWT_SECRET"] || "secret", (err, token) => {
            if(err){
                return res.status(400).json(err);
            }
            return res.status(200).json(token)
        });
    } catch (err) {
        return res.status(500).json(err)
    }
});

module.exports = router;