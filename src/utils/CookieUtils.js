/**
 * Function to get a cookie by name
 *
 * @param name
 * @returns {string|null}
 */
export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

/**
 * Function to set a cookie
 *
 * @param name
 * @param value
 * @param days
 */
export const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

/**
 * Function to delete a cookie
 *
 * @param name
 */
export const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
};
