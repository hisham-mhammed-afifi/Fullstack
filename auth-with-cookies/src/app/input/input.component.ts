import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: [],
})
export class InputComponent implements OnInit {
  @Input() control!: FormControl;;
  @Input() label = 'Label';
  @Input() name = 'name';
  @Input() type = 'text';

  constructor() {}

  ngOnInit(): void {}
}
