import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewNotesPage } from './new-notes.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('NewNotesPage', () => {
  let component: NewNotesPage;
  let fixture: ComponentFixture<NewNotesPage>;
  let router: Router;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    imports: [
      AppRoutingModule
    ]
    router = TestBed.get(Router);
  });

  it('should go to the new-note page when plus is clicked', () => {
    spyOn(router, 'navigate');

    component.AddNewNotes();
    
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
  
});
