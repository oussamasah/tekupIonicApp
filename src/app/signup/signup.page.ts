// Importation des modules nécessaires depuis Angular
import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../services/fireservice.service';
import { Router } from '@angular/router';

// Définition du composant SignUpPage
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // Déclaration des propriétés du formulaire
  public email: string = "";
  public password: string = "";
  public name: string = "";
  public message: string = ""; // Message à afficher à l'utilisateur
  public isToastOpen: boolean = false; // Contrôle l'affichage du toast

  // Constructeur du composant avec injection de dépendances
  constructor(
    public router: Router,
    public fireService: FireserviceService
  ) {}

  // Méthode déclenchée lors de l'initialisation du composant
  ngOnInit() {
    null; // Aucune logique particulière à l'initialisation
  }

  // Méthode pour définir l'état d'ouverture du toast
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  // Méthode appelée lors de la tentative d'inscription
  signup() { 
    // Appel du service Firebase pour l'inscription
    this.fireService.signup({ email: this.email, password: this.password }).then(res => {
      // Vérification de la réussite de l'inscription
      if (res.user?.uid) { // Utilisation de l'opérateur de chaînage optionnel pour gérer l'éventuelle valeur undefined
        // Création des données utilisateur à enregistrer
        let data = {
          email: this.email,
          password: this.password,
          fullName: this.name,
          uid: res.user.uid
        };
        
        // Enregistrement des détails de l'utilisateur
        this.fireService.saveDetails(data).then(res => {
          // Affichage du message de réussite
          this.message = 'Account Created!';
        }, err => {
          console.log(err);
          // Affichage du message d'erreur
          this.message = err;
        });
      }
    }, err => {
      console.log(err);
      // Affichage du message d'erreur en cas d'échec de l'inscription
      this.message = err;
    });

    // Ouverture du toast après l'inscription (qu'elle réussisse ou échoue)
    this.setOpen(true);
  }
}
