'use-strict'

const { userRepo } = require('../data')

const UserService = () => {
    const findAllUsers = async () => {
        try {
            return await userRepo.findAll();
        } catch (error) {
            return Promise.reject({ error: true, message: error })
        }
    }
    const findtar = async () => {
        try {
            return await userRepo.findtar();
        } catch (error) {
            return Promise.reject({ error: true, message: error })
        }
    }
    const findAlltar = async (req) => {
        try {
            idtarjeta = req
            return await userRepo.findAlltar(idtarjeta);
        } catch (error) {
            return Promise.reject({ error: true, message: error })
        }
    }
    const create = async (body) => {
        try {
            return await userRepo.create(body.estado, body.monto);
        } catch (error) {
            return Promise.reject({ message: error })
        }
    }
    return {
        findAll: findAllUsers,
        findAlltar,
        findtar,
        create
    }
}

module.exports = UserService();