import { LocalStorage } from './local-storage';

export class FireBase {
    updateData() {
        let storage = new LocalStorage();

        let currentCache = parseInt(storage.getLocalStorageValue("currentCache"));
     
        let currentDiff = 7;

        if (!currentCache && !isNaN(currentCache)) {
           const diffTime = Math.abs(new Date().getTime() - new Date(currentCache).getTime());
           currentDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        }
     
        storage.setLocalStorage("isReady", "true");
        if (currentDiff === 7) {
            storage.setLocalStorage("isReady", "false");
            fetch(`https://rpa-prices.firebaseio.com/technologies.json`)
            .then(function(response) {
               return response.json();
            })
            .then(function(data) {
               storage.setLocalStorage("availableCopy", JSON.stringify(data));
               let currentDate = new Date();
               storage.setLocalStorage("currentCache", `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`);
               storage.setLocalStorage("isReady", "true");
            });
        }
     }
}
