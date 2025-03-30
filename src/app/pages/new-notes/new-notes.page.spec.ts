import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewNotesPage } from './new-notes.page';

describe('NewNotesPage', () => {
  let component: NewNotesPage;
  let fixture: ComponentFixture<NewNotesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
