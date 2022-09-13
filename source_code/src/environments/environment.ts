// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  warning: "<li><b>WARNING.</b> These are estimations that can change at any time. In most of cases, you need to contact the sales team.</li>",
  version: `https://rpa-prices.firebaseio.com/version.json`,
  techs: `https://rpa-prices.firebaseio.com/technologies.json`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
