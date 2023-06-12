const pool = require('../database'); 

class User{
    constructor(username, email, pass){
        this.username = username, 
        this.email = email, 
        this.pass = pass
    }

    static createUser(email, username, pass){
        return new Promise(async (resolve, reject) => {
            try {
                const user = await pool.query('INSERT INTO users (email, username, password_set) VALUES ($1, $2, $3) RETURNING userId, username, email', [email, username, pass]); 
                resolve(user.rows[0]); 
            } catch (error) {
                reject(error); 
            }
        })
    }

    static findByEmail(email){
        return new Promise(async (resolve, reject) => {
            try {
                const user = await pool.query('SELECT userId, email, username, password_set FROM users WHERE email = $1', [email]); 
                resolve(user.rows[0]); 
            } catch (error) {
                reject(error); 
            }
        })
    }

    static deleteUser(email){
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query('DELETE FROM users WHERE email=$1', [email]); 
                resolve(`User ${email} has been deleted`); 
            } catch (error) {
                reject(error); 
            }
        })
    }
}

module.exports = User; 