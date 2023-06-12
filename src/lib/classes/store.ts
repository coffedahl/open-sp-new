export class Store {
    private _storeNumber: string;
    private _password: string;
    private _country: 'se' | 'no';

    constructor(storeNumber: string, password: string, country: 'se' | 'no') {
        this._storeNumber = storeNumber;
        this._password = password;
        this._country = country;
    }

    static createFromObject(object: any) {
        if (
            typeof object.storeNumber === 'string' &&
            typeof object.password === 'string' &&
            (object.country === 'se' || object.country === 'no')
        ) {
            return new Store(
                object.storeNumber,
                object.password,
                object.country
            );
        } else {
            throw new Error('Invalid input types');
        }
    }

    get storeNumber(): string {
        return this._storeNumber;
    }

    set storeNumber(storeNumber: string) {
        this._storeNumber = storeNumber;
    }

    get password(): string {
        return this._password;
    }

    set password(password: string) {
        this._password = password;
    }

    get country(): 'se' | 'no' {
        return this._country;
    }

    set country(country: 'se' | 'no') {
        this._country = country;
    }
}
