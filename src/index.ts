import { sign, verify, SignOptions } from 'jsonwebtoken';

const __SECRET__ = 'SECRETKUB';

export interface IPayload {
    love: string[];
    name: string;
    game: string;
}

export function getSignToken(payload: IPayload, expiresIn = '1hr') {
    const { love } = payload;

    const options: SignOptions = {
        expiresIn,
        audience: love
    };

    return sign(payload, __SECRET__, options);
}

export function verifyToken(token: string, audience: string | string[]) {
    return verify(token, __SECRET__, { audience });
}
