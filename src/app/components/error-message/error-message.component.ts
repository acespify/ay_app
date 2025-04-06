import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: false
})
export class ErrorMessageComponent implements OnInit {

  @Input() message!: string;
  @Input() field!: AbstractControl;
  @Input() error!: string;

  constructor() { }

  ngOnInit() {}

  shouldShowComponent() {
    //form.get('email').touched && form.get('email').errors?.required
    if(this.field === undefined)
      return false;

    if(this.field?.touched && this.field.errors?.[this.error]) {
      return true;
    }
    return false;
  }

}
