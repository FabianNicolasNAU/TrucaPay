'use-strict'

const router = require('express').Router();
const { userService } = require('../services');

// /users/
router.get('/', async function (req, res) {
        let users = await userService.findAll();
        return res.json(users);
});

router.get('/banco', async function (req, res) {  
    let tarjeta = await userService.findtar();
    return res.json(tarjeta);
});

router.get('/banco/:id', async function (req, res) {
    try{     
    let tarjeta = await userService.findAlltar(req);
    return res.json(tarjeta);
    } catch (error) {
        return Promise.reject({ error: true, message: error })
    }
});

// CREATE
// /users/

router.post('/tienda', async function (req, res) {
    try {
        let body = req.body;
        let data = await userService.create(body);

        if(!data){
            return res.status(400).json("Error al insertar registro.");
        }

        if (data.error) {
            return res.status(400).json(data.message);
        }
        
        return res.status(201).json(data);
    } catch (err) {
        return res.status(500).json(err)
    }
});

/*
// READ
// /users/:id
router.get('/:id', function (req, res) {
    res.send("Obtener usuario ID=" + req.params.id);
});
// UPDATE
// /users/:id
router.put('/:id', function (req, res) {
    res.send("Modificar usuario ID=" + req.params.id);
});
// DELETE
// /users/:id
router.delete('/:id', function (req, res) {
    res.send("Eliminar usuario ID=" + req.params.id);
});
*/
module.exports = router;