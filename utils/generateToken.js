import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, user_id) => {
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return token;
};