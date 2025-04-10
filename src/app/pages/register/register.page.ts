import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder } from '@angular/forms';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { hide, show } from 'src/store/loading/loading.actions';
import { ToastController } from '@ionic/angular';
import { login } from 'src/store/login/login.actions';
import { Subscription } from 'rxjs';
import { UserRegister } from 'src/app/model/UserRegister';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit, OnDestroy {

  registerForm: RegisterPageForm | any;

  registerStateSubscription?: Subscription;
  isLoading: boolean | undefined;
  //router: any;
  

  constructor( 
    private formBuilder: FormBuilder, 
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.watchRegisterState();
  }

  ngOnDestroy(): void {
      this.registerStateSubscription?.unsubscribe();
  }

  register() {
    this.registerForm.getForm().markAllAsTouched();
    if (this.registerForm && this.registerForm.getForm() && this.registerForm.getForm().valid) {
      this.isLoading = true;
      const userData: UserRegister = this.registerForm.getForm().value; // Ensure it's typed as UserRegister
      console.log('RegisterPage: Calling authService.register with:', userData);
      this.authService.register(userData).subscribe(
        (userCredential: any) => {
          this.isLoading = false;
          console.log('RegisterPage: Registration successful:', userCredential);
          this.presentToast('Registration successful!', 'success');
          this.router.navigate(['/login']);
        },
        (error: { message: any; }) => {
          this.isLoading = false;
          console.error('RegisterPage: Registration error:', error);
          this.presentToast(error.message || 'Registration failed.', 'danger');
        }
      );
    } else {
      console.log('RegisterPage: Form is NOT valid');
      this.presentToast('Please fill in all required fields correctly.', 'warning');
    }
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState() {
    this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);

      this.onRegistered(state);
     
      this.onError(state);
    })
  }

  private onRegistered(state: RegisterState){
     if(state.isRegistered)      {
        this.store.dispatch(login({
          email: this.registerForm.getForm().value.email,
          password: this.registerForm.getForm().value.password
        }));
      }
  }

  private onError(state: RegisterState){
    if(state.error){
        this.toastController.create({
          message: state.error.message,
          duration: 5000,
          header: 'Registration not completed'
        }).then(toast => toast.present());
      }
  }

  private toggleLoading(state: RegisterState){
    if (state.isRegistering){
      this.store.dispatch(show());
    }else{
      this.store.dispatch(hide());
    }
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom'
    })
    await toast.present();
  }

}
