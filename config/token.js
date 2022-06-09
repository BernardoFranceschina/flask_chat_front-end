const ID_TOKEN_KEY = 'token';
export const getToken = () => {
    return localStorage.getItem(ID_TOKEN_KEY).replace('"', '')
};

export const validToken = () => {
    const base64Url = getToken().split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    if (JSON.parse(jsonPayload).exp < Date.now() / 1000) {
        return false
    } else {
        return true
    }
}