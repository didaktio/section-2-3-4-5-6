import { Timestamp } from '../services/db.service';

export declare namespace User {

    interface _base {
        accountType: AccountType;
        createdAt: Timestamp;
        uid: string;
        handle: string;
        loggedIn: boolean;
        profilePicPath: string;
    }

    interface Standard extends _base {
        accountType: 'standard';
        general: {
            firstName: string;
            lastName: string;
            dateOfBirth: {
                day: number;
                month: number;
                year: number;
            };
            mobile: number;
        };
    }

    interface Enterprise extends _base {
        accountType: 'enterprise';
        company: {
            name: string;
            founded: {
                day: number;
                month: number;
                year: number;
            };
            contact: string;
        };
    }
}

export type AccountType = 'enterprise' | 'standard';

export interface CustomClaims {
    accountType: AccountType;
}

export interface LocalData {
    accountType: AccountType;
    name: string;
    handle: string;
}