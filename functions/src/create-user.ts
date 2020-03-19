import { functions, admin, regions } from './config';


interface Data {
    email: string;
    password: string;
    accountType: 'enterprise' | 'standard';
}

const assertData = <T, K extends keyof T>(data: T, key: K) => {
    if (!(key in data)) throw new functions.https.HttpsError('invalid-argument', `function called without ${key} data`);
    return data[key];
}

export const createUser = functions.region(regions.default).https.onCall(async (data: Data, context) => {

    const email = assertData(data, 'email'),
        password = assertData(data, 'password'),
        accountType = assertData(data, 'accountType'),

        { uid } = await admin.auth().createUser({
            email,
            password
        });

    await admin.auth().setCustomUserClaims(uid, {
        custom: {
            accountType
        }
    });

    return await admin.auth().createCustomToken(uid);
})