import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FireserviceService } from '../services/fireservice.service';
import { getAuth } from "firebase/auth";
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, first } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  profileData: any = {};
    
  constructor(
    public filePickerRef: ElementRef<HTMLInputElement>,
    public router :Router,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private storage: AngularFireStorage,
    private fireService: FireserviceService,
    private af : AngularFirestore
  
  ) {
 
   }

  ngOnInit() {
  
      
       this.afAuth.authState.subscribe(user => {
        if (user) {
          this.user = JSON.parse(localStorage.getItem('user')!).uid;
          this.loadUserProfile(JSON.parse(localStorage.getItem('user')!).uid);
          console.log( this.profileData)
        }
      });
   
  }


  logout(){
 this.afAuth.signOut().then(() => {
      const navigationExtras: NavigationExtras = { replaceUrl: true };
      this.router.navigate([''], navigationExtras);
      
    });

  }


  loadUserProfile(uid: string) {
    this.fireService.getUserProfile(uid).subscribe(profile => {
      this.profileData = profile;
      console.log('Received profile:', this.profileData);
    });
  }

  updateProfile() {
    this.fireService.updateUserProfile(JSON.parse(localStorage.getItem('user')!).uid, this.profileData)
      .then(() => console.log('Profile updated successfully'))
      .catch(error => console.error('Error updating profile:', error));
  }
  
}
