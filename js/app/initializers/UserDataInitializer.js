/**
 * @flow
 */

import UserData from 'data.UserData';

export function userDataInitializer(): Promise<void> {
    return new Promise((resolve, reject) => {
        UserData.read((data) => {
            // We wait one additional frame before starting everything; this is done to
            // avoid having it run within a PersistentData context, which would mean initialization
            // errors are hidden away (and we only get PersistentData errors instead).
            requestAnimationFrame(() => {
                resolve();
            });
        });
    });
}
