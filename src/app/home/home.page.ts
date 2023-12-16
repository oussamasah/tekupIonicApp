import { isNgContainer } from '@angular/compiler';
import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lastPublishedCars:any
  lastPublishedMotors:any

  
constructor(
  private afs: AngularFirestore,
  private postsService: PostsService,
) {}

ngOnInit() {
this.load()
}
load(){
  this.postsService.getPostsByCategory('cars').subscribe(posts => {
    this.lastPublishedCars = posts;
    console.log('Posts by Category1:', this.lastPublishedCars);
  });
  this.postsService.getPostsByCategory('moto').subscribe(posts => {
    this.lastPublishedMotors = posts;
    console.log('Posts by Category1:', this.lastPublishedMotors);
  });
}
}
