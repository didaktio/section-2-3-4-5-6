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
        accountType: AccountType;
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
        accountType: AccountType;
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

/**
 * Account type of the user. Valid vales are `'enterprise'` or `'standard'`.
 */
export type AccountType = string;

export interface CustomClaims {
    accountType: AccountType;
}

export interface LocalData {
    accountType: AccountType;
    name: string;
    handle: string;
}