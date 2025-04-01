import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-notes',
  templateUrl: './new-notes.page.html',
  styleUrls: ['./new-notes.page.scss'],
  standalone: false
})
export class NewNotesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  AddNewNotes() {
    this.router.navigate(['home']);
  }
}
