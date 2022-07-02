'use-strict'

const { Pool } = require('pg')

const PostgresProvider2 = () => {
    let conn = new Pool({
        user: process.env.DB2_USER,
        host: process.env.DB2_HOST,
        database: process.env.DB2_DATABASE,
        password: process.env.DB2_PASSWORD,
        port: process.env.DB2_PORT,
        max: 20,
        idleTimeoutMillis: 30000
    })

    const query = async (sql) => {
        return new Promise((resolve, reject) => {
            conn.connect(function (err, client, done) {
                if (err) reject(err)
                client.query(sql, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            });
        })
    }

    return {
        query
    }
}

module.exports = PostgresProvider2();