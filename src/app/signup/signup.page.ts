import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../services/fireservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public email: string = "";
  public password: string = "";
  public name: string = "";
  public message:string="";
  public isToastOpen:boolean=false;

  constructor(
    public router: Router,
    public fireService: FireserviceService
  ) {}

  ngOnInit() {
   null
  }
  

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  signup() { 
  
    
    this.fireService.signup({ email: this.email, password: this.password }).then(res => {
      if (res.user?.uid) { // Use optional chaining to handle possible undefined
        let data = {
          email: this.email,
          password: this.password,
          fullName: this.name,
          uid: res.user.uid
        };
        this.fireService.saveDetails(data).then(res => {
          this.message = 'Account Created!';
        }, err => {
          console.log(err)
          this.message =  err ;

        });
      }
    }, err => {
      console.log(err)

      this.message =  err ;

    });
    this.setOpen(true)
  }
}
