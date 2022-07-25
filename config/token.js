const ID_TOKEN_KEY = 'user';
export const getToken = () => {
    return localStorage.getItem(ID_TOKEN_KEY) ? JSON.parse(localStorage.getItem(ID_TOKEN_KEY)).session : null
};

export const validToken = () => {
    let regexUUID4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    return regexUUID4.test(getToken())
}