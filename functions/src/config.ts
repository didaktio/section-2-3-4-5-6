import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';

admin.initializeApp();


export { admin };
export { functions };

export const regions = {
    default: 'europe-west2'
} as const;