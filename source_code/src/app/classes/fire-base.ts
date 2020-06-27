import { LocalStorage } from './local-storage';
import { environment } from 'src/environments/environment.prod';

export class FireBase {
    updateData() {

      let storage = new LocalStorage();
      storage.setLocalStorage("isReady", "false");

      fetch(environment.version)
         .then(function(response) {
            return response.json();
         })
         .then(function(version) {
            if (storage.getLocalStorageValue("currentCache") !== version) {
               fetch(environment.techs)
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
