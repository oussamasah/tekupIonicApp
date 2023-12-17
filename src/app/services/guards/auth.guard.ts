// Importation des modules nécessaires depuis Angular
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // Constructeur du service avec injection de dépendances
  constructor(private router: Router) {}

  // Fonction canActivate, requise par l'interface CanActivate
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // Utilisation d'une Promise pour gérer de manière asynchrone l'état de l'authentification
    return new Promise((resolve, reject) => {
      // Récupération de l'objet d'authentification Firebase
      const auth = getAuth();

      // Utilisation de la fonction onAuthStateChanged pour observer les changements d'état de l'authentification
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Si un utilisateur est authentifié, autoriser l'accès à la route
          resolve(true);
        } else {
          // Si aucun utilisateur n'est authentifié, rediriger vers la page de connexion et refuser l'accès à la route
          console.log('L\'utilisateur n\'est pas connecté');
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
