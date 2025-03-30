import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewNotesPageRoutingModule } from './new-notes-routing.module';

import { NewNotesPage } from './new-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewNotesPageRoutingModule
  ],
  declarations: [NewNotesPage]
})
export class NewNotesPageModule {}
