'use-strict'
///////////////////////////valores a testear///////////////////////////////////////

const mysql = require('mysql');
const provider = require('./providers/postgres_provider');
const provider2 = require('./providers/postgres_provider2');

const compra1 = ["TruCars", 1];
const compra2 = ["TruFood", 1];
const compra3 = ["TruCars", 12];


//////////////////////////////////////////////////////////////////////////////////

const UserRepo = () => {
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
    const findAllUsers = async () => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");
            // con PostgresProvider providers
            const query = {
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
    const findAlltar = async (id_req) => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");
            
            const id = id_req.params.id.toString()
            // con PostgresProvider provider
            const query1 = {
                text: 'SELECT * FROM credito where numerotarjeta = $1',
                values: [id],
            }
            console.log(id)
            let tarjeta =  await provider2.query(query1);
            console.log(tarjeta)
            return tarjeta.rows;
            
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    //const createUser = async ({ name, email, password }) => {
        //try {
            // con MySQL providers
            // let sql = mysql.format("INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [name, email, password]);

            // con MySQL providers
            // return result.affectedRows > 0 ? {
            //     id: result.insertId, name, email, password
            // } : null;

            // con PostgresProvider providers
            //let sql = mysql.format("INSERT INTO users(name, email, password) VALUES (?, ?, ?) RETURNING id", [name, email, password]);
            //const result = await provider.query(sql);
            //return result.rowCount > 0 ? {
            //    id: result.rows[0].id, name, email, password
            //} : null;

        //} catch (err) {
        //    console.error(err)
        //    Promise.reject(err)
        //}
    //}

    return {
        findAll: findAllUsers,
        findAlltar,
        findtar
    }
}

module.exports = UserRepo();