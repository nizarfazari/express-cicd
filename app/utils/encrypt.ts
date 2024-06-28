import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const salt = 10;

export async function encryptPassword(password: string){
    try {
        const result = await bcrypt.hash(password, salt)
        return result;
    } catch (e){
        throw e
    }
}


export async function checkPassword(encryptedPassword: string, password: string){
    try {
        const result = await bcrypt.compare(password, encryptedPassword)
        return result
    } catch(e) {
        throw e
    }
}

export async function createToken(payload:any){
    return jwt.sign(payload, "halosayang", { expiresIn: '604800s' })
}