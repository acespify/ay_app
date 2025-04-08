import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-quote-notes-card',
  templateUrl: './quote-notes-card.component.html',
  styleUrls: ['./quote-notes-card.component.scss'],
  standalone: false
  
})
export class QuoteNotesCardComponent  implements OnInit {

  @Input() hasHeader: boolean | undefined;
  @Input() hasFooter: boolean | undefined;

  @Input() status: 'added' | 'history' | 'checked' = 'added';
  @Input() quote: string | undefined;
  @Input() createdAt: string = 'mm/dd/yyyy';
  @Input() notes: string | undefined;
  @Input() value: string | undefined;

  constructor() {}

  ngOnInit() {}

}
