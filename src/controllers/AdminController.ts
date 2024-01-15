import {Request, Response, NextFunction } from 'express'

export const testRouters =  (req: Request, res: Response, Next: NextFunction) => {
    res.send("Hellow MCsss")
}