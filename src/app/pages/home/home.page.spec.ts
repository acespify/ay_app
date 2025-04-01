import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    imports: [
      AppRoutingModule
    ]
    router = TestBed.get(Router);
  });

  it('should go to the History page when See All is clicked', () => {
    spyOn(router, 'navigate');

    component.goToHistory();

    expect(router.navigate).toHaveBeenCalledWith(['history']);
  });
  
  it('should go to the new-note page when plus is clicked', () => {
    spyOn(router, 'navigate');

    component.goToNewNotes();
    
    expect(router.navigate).toHaveBeenCalledWith(['new-notes']);
  });
  
});
