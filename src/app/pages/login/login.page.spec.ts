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
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: { querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; };
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
        StoreModule.forFeature("login", loginReducer)
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

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('should go to the register page on register click', ()=> {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  })

  it('should recover email/password on forgotten email/password', () => {
    // start page
    fixture.detectChanges();
    // user set valid email
    component.form.get('email').setValue("valid@email.com");
    // user clicked on forgot email/password button
    page.querySelector("#recoverPasswordButton").click();
    // expect loginState.isRecoveringPassword is true
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  })

  it('should show loading when recovering password', () => {
    // start page
    fixture.detectChanges();
    // change isRecoveringPassword to true
    store.dispatch(recoverPassword());
    // verify loadingState.show == true
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })

  })

  it('should hide loading and show success message when password has been recovered', () => {
    spyOn(toastController, 'create');
    // start page
    fixture.detectChanges();
    // set login state as recovering password
    store.dispatch(recoverPassword());
    // set login state as recovered password
    store.dispatch(recoverPasswordSuccess());
    // verify loadingState.show == false
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    // verify message was shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should hide loading and show error message when error on recover password', () => {
    spyOn(toastController, 'create');
    // start page
    fixture.detectChanges();
    // recover password
    store.dispatch(recoverPassword());
    // recover password fail
    store.dispatch(recoverPasswordFail({error: "message"}));
    // expect loading not showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    // verify error was shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
});
