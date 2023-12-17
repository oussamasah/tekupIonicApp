// Importation des modules et classes nécessaires depuis Angular et Firebase
import { User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

// Service pour la gestion des opérations liées à Firebase
@Injectable({
  providedIn: 'root',
})
export class FireserviceService {
  userData: any; // Variable pour stocker les données utilisateur

  // Constructeur du service avec injection de dépendances
  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth,
  ) {
    // Souscrire aux changements d'état de l'authentification Firebase
    this.auth.authState.subscribe((user) => {
      if (user) {
        // Si un utilisateur est connecté, mettre à jour les données utilisateur et les stocker localement
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        // Si aucun utilisateur n'est connecté, stocker une valeur nulle localement
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Fonction de connexion avec l'email et le mot de passe
  loginWithEmail(data: any): Promise<any> {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  // Fonction d'inscription avec l'email et le mot de passe
  signup(data: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  // Fonction pour enregistrer les détails de l'utilisateur dans la collection 'users'
  saveDetails(data: any): Promise<void> {
    return this.firestore.collection('users').doc(data.uuid).set(data);
  }

  // Fonction pour récupérer les détails de l'utilisateur à partir de la collection 'users'
  getDetails(data: any): Observable<any> {
    return this.firestore.collection('users').doc(data.uuid).valueChanges();
  }

  // Fonction pour récupérer les données de l'utilisateur à partir de la collection 'users'
  getData(data: any): Observable<any> {
    return this.firestore.collection('users').doc(data.uid).valueChanges();
  }

  // Fonction pour récupérer le profil de l'utilisateur par ID
  getUserProfile(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as any;
        const id = action.payload.id;
        return { id, ...data };
      })
    );
  }

  // Fonction pour mettre à jour le profil de l'utilisateur par ID
  updateUserProfile(uid: string, data: any): Promise<void> {
    return this.firestore.collection('users').doc(uid).update(data);
  }

  // Fonction pour récupérer l'email d'un utilisateur par ID
  getUserById(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users').doc<User>(id).valueChanges().subscribe(value => {
        resolve(value?.email);
      });
    });
  }
}
