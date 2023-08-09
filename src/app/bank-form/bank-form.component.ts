import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bank } from '../model/bank';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent implements OnInit {

  bankFormGroup : UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              private share: ShareDataService) { }

  ngOnInit(): void {
    this.bankFormGroup = this.fb.group({
      accountId: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      type: ['', Validators.required]});
  }

  btnClick = function () {

    if (this.bankFormGroup.invalid){  return; }

    this.share.bank = new Bank(
        this.bankFormGroup.get('accountId').value,
        this.bankFormGroup.get('name').value,
        this.bankFormGroup.get('phone').value,
        this.bankFormGroup.get('type').value
        );

    this.router.navigate(['/form/business-hours']);
    };
    
    backClick = function (){
      this.router.navigateByUrl('/form/store-info');
    }

    onReset(): void {
      this.bankFormGroup.reset();
    }

}
