import basicAuth from 'basic-auth-connect';
const { ADMIN_AUTH } = process.env;
console.log("Starting server...");

import '../../api';

Meteor.startup(function () {
  const auth = ADMIN_AUTH || undefined;

  if (auth) {
    WebApp.connectHandlers.use(basicAuth(function (user, pass) {
      const adminAuthSplit = ADMIN_AUTH.split(':')
      return adminAuthSplit[0] === user && adminAuthSplit[1] === pass;
    }));

    // // move auth to the top of the stack
    basicAuth = WebApp.connectHandlers.stack.pop();
    WebApp.connectHandlers.stack.unshift(basicAuth);
  }
});
