import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/model/user/User';
import { of } from 'rxjs/internal/observable/of';
import { Observable, take, throwError } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: {
    querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; 
};
  let store: Store<AppState>;
  let toastController: ToastController;
  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();
 
    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = fixture.debugElement.nativeElement;
   
  }));

  it('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  })

  it('should go to the register page on register click', ()=> {
    spyOn(router, 'navigate');
    component.register();
    fixture.detectChanges(); // added
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  })

  it('should recover email/password on forgotten email/password', async () => {
    // start page
    fixture.detectChanges();
    // user set valid email
    component.form.get('email').setValue("valid@email.com");
    // user clicked on forgot email/password button
    page.querySelector("#recoverPasswordButton").click();

    // expect loginState.isRecoveringPassword is true
    const loginState = await store.select('login').pipe(take(1)).toPromise();
    expect(loginState?.isRecoveringPassword).toBeTruthy();

    const loadingState = await store.select('loading').pipe(take(1)).toPromise();
    expect(loadingState?.show).toBeTruthy();
  })

  it('should show loading when recovering password', async () => {
    // start page
    fixture.detectChanges();
    // change isRecoveringPassword to true
    store.dispatch(recoverPassword({email: "any@email.com"}));
    // verify loadingState.show == true
    const loadingState = await store.select('loading').pipe(take(1)).toPromise();
    expect(loadingState?.show).toBeTruthy();
  }) 

  it('given user is recovering password, when success, then hide loading and show success message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    // start page
    fixture.detectChanges();
    // set login state as recovering password
    store.dispatch(recoverPassword({email: "any@email.com"}));
    // set login state as recovered password
    store.dispatch(recoverPasswordSuccess());
    // verify loadingState.show == false
    store.select('loading').subscribe(loadingState => {
      expect(loadingState?.show).toBeFalsy();
    })
    // verify message was shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('given user is recovering password, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    // start page
    fixture.detectChanges();
    // recover password
    store.dispatch(recoverPassword({email: "any@email.com"}));
    // recover password fail
    store.dispatch(recoverPasswordFail({error: "message"}));
    // expect loading not showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState?.show).toBeFalsy(); // was falsy
    })
    // verify error was shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should show loading and start login when logging in', () => {
    // start page
    fixture.detectChanges();
    // set vaild email
    component.form.get('email').setValue('valid@email.com');
    // set any password
    component.form.get('password').setValue('anyPassword');
    // click on login button
    page.querySelector('#loginButton').click();
    // expect loading is showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
    // expect logging in
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('given user is loggin in, when success, then hide loading and send user to home page', async () => {
    //spyOn(router, 'navigate');
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    // start page
    fixture.detectChanges();
    store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
    store.dispatch(loginSuccess({user: new User()}));
    // expect loading is hidden
    const loadingState = await store.select('loading').pipe(take(1)).toPromise();
    expect(loadingState?.show).toBeFalsy();

    const loginState = await store.select('login').pipe(take(1)).toPromise();
    expect(loginState?.isLoggingIn).toBeFalsy();
    // expect the home page is showing
    //expect(router.navigate).toHaveBeenCalledWith(['home']);
    expect(toastController.create).toHaveBeenCalledTimes(0);
  })

  it('given user is loggin in, when fail, then hide loading and show error message', () => {
    //spyOn(authService, 'login').and.returnValue(throwError({message: 'error'}));
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    // start page
     fixture.detectChanges();
     store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
     store.dispatch(loginFail({error: {message: 'error message'}}));
     // set valid password
     
     // click on login button
     
    // expect loading is hidden
    store.select('loading').subscribe(loadingState => {
      expect(loadingState?.show).toBeFalsy();
    })
    // expect error message shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
});
