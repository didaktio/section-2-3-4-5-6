import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';

admin.initializeApp();


export { admin };
export { functions };

type Region = typeof functions.SUPPORTED_REGIONS[number];
interface Regions { [key: string]: Region }

// [TODO] You can either:
// 1) Remove this object altogether and allow firebase to cloud functions to fallback on default region (us-centralX). This is wise if you're creating a globally-distributed
// application and/or are only in devevelopment at the moment. If you choose this option you'll also have to remove the .region chained call on each function.
// 2) Use the region nearest to you (check documentation if you're uncertain).
// Documentation: https://firebase.google.com/docs/functions/locations
export const regions: Regions = {
    default: 'us-central1',
    Iowa: 'us-central1',
    SouthCarolina: 'us-east1',
    NorthVirginia: 'us-east4',
    Belgium: 'europe-west1',
    London: 'europe-west2',
    Tokyo: 'asia-northeast1',
    HongKong: 'asia-east2'
};