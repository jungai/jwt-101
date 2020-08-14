import { IPayload, getSignToken, verifyToken } from '.';

it('should pass verify token', () => {
    const payload: IPayload = {
        name: 'ju',
        game: 'valorant',
        love: ['ghee', 'june']
    };

    const token = getSignToken(payload);

    // next time
    const decode = verifyToken(token, ['june']) as IPayload;

    expect(typeof token).toEqual('string');
    expect(typeof decode).toEqual('object');

    expect(decode.name).toEqual('ju');
    expect(decode.game).toEqual('valorant');
    expect(decode.love).toEqual(['ghee', 'june']);
});

it('should pass with audience is empty string', () => {
    const payload: IPayload = {
        name: 'ju',
        game: 'valorant',
        love: ['ghee', 'june']
    };

    const token = getSignToken(payload);

    // next time
    const decode = verifyToken(token, ['june']) as IPayload;

    expect(typeof token).toEqual('string');
    expect(typeof decode).toEqual('object');

    expect(decode.name).toEqual('ju');
    expect(decode.game).toEqual('valorant');
    expect(decode.love).toEqual(['ghee', 'june']);
});

it('should error with audience not match', () => {
    try {
        const payload: IPayload = {
            name: 'ju',
            game: 'valorant',
            love: ['ghee', 'june']
        };

        const token = getSignToken(payload);

        verifyToken(token, 'test');
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(JSON.stringify(error)).toContain('jwt audience invalid');
    }
});
