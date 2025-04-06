import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  registerForm: RegisterPageForm | any;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  register(){
    this.registerForm.getForm().markAllAsTouched();
    if(this.registerForm && this.registerForm.getForm() && this.registerForm.getForm().valid){//(this.registerForm.getForm().valid){
      this.router.navigate(['home'])
    }else {
      console.error('Register form is not valid or has not been initialized');
  }
    
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

}
