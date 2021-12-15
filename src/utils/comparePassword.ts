import bcrypt from 'bcryptjs'

async function comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}

export default comparePassword