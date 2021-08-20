import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserControllerService} from '../service/user-controller.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  cellNumber: string

  constructor(private userService: UserControllerService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.userService.findUser(this.cellNumber)
      .subscribe(user => {
        this.router.navigate(['menu'], {
          queryParams: {
            "id" : user.id
          }
        })
      })
  }

}
