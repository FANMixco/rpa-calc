import { LocalStorage } from './local-storage';

export class FireBase {
    updateData() {

      let storage = new LocalStorage();
      storage.setLocalStorage("isReady", "false");

      fetch(`https://rpa-prices.firebaseio.com/version.json`)
         .then(function(response) {
            return response.json();
         })
         .then(function(version) {
            if (storage.getLocalStorageValue("currentCache") !== version) {
               fetch(`https://rpa-prices.firebaseio.com/technologies.json`)
               .then(function(response) {
                  return response.json();
               })
               .then(function(data) {
                  storage.setLocalStorage("availableCopy", JSON.stringify(data));
                  storage.setLocalStorage("currentCache", version);
                  storage.setLocalStorage("isReady", "true");
               });
            } else {
               storage.setLocalStorage("isReady", "true");
            }
         });
     }
}
