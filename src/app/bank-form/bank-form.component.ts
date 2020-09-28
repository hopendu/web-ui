import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bank } from '../model/bank';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {

  submitted = false;

  bank: Bank;
  bankFormGroup = this.fb.group({
    accountId: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    type: ['', Validators.required]});


  constructor(private sharedData: SharedService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

  }
/*
  onSubmit(): void {

    this.submitted = true;

    if (this.bankFormGroup.invalid){  return; }

    const bank = new Bank(
        this.bankFormGroup.get('accountId').value,
        this.bankFormGroup.get('name').value,
        this.bankFormGroup.get('phone').value,
        this.bankFormGroup.get('type').value);
    this.add(bank);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.bankFormGroup.value, null, 4));
  }
  */
  add(bank: Bank): void {

  }

  btnClick = function () {

    if (this.bankFormGroup.invalid){  return; }

    const bank = new Bank(
        this.bankFormGroup.get('accountId').value,
        this.bankFormGroup.get('name').value,
        this.bankFormGroup.get('phone').value,
        this.bankFormGroup.get('type').value
        );
    this.sharedData.setBank(bank);

    this.router.navigateByUrl('/form/business-hours');
    };

  onReset(): void {
    this.submitted = false;
    this.bankFormGroup.reset();
  }

}
