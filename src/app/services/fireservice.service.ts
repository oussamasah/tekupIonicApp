import { User } from 'firebase/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  userData:any
  constructor(
    public firestore :AngularFirestore,
public auth :AngularFireAuth,

  ) { 

    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  loginWithEmail(data:any){
    return this.auth.signInWithEmailAndPassword(data.email,data.password)
  }
  signup(data:any){
    return this.auth.createUserWithEmailAndPassword(data.email,data.password)
  }
  saveDetails(data:any){
    return this.firestore.collection("users").doc(data.uuid).set(data)
  }
  getDetails(data:any){
    return this.firestore.collection("users").doc(data.uuid).valueChanges()
  }
  getData(data:any){
    return this.firestore.collection('users').doc(data.uid).valueChanges()
  }

  getUserProfile(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as any;
        const id = action.payload.id;
        return { id, ...data };
      })
    );
  }

  updateUserProfile(uid: string, data: any): Promise<void> {
    return this.firestore.collection('users').doc(uid).update(data);
  }
  
  getUserById(id:any) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users').doc<User>(id).valueChanges().subscribe(value=> {
       
        resolve(value?.email)
      });
    });
  }

}
