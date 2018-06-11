/**
 * @providesModule data.PersistentData
 * @flow
 */

import { AsyncStorage } from 'react-native';

// Careful: this is async.

export default class PersistentData {
    static instances: {[key: string]: PersistentData} = {};

    _name: string;
    _content: any;

    constructor(name: string) {
        this._name = name;
        this._content = null;
        PersistentData.add(this);
        this.readContent();
    }

    static get(name: string): PersistentData {
        if (PersistentData.instances.hasOwnProperty(name)) {
            return PersistentData.instances[name];
        } else {
            return new PersistentData(name);
        }
    }

    static add(data: PersistentData) {
        PersistentData.instances[data.getName()] = data;
    }

    getName(): string {
        return this._name;
    }

    getInternalId(): string {
        return '@PersistentDataStore:___' + this._name;
    }

    hasKey(name: string): boolean {
        return this._content && this._content.hasOwnProperty(name);
    }

    getValue(name: string): any {
        return this._content == null ? null : this._content[name];
    }

    deleteKey(name: string): boolean {
        if (this._content == null) {
            console.error('Error! Tried deleting PersistentData key that is not read yet!');
            return false;
        } else {
            const retValue = delete this._content[name];
            this.writeContent();
            return retValue;
        }
    }

    setValue(name: string, value: any) {
        if (this._content == null) {
            console.error('Error! Tried setting PersistentData content that is not read yet!');
        } else {
            this._content[name] = value;
            this.writeContent();
        }
    }

    getString(name: string) {
        return this.hasKey(name) ? (this.getValue(name): string) : null;
    }

    setString(name: string, value: string) {
        this.setValue(name, value);
    }

    async readContent(callback?: () => void) {
        try {
            const value = await AsyncStorage.getItem(this.getInternalId());
            if (value !== null) {
                this._content = JSON.parse(value);
            } else {
                this._content = {};
            }
            if (callback) callback();
        } catch (error) {
            console.warn('Error reading PersistentData', error);
        }
    }

    async writeContent(callback?: () => void) {
        try {
            await AsyncStorage.setItem(this.getInternalId(), JSON.stringify(this._content));
            if (callback) callback();
        } catch (error) {
            console.warn('Error writing PersistentData', error);
        }
    }
}
