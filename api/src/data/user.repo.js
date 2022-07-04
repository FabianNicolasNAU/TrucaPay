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
    const findAllUsers = async () => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");
            // con PostgresProvider providers
            const query = {
                name: 'a',
                text: 'SELECT * FROM ordencompra where tienda = $1 and idcompra = $2',
                values: [compra2[0],compra2[1]],
              }
            let users = await provider.query(query)
            return users.rows;
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    const findtar = async () => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");

            // con PostgresProvider providers
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
    const findAlltar = async (id_req) => {
        if(id_req.params.id.includes('_')){
            try {
                // con MySQL providers
                // return await provider.query("SELECT * FROM users");
                
                let id = id_req.params.id.split('_')
                const banco = id[0]
                id = id[1]
                // con PostgresProvider provider
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
        if(id_req.params.id.includes(',')){
            try {
                // con MySQL providers
                // return await provider.query("SELECT * FROM users");
                
                let id = id_req.params.id.split(',')
                console.log(id)
                const rut = id[0]
                id = id[1]
                // con PostgresProvider provider
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
        else{
            try {
                // con MySQL providers
                // return await provider.query("SELECT * FROM users");
                
                const id = id_req.params.id.toString()
                // con PostgresProvider provider
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
    
    
    const createUser = async (estado, monto) => {
        try {
            // con MySQL providers
            // let sql = mysql.format("INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [name, email, password]);

            // con MySQL providers
            // return result.affectedRows > 0 ? {
            //     id: result.insertId, name, email, password
            // } : null;

            //con PostgresProvider providers
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
        create: createUser
    }
}

module.exports = UserRepo();