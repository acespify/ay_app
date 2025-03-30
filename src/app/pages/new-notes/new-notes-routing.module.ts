import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNotesPage } from './new-notes.page';

const routes: Routes = [
  {
    path: '',
    component: NewNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewNotesPageRoutingModule {}
