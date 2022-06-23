import {Request, Response} from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';

// local imports 
import { User } from '../../models/user.model';
import isValidEmail from '../../atoms/email/isValidEmail';
import isValidObject from '../../atoms/objects/isValidObject';
import isEmptyObject from '../../atoms/objects/isEmptyObject';
import isValidUsername from '../../atoms/username/isValidUsername';
import isValidPassword from '../../atoms/password/isValidPassword';

// locale
import {
    userAlreadyExistError,
    invalidEmailOrPasswordErrorText,
    unauthorizedAccess,
    authorizedAccess,
    tokenErrorText
} from '../../Locale/controllers/auth';

dotenv.config();

async function encryptString(plainString: string){
    const salt = await bcrypt.genSalt(10);
    const hashedString = await bcrypt.hash(plainString, salt);

    return hashedString;
};

/**
 * User Sign Up
 */
export async function registerUser(req: Request, res: Response){

    if( isEmptyObject(req.body) ){
        return res.status(400);
    }

    const userRequestObject = isValidObject(req.body, ['username', 'email', 'password']);

    if( !userRequestObject.status ){
        return res.status(400).json(userRequestObject);
    }

    if( !isValidEmail(req.body.email).status ){
        return res.status(400).json(isValidEmail(req.body.email));
    }

    if( !isValidUsername(req.body.username).status ){
        return res.status(400).json(isValidUsername(req.body.username)); 
    }

    if( !isValidPassword(req.body.password).status ){
        return res.status(400).json(isValidPassword(req.body.password));
    }

    try {

        const hashedPassword = await encryptString(req.body.password);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            createdDate: new Date()
        });

        /**
         * checking if user with same email address already exists or not
         */
        const existingUserCheck = await User.findOne({email: req.body.email});

        if( existingUserCheck ){
            return res.status(409).json({
                message: userAlreadyExistError
            })
        }

        await user.save();

        return res.status(201).json({
            username: req.body.username,
            email: req.body.email,
            createdDate: new Date()
        });
    }catch(error){
        return res.status(412).json(error);
    }
};

async function generateJWT(username: string, id: string){
    const payload = {
        username,
        id
    };

    const tokenSecret = process.env.TOKEN_SECRET as string;
    return jwt.sign(payload, tokenSecret, {expiresIn: '1800s'});
};

export async function login(req: Request, res: Response){

    if( isEmptyObject(req.body) ){
        return res.status(400);
    }

    const loginObject = isValidObject(req.body, ['email', 'password']);

    if( !loginObject.status ){
        return res.status(404).json(loginObject);
    }

    try {
        const fetchedUser = await User.findOne({email: req.body.email});

        if( !fetchedUser ){
            return res.status(404).json({
                message: invalidEmailOrPasswordErrorText
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, fetchedUser.password);

        if( !validPassword ){
            return res.status(404).json({
                message: invalidEmailOrPasswordErrorText
            });
        }

        const token = await generateJWT(fetchedUser.username, fetchedUser.id);

        return res.status(200).json({
            email: req.body.email,
            username: fetchedUser.username,
            token: token
        });
    }catch(error){
        return res.status(412).json(error);
    }

};

export async function changePassword(req:Request, res:Response){

    if( isEmptyObject(req.body) ){
        return res.status(400);
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')?.[1];

    if( !token ){
        return res.status(401).json({
            message: unauthorizedAccess
        });
    }

    const tokenSecret = process.env.TOKEN_SECRET as string;

    let decodedJWT: jwt.JwtPayload | string;

    try{
        decodedJWT = jwt.verify(token, tokenSecret);
    }catch(error){
        return res.status(412).json({
            message: tokenErrorText
        })
    };

    if( !decodedJWT ){
        return res.status(400).json({
            message: tokenErrorText
        });
    }

    const updatePasswordObject = isValidObject(req.body, ['oldPassword', 'newPassword']);

    if( !updatePasswordObject.status ){
        return res.status(400).json(updatePasswordObject);
    }
};