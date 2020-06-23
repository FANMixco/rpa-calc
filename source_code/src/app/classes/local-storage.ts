export class LocalStorage {
    setLocalStorage(key:string, val:string) {
        if (this.getLocalStorageValue(key) !== null)
            this.removeLocalStorage(key);
        localStorage.setItem(key, val);
    }
    
    getLocalStorageValue(key:string) {
        return localStorage.getItem(key);
    }
    
    removeLocalStorage(key:string) {
        localStorage.removeItem(key);
    }
}
