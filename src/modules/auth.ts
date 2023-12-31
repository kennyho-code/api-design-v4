import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    console.log('bearer', bearer);
    if(!bearer){
        res.status(401);
        res.send("Not Authorized");
        return;
    }

    const [, token] = bearer.split(" ");
    if(!token){
        res.status(401);
        res.send("Not Authorized");
        return;
    }

    try {
        console.log('token', token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log(payload);
        next();
        return;
    }catch(e){
        console.error(e);
        res.status(401);
        res.send("Not Authorized");
        return;
    }

}
