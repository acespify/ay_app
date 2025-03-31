import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuoteNotesCardComponent } from "./quote-notes-card/quote-notes-card.component";

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [QuoteNotesCardComponent],
    imports: [CommonModule],
    exports: [QuoteNotesCardComponent]
})
export class ComponentsModule { }