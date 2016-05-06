import Firebase = require('firebase');

export class Auth {

  constructor() { }
  
  static firebase(firebaseUrl: string, token: string): Promise<any> {
    
    var $fb = new Firebase(firebaseUrl);
    
    return new Promise(function (resolve, reject) {
      
      console.log('Authenticating to Firebase');
      
      $fb.authWithCustomToken(token, function (error) {
        if (error) {
          reject(new Error('Invalid token, cannot auth to Firebase'));
        } else {
          console.log('Succesfully authenticated to ' + firebaseUrl);
          resolve($fb);
        }
      });
    });
  }
}
