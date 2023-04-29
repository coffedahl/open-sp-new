/**
 * Function for getting url depending if in dev env or in production
 * @returns url for api
 */
export function getURL() {
    const url: string = import.meta.env.MODE === 'development' ?
        'http://localhost:8080' : 'https://api.coffedahl.com';
    return url
}

/**
 * Function that calls focus to an element
 */
export function callFocus(e: any) {
    e.focus();
}
