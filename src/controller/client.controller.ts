import { Request, Response } from "express";
import { Client } from "../models/client";
import { utilities } from "../utilities/utils";
const client_Controller = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req?.body
        const user = await Client?.findOne({ email: email })
        if (!user) {
            return res.send({ message: "User Not Exist with this email" })
        }
        const validatePassword = await utilities?.validatePassword(user?.password, password)
        if (validatePassword == true) {
            const token = await utilities?.generateToken(user?.email)
            const { password, ...withoutPassword } = user["_doc"]
            return res.send({
                message: "Successfully found data",
                data: { user: withoutPassword, token }
            })
        }
        else {
            return res.send({ message: "Incorrect Credentials" })
        }
    },
    register: async (req: Request, res: Response) => {
        const { client } = req.body;
        const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_-=+";
        const integers = 8;
        const autoPassword = utilities?.AutoPassord(integers, alpha)
        const password = await utilities?.generatePassword(autoPassword)
        console.log(autoPassword)
        const newClient = new Client({ ...client, password: password });
        newClient
            .save()
            .then((data) => {
                utilities.sendMail(req.body.email, autoPassword)
                res.status(201).json({ "message": "You register Successfully" })
            })
            .catch((err: Error) => {
                console.log(err)
                res.status(500).json({ message: err.message });
            });
    },
    update_profile: async (req: Request, res: Response) => {
        Client?.findOneAndUpdate({ email: req['email']?.data }, req?.body, { new: true })
            .then((data: any) => {
                return res.send({ message: "Update profile successfully", data: data })
            }).catch((err: Error) => {
                return res.send({ message: err?.message })
            })
    },
    update_image: async (req: Request, res: Response) => {
        res.send({ "message": 'Upload successful' });
    }
}

export default client_Controller;
