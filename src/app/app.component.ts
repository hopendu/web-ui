import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'izinga-food-market-client';

  timeFormGroup: UntypedFormGroup;
  arr: UntypedFormArray;

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.timeFormGroup = this.fb.group({
      arr: this.fb.array([this.createItem()])
    })
  }

  createItem() {
    return this.fb.group({
      name: [''],
      pay: ['']
    })
  }
get f(): UntypedFormArray {
  return this.timeFormGroup.get("arr") as UntypedFormArray;
}
  addItem() {
    this.arr = this.timeFormGroup.get('arr') as UntypedFormArray;
    this.arr.push(this.createItem());
  }

  onSubmit() {
    console.log(this.timeFormGroup.value);
  }
}
