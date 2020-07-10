// --------------------------------------------------
// This vanilla JS Router is made with the help of the following article : https://dev.to/kodnificent/how-to-build-a-router-with-vanilla-javascript-2a18
// --------------------------------------------------
// Author : Sacha André
// Github : https://github.com/sachaandre

class Router {
  constructor() {
    this.routes = [];
  }

  get(uri, callback) {
    // ensure that the parameters are not empty
    if (!uri || !callback) throw new Error('uri or callback missing');
      // ensure that the parameters have the correct types
      if (typeof uri !== "string") throw new TypeError('typeof uri must be a string');
      if (typeof callback !== "function") throw new TypeError('typeof callback must be a function');
      // throw an error if the route uri already exists to avoid confilicting routes
      this.routes.forEach(route => {
        if (route.uri === uri) throw new Error('the uri ${route.uri} already exists');
      });

      //if no errors - add the route
      const route = {
        uri, //same as uri: uri
        callback
      }
      this.routes.push(route);
    }

    init() {
      this.routes.some(route => {

        let regEx = new RegExp(`^${route.uri}$`);
        let path = window.location.pathname;

        if (path.match(regEx)) {
          // our route logic is true, return the corresponding callback

          let req = {
            path
          }
          return route.callback.call(this, req);
        }
      })
    }

  }

  export default Router;
