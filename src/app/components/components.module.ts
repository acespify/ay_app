import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuoteNotesCardComponent } from "./quote-notes-card/quote-notes-card.component";
import { ErrorMessageComponent } from "./error-message/error-message.component";

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [QuoteNotesCardComponent, ErrorMessageComponent],
    imports: [CommonModule],
    exports: [
        QuoteNotesCardComponent,
        ErrorMessageComponent
    ]
})
export class ComponentsModule {}