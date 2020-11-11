export function setStorage (key, val) {
    return localStorage.setItem(key, val)
}

export function getStorage (key) {
    return JSON.parse(localStorage.getItem(key))
}