// Importation des modules nécessaires depuis Angular
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Service pour la gestion des publications (posts)
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // Constructeur du service avec injection de dépendances
  constructor(private firestore: AngularFirestore) {}

  // Récupérer toutes les publications
  getPosts(): Observable<any[]> {
    return this.firestore.collection('posts').snapshotChanges().pipe(
      map(actions => actions.map(action => this.mapDocumentChange(action)))
    );
  }

  // Récupérer les publications par catégorie (limité à 5)
  getPostsByCategory(category: string): Observable<any[]> {
    return this.firestore.collection('posts', ref => ref.where('category', '==', category).limit(5)).snapshotChanges().pipe(
      map(actions => actions.map(action => this.mapDocumentChange(action)))
    );
  }

  // Récupérer les publications d'un utilisateur
  getPostsByUser(id: string): Observable<any[]> {
    return this.firestore.collection('posts', ref => ref.where('userId', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(action => this.mapDocumentChange(action)))
    );
  }

  // Récupérer toutes les publications par catégorie (sans limite)
  getPostsAllByCategory(category: string): Observable<any[]> {
    return this.firestore.collection('posts', ref => ref.where('category', '==', category)).snapshotChanges().pipe(
      map(actions => actions.map(action => this.mapDocumentChange(action)))
    );
  }

  // Fonction privée pour mapper un changement de document (DocumentChangeAction) à un objet
  private mapDocumentChange(action: DocumentChangeAction<any>): any {
    const data = action.payload.doc.data() as any;
    const id = action.payload.doc.id;
    return { id, ...data };
  }

  // Ajouter une nouvelle publication
  addPost(postData: any): Promise<any> {
    console.log(postData);
    return this.firestore.collection('posts').add(postData);
  }

  // Supprimer une publication par ID
  deletePost(postId: string): Promise<void> {
    return this.firestore.collection('posts').doc(postId).delete();
  }

  // Mettre à jour une publication
  updatePost(postData: any): Promise<void> {
    console.log(postData.id);
    return this.firestore.collection('posts').doc(postData.id).update(postData);
  }

  // Récupérer une publication par ID
  getPostById(postId: string): Observable<any> {
    return this.firestore.collection('posts').doc(postId).snapshotChanges().pipe(
      map(action => this.mapDocumentSnapshot(action.payload))
    );
  }

  // Fonction privée pour mapper un instantané de document (DocumentSnapshot) à un objet
  private mapDocumentSnapshot(snapshot: DocumentSnapshot<any>): any {
    const data = snapshot.data() as any;
    const id = snapshot.id;
    return { id, ...data };
  }
}
