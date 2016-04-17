"use strict";
var Firebase = require('firebase');
var Auth = (function () {
    function Auth() {
    }
    Auth.firebase = function (firebaseUrl, token) {
        var $fb = new Firebase(firebaseUrl);
        return new Promise(function (resolve, reject) {
            console.log('Authenticating to Firebase...');
            $fb.authWithCustomToken(token, function (error) {
                if (error) {
                    console.error('Invalid token, cannot auth to Firebase');
                    throw new Error('Invalid token, cannot auth to Firebase');
                }
                else {
                    console.log('Succesfully authenticated to ' + firebaseUrl + '!');
                    resolve($fb);
                }
            });
        });
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map