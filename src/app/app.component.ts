import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'izinga-food-market-client';

  timeFormGroup: FormGroup;
  arr: FormArray;

  constructor(private fb: FormBuilder) { }

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
get f(): FormArray {
  return this.timeFormGroup.get("arr") as FormArray;
}
  addItem() {
    this.arr = this.timeFormGroup.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  onSubmit() {
    console.log(this.timeFormGroup.value);
  }
}
