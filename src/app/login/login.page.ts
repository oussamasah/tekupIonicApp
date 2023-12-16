import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FireserviceService } from '../services/fireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:any;
  public password:any;
  public message:string="";
  public isToastOpen:boolean=false;
  constructor(
    public router:Router,
    public fireService:FireserviceService

  ) { }

  ngOnInit() {
     null
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  login(){
    this.fireService.loginWithEmail({email:this.email,password:this.password}).then(res=>{
      console.log(res);
      if(res.user && res.user.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe(res=>{
          this.message="You are logged in successfuly"
          this.router.navigateByUrl('');
        },err=>{
          this.message=err
        });
      }
    },err=>{
      this.message=err
    })
    this.setOpen(true)
  }


  signup(){
    this.router.navigateByUrl('signup');
  }

}
