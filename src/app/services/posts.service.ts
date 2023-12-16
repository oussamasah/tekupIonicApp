import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private firestore: AngularFirestore) {}

  getPosts(): Observable<any[]> {
    return this.firestore.collection('posts').snapshotChanges().pipe(
      map(actions => actions.map(action => this.mapDocumentChange(action)))
    );
  }

  private mapDocumentChange(action: DocumentChangeAction<any>): any {
    const data = action.payload.doc.data() as any;
    const id = action.payload.doc.id;
    return { id, ...data };
  }

  addPost(postData: any): Promise<any> {
    console.log(postData)
    return this.firestore.collection('posts').add(postData);
  }

  deletePost(postId: string): Promise<void> {
    return this.firestore.collection('posts').doc(postId).delete();
  }
  updatePost( postData: any): Promise<void> {
    console.log(postData.id)
    return this.firestore.collection('posts').doc(postData.id).update(postData);
  }

  getPostById(postId: string): Observable<any> {
    return this.firestore.collection('posts').doc(postId).snapshotChanges().pipe(
      map(action => this.mapDocumentSnapshot(action.payload))
    );
  }



  private mapDocumentSnapshot(snapshot: DocumentSnapshot<any>): any {
    const data = snapshot.data() as any;
    const id = snapshot.id;
    return { id, ...data };
  }

}
