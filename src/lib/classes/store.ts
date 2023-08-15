export class Store {
    /**
     * VARIABLES
     */
    private _storeNumber: string; // Storenumber of the store(its uniqe id)
    private _password: string; // password for the store
    private _country: 'se' | 'no'; // Country for the store

    /**
     * Simple constructor
     */
    constructor(storeNumber: string, password: string, country: 'se' | 'no') {
        this._storeNumber = storeNumber;
        this._password = password;
        this._country = country;
    }

    /**
     * Create an new store object from an exsisting object
     * @param object an object containing storenumber, password and country data
     * @returns a new store object
     */
    static createFromObject(object: any) {
        // Check if inputobject has all varaibles
        if (
            typeof object.storenumber === 'string' &&
            typeof object.password === 'string' &&
            (object.country === 'se' || object.country === 'no')
        ) {
            //return new storeobject 
            return new Store(
                object.storenumber,
                object.password,
                object.country
            );
        } else {
            //If all data is not correct throw an error
            throw new Error('Invalid input types' + JSON.stringify(object));
        }
    }

    // Getter and setter for storenumber variable
    get storeNumber(): string {
        return this._storeNumber;
    }

    set storeNumber(storeNumber: string) {
        this._storeNumber = storeNumber;
    }

    // Getter and setter for password variable
    get password(): string {
        return this._password;
    }

    set password(password: string) {
        this._password = password;
    }

    // Getter and setter for the country variable
    get country(): 'se' | 'no' {
        return this._country;
    }

    set country(country: 'se' | 'no') {
        this._country = country;
    }
}
