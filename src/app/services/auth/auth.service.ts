import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import * as firebase from 'firebase/compat/app';
import { UserRegister } from 'src/app/model/UserRegister';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private auth: AngularFireAuth) { }
/*
  register(userRegister: UserRegister) : Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        if(userRegister.email == "error@email.com") {
          observer.error({message: "email already exists"});
        } else {
          observer.next();
        }
        observer.complete();
      }, 3000)
    })
  }*/

    register(userRegister: UserRegister) : Observable<firebase.default.auth.UserCredential> {
      return from(this.auth.createUserWithEmailAndPassword(userRegister.email, userRegister.password));
    }

  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
      this.auth.sendPasswordResetEmail(email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.next(error);
        observer.complete();
      })
    })
  }

  login(email: string, password: string) : Observable<User> {
    return new Observable<User>(observer => {
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.SESSION).then(() =>{
        this.auth.signInWithEmailAndPassword(email, password)
        .then((firebaseUser: firebase.default.auth.UserCredential) => {
          observer.next({
            email, userId: firebaseUser.user?.uid,
            name: undefined,
            phone: undefined
          });
          observer.complete();
        }).catch((err) => {
          observer.error(err);
          observer.complete();
        })
      })
    })
  }
}
