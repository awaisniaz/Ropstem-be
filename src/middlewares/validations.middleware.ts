import { Request, Response, NextFunction } from "express";
import { utilities } from "../utilities/utils";
import multer from 'multer';
import upload from '../multer-configuration/index';
import fs from 'fs'
export const validations_middleware = {
    validateUser: async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.headers['authorization']
        utilities?.validateToken(token).then((data: any) => {
            req['email'] = data
            next()
        }).catch((err: Error) => {
            return res.send({ message: err?.message })
        })

    },
}