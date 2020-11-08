import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData; token;
  
  constructor(private http:HttpClient,
    public afAuth: AngularFireAuth,
    public firebase: FirebaseApp,
    public afs:AngularFirestore,
    public router: Router) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          // console.log(user.displayName);
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          // console.log(JSON.parse(localStorage.getItem('user')));
        } else {
          localStorage.setItem('user', null);
        }
      })
   }
  getOptions(){
    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer '+this.token);
    return {
      headers
    }
  }
  getBanner(tokenValue ) {  
      this.token = tokenValue;
       return this.http.get('https://api-dev.sainaplay.info/banners',this.getOptions()); 
  }
  
    signUp(data) {            
      this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {   
        console.log(data)
        // this.afs.doc('userdata');
        this.router.navigateByUrl('');
      }).catch(error => {
        window.alert(error);
      })
    }
  
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user != null) ? true : false;
    }

    login (email, password) {      
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userLogin => {
       userLogin.user.getIdToken().then(tokenValue => {
        localStorage.setItem('token', JSON.stringify(tokenValue));
       }).catch(err => {
         window.alert(err)
       })
        this.router.navigateByUrl("home")
      }).catch(err => {
        window.alert(err);
      })
    }

    // private oAuthLogin(provider) {
    //   return this.afAuth.signInWithPopup(provider)
    //   .then((credential) => {
        
    //   })
    // }

    // updateUserData(user) {
    //   const userRef = this.afs.collection('users').doc(user.uid);
    //   const data: User = {
    //     uid: user.uid,
    //     email: user.email,
    //     displayName:user.displayName
    //   }
    // }

    signOut() {
      return this.afAuth.signOut()      
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('login');
      })
    }
}
