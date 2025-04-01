import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;
  let router: Router;

  beforeEach(() => {
    imports: [ AppRoutingModule]
    fixture = TestBed.createComponent(LoaderPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should go to the login page after load', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.ngOnInit();

    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }))
});
