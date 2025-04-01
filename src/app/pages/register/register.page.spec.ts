import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    imports: [
      AppRoutingModule
    ]
    router = TestBed.get(Router);
  });

  it('should go to the home page on register', () => {
    spyOn(router, 'navigate');

    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
