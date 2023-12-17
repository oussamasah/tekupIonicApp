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
    public router: Router,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private storage: AngularFireStorage,
    private fireService: FireserviceService,
    private af: AngularFirestore
  ) {}

  ngOnInit() {
    // Abonnement aux changements d'état d'authentification
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Récupération de l'ID de l'utilisateur à partir du stockage local
        this.user = JSON.parse(localStorage.getItem('user')!).uid;
        // Chargement du profil de l'utilisateur
        this.loadUserProfile(JSON.parse(localStorage.getItem('user')!).uid);
        console.log(this.profileData);
      }
    });
  }

  // Fonction de déconnexion
  logout() {
    this.afAuth.signOut().then(() => {
      // Redirection vers la page d'accueil après la déconnexion
      const navigationExtras: NavigationExtras = { replaceUrl: true };
      this.router.navigate([''], navigationExtras);
    });
  }

  // Chargement du profil de l'utilisateur
  loadUserProfile(uid: string) {
    this.fireService.getUserProfile(uid).subscribe(profile => {
      this.profileData = profile;
      console.log('Profil reçu :', this.profileData);
    });
  }

  // Mise à jour du profil de l'utilisateur
  updateProfile() {
    this.fireService
      .updateUserProfile(JSON.parse(localStorage.getItem('user')!).uid, this.profileData)
      .then(() => console.log('Profil mis à jour avec succès'))
      .catch(error => console.error('Erreur lors de la mise à jour du profil :', error));
  }
}
