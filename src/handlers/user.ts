import prisma from "../db";
import { comparePasswords, hashPassword } from "../modules/auth";
import { createJWT } from "../modules/auth";

export const createUser = async (req, res) => {
    const hash = await hashPassword(req.body.password);
    console.log('hash', hash);

    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: hash,
        }
    });

    const token = createJWT(user);
    res.json({ token });
}

export const login = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {username: req.body.username}
    })

    console.log('password', req.body.password);
    console.log('user', user);

    const isValid = await comparePasswords(req.body.password, user.password);

    if(!isValid){
        res.status(401);
        res.json({ message: "Invalid Credentials" });
    }

    const token = createJWT(user);
    return res.json({ token });
}