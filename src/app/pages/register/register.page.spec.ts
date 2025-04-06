import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register.module';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let formBuilder: FormBuilder;
  let page: { querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        RegisterPageModule
      ],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);
    formBuilder = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }));

  it('should create register form on page init', () => {
    fixture.detectChanges();

    expect(component.registerForm).not.toBeUndefined();
  })

  it('should go to the home page on register', () => {
    spyOn(router, 'navigate');

    component.registerForm.getForm()?.get('name').setValue("anyName");
    component.registerForm.getForm()?.get('email').setValue("any@email.com");
    component.registerForm.getForm()?.get('password').setValue("anyPassword");
    component.registerForm.getForm()?.get('repeatPassword').setValue("anyPassword");
    component.registerForm.getForm()?.get('phone').setValue("anyPhone");

    page.querySelector('ion-button').click();

    
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should not be allowed to register with form invalid', () => {
    fixture.detectChanges();

    spyOn(router, 'navigate');

    page.querySelector('ion-button').click();

    expect(router.navigate).toHaveBeenCalledTimes(0);
  })

});
