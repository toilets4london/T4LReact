const CACHE_INTERVAL = 60 * 60 * 1000;

interface IsValidResponse {
    isValid: boolean,
    value?: string,
}

function store(key: string, value: string) {
    console.log("Storing")
    const finalValue = `${value}//**//${Date.now().toString()}`;
    localStorage.setItem(key, finalValue);
}

function isValid(key: string): IsValidResponse {
    const value = localStorage.getItem(key);
    if (value === null) {
        return {
            isValid: false,
        };
    }
    const values = value.split('//**//');
    const timestamp = Number(values[1]);
    if (Number.isNaN(timestamp)) {
        return {
            isValid: false,
        };
    }
    const date = new Date(timestamp);
    if (date.toString() === 'Invalid Date') {
        return {
            isValid: false,
        };
    }
    if ((Date.now() - date.getTime()) < CACHE_INTERVAL) {
        return {
            isValid: true,
            value: values[0],
        };
    }
    localStorage.removeItem(key);
    return {
        isValid: false,
    };
}

export const cache = {
    store, isValid,
};
