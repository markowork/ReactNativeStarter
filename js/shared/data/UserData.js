/**
 * @providesModule data.UserData
 * @flow
 */

import PersistentData from 'data.PersistentData';

type UserDataState = {
    exampleFlag?: boolean,
};

const initialState = {
    exampleFlag: false,
};

class UserData {
    _data: PersistentData;
    _hasData: boolean;
    _content: ?UserDataState;

    constructor() {
        this._hasData = false;
        this._data = new PersistentData('user_data');
        this.read();
    }

    read(callback?: (data: UserData) => void) {
        this._data.readContent(() => {
            this._hasData = true;
            this._content = this._data.getValue('data');
            if (this._content == null) {
                // Set the defaults
                this._content = {
                    ...initialState,
                };
            }

            // Finished, call back if needed
            if (callback) callback(this);
        });
    }

    write(callback?: (data: UserData) => void, waitForRead?: boolean) {
        if (this._hasData) {
            this._data.setValue('data', this._content);
            this._data.writeContent(() => {
                if (callback) {
                    if (waitForRead) {
                        this.read(callback);
                    } else {
                        callback(this);
                    }
                }
            });
        } else {
            console.error('Error! Trying to write back data before reading!');
        }
    }

    get() {
        return this._content;
    }

    set(object: UserDataState, callback?: (data: UserData) => void) {
        this._content = {
            ...(this._content ? this._content : {}),
            ...object,
        };
        this.write(callback, true);
    }
}

export default new UserData();
