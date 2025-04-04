import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistoryPageRoutingModule } from './history-routing.module';
import { HistoryPage } from './history.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HistoryPageRoutingModule
],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
