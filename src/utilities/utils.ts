import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer";
export const utilities = {
    generatePassword: async (password: string): Promise<string> => {
        let saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },
    validatePassword: async (hash: string, key: string): Promise<Boolean> => {
        const response = bcrypt.compareSync(key, hash); // true
        return response
    },
    generateToken: async (data: string): Promise<string> => {
        const token = await jwt.sign({
            data: data
        }, 'booking', { expiresIn: '1h' });
        return token

    },
    validateToken: (token: string): jwt.JwtPayload => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'booking', (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
    , sendMail: async (mail, password) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.forwardemail.net",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: 'your mail',
                pass: 'passsrod'
            }
        });
        const info = await transporter.sendMail({
            from: '"Fred Foo 👻"your mail', // sender address
            to: mail, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `your first time Passord ${password}`, // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
    },
    AutoPassord: (length, chars) => {
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password
    }

}