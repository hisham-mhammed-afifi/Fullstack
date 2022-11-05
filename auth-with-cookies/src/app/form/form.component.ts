import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [],
})
export class FormComponent implements OnInit {
  @Input() disabledBtn = false;
  @Input() buttonTitle = 'Submit';
  @Input() linkButtonTitle = 'Link';
  @Input() linkPath = '/';
  @Input() inputs = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      control: new FormControl<string | number | boolean | null>(null),
    },
  ];
  @Input() form: FormGroup = new FormGroup({});
  @Output() submitValues = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    this.submitValues.emit(this.form);
  }
}
