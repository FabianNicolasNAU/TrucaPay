'use-strict'
///////////////////////////valores a testear///////////////////////////////////////

const mysql = require('mysql');
const provider = require('./providers/postgres_provider');
const provider2 = require('./providers/postgres_provider2');

const compra1 = ["trucars", 1];
const compra2 = ["trufood", 1];
const compra3 = ["trucars", 12];


//////////////////////////////////////////////////////////////////////////////////


const UserRepo = () => {

        /////////////////////////// GET compra
    const findAllUsers = async () => {
        try {
            const query = {
                name: 'a',
                text: 'SELECT * FROM ordencompra where tienda = $1 and idcompra = $2',
                values: [compra1[0],compra1[1]],
              }
            let users = await provider.query(query)
            return users.rows;
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    
    /////////////////////////// GET tarjetas
    const findtar = async () => {
        try {
            const query = {
                text: 'SELECT * FROM credito',

              }
            let tarjeta = await provider2.query(query)
            return tarjeta.rows;
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    
    /////////////////////////// GET tarjeta por id
    const findAlltar = async (id_req) => {




        ////////////////////// tarjeta de debito

        if(id_req.params.id.includes('_')){
            try {
               
                let id = id_req.params.id.split('_')
                const banco = id[0]
                id = id[1]
                const query1 = {
                    text: 'SELECT * FROM debito where numerotarjeta = $1 and banco = $2',
                    values: [id, banco],
                }
                console.log(query1)
                let tarjeta =  await provider2.query(query1);
                return tarjeta.rows;
                
            } catch (err) {
                console.error(err)
                Promise.reject(err)
            }
        }

        ///////////////// tarjeta mach

        if(id_req.params.id.includes(',')){
            try {
                let id = id_req.params.id.split(',')
                console.log(id)
                const rut = id[0]
                id = id[1]
                const query1 = {
                    text: 'SELECT * FROM mach where numerotarjeta = $1 and rut = $2',
                    values: [id, rut],
                }
                console.log(query1)
                let tarjeta =  await provider2.query(query1);
                return tarjeta.rows;
                
            } catch (err) {
                console.error(err)
                Promise.reject(err)
            }
        }


        ///////////////// tarjeta credito
        else{
            try {
                const id = id_req.params.id.toString()
                const query1 = {
                    text: 'SELECT * FROM credito where numerotarjeta = $1',
                    values: [id],
                }
                let tarjeta =  await provider2.query(query1);
                return tarjeta.rows;
                
            } catch (err) {
                console.error(err)
                Promise.reject(err)
            }
        }
    }
    
        ///////////////// POST orden de compra procesada
    const createOrden = async (estado, monto) => {
        try {
            const query1 = {
                text: 'INSERT INTO orden(estado, monto) VALUES ($1, $2)',
                values: [estado, monto],
            }
            
            const result = await provider.query(query1);
            return result.rows;

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    return {
        findAll: findAllUsers,
        findAlltar,
        findtar,
        create: createOrden
    }
}

module.exports = UserRepo();