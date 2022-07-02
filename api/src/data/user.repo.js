'use-strict'
///////////////////////////valores a testear///////////////////////////////////////



const compra1 = ["trucars", 1];
const compra2 = ["trufood", 1];
const compra3 = ["trucars", 12];




//////////////////////////////////////////////////////////////////////////////////
const mysql = require('mysql');
const provider = require('./providers/postgres_provider');
const provider2 = require('./providers/postgres_provider2');
const UserRepo = () => {
    const findAllUsers = async () => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");
            // con PostgresProvider providers
            const query = {
                // give the query a unique name
                name: 'fetch-user',
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
    const findAlltar = async () => {
        try {
            // con MySQL providers
            // return await provider.query("SELECT * FROM users");

            // con PostgresProvider providers
            let tarjeta = await provider2.query("SELECT * FROM tarjeta");
            return tarjeta.rows;
        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }
    const createUser = async ({ name, email, password }) => {
        try {
            // con MySQL providers
            // let sql = mysql.format("INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [name, email, password]);

            // con MySQL providers
            // return result.affectedRows > 0 ? {
            //     id: result.insertId, name, email, password
            // } : null;

            // con PostgresProvider providers
            let sql = mysql.format("INSERT INTO users(name, email, password) VALUES (?, ?, ?) RETURNING id", [name, email, password]);
            const result = await provider.query(sql);
            return result.rowCount > 0 ? {
                id: result.rows[0].id, name, email, password
            } : null;

        } catch (err) {
            console.error(err)
            Promise.reject(err)
        }
    }

    return {
        findAll: findAllUsers,
        findAlltar,
        create: createUser,
    }
}

module.exports = UserRepo();