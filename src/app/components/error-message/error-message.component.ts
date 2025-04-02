import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: false
})
export class ErrorMessageComponent  implements OnInit {

  @Input() message!: string;

  constructor() { }

  ngOnInit() {}

}
