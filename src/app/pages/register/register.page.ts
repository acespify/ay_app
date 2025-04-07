import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder } from '@angular/forms';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { hide, show } from 'src/store/loading/loading.actions';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  registerForm: RegisterPageForm | any;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController) { }

  ngOnInit() {
    this.createForm();
    this.watchRegisterState();
  }

  register(){
    this.registerForm.getForm().markAllAsTouched();
    if(this.registerForm && this.registerForm.getForm() && this.registerForm.getForm().valid){//(this.registerForm.getForm().valid){
      this.store.dispatch(register({userRegister: this.registerForm.getForm().value}))
    }else {
      console.error('Register form is not valid or has not been initialized');
  }
    
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState() {
    this.store.select('register').subscribe(state => {
      this.toggleLoading(state);

      if(state.isRegistered)      {
        this.router.navigate(['home']);
      }
      if(state.error){
        this.toastController.create({
          message: state.error.message,
          duration: 5000,
          header: 'Registration not completed'
        }).then(toast => toast.present());
      }
    })
  }

  private toggleLoading(state: RegisterState){
    if (state.isRegistering){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

}
