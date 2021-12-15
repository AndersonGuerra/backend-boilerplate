import { Request as RequestAux } from 'express'

interface Request extends RequestAux {
    user: any
}

export default Request