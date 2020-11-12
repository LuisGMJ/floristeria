import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { of, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBNE_C4cmGnKN3xR89y0IwKtC92l6ftLI8';

  userToken: string;

  showSession = false;

  userData: any;

  emailVerified: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  // errores firebase
  firebaseMessage = {
    'auth/email-already-in-use': 'Este correo electrónico ya esta en uso por otra cuenta',
    'auth/network-request-failed': 'Se ha producido un error de red, favor revise su conexión a internet',
    'auth/wrong-password': 'El usuario y/o la contraseña no son validos',
    'auth/user-not-found': 'El usuario y/o la contraseña no son validos',
  };

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private auth: AngularFireAuth,
              private afs: AngularFirestore,
              public router: Router) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  logout() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.SetUserData(result.user).then(() => {
          if (result.user.emailVerified) {
            console.log('Verificado');
            this.router.navigate(['admin']);
          } else {
            console.log('No Verificado');
            this.emailVerified.next(false);
          }
        });
      }).catch((error) => {
        console.log(error);
        if (error?.code) {
          this.toastr.error(this.firebaseMessage.hasOwnProperty(error.code) ? this.firebaseMessage[error.code] : error.message);
        } else {
          this.toastr.error('Ah ocurrido un error desconocido');
        }
      });
  }

  register(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        console.log(result);
        this.SendVerificationMail(result.user).then(res => {
          console.log(res);
          this.SetUserData(result.user);
        }, err => {
          this.toastr.error('No se pudo verificar el correo electrónico');
        });
      }).catch((error) => {
        console.log(error);
        if (error?.code) {
          this.toastr.error(this.firebaseMessage.hasOwnProperty(error.code) ? this.firebaseMessage[error.code] : error.message);
        } else {
          this.toastr.error('Ah ocurrido un error desconocido');
        }
      });

  }
  
  isAuthenticated(): boolean {
    if (this.userToken.length < 1) {
      return false;
    }

    const expiration = Number(localStorage.getItem('expiration'));
    const expirationDate = new Date();

    expirationDate.setTime(expiration);

    if (expirationDate > new Date()) {
      return true;
    } else {
      console.error('token expirado');
      this.showSession = false;
      return false;
    }
  }


  // Send email verfificaiton when new user sign up
  SendVerificationMail(user?: firebase.User) {
    return user.sendEmailVerification({url: 'http://localhost:4200/#/login'}).then(() => true, () => false);
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true
    });
  }
}
