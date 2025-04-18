import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, recoverPassword } from 'src/store/login/login.actions';
import { NavController, ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup | any;
  loginStateSubscription?: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private navController: NavController) { }
    
  
  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);

  
      this.onIsLoggedIn(loginState);

      this.onError(loginState);
      this.toggleLoading(loginState);
    })
  }

  ngOnDestroy() {
    if(this.loginStateSubscription){
      this.loginStateSubscription?.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState){
    if(loginState.isLoggedIn){
      this.navController.navigateRoot('home');
    }
  }

  private async onError(loginState: LoginState){
    if(loginState.error){
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toaster.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary"
      });
      toaster.present();
    }
  }

  forgotEmailPassword(){
    this.store.dispatch(recoverPassword({email: this.form.get('email').value}));
  }

  login() {
    this.store.dispatch(login({email: this.form.get('email').value, password: this.form.get('password').value}));
  }

  register() {
    this.router.navigate(['register'])
  }

}
