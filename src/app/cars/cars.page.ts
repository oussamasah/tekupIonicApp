import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  lastPublishedCars:any

  
constructor(
  private afs: AngularFirestore,
  private postsService: PostsService,
) {}

ngOnInit() {
this.load()
}
load(){
  this.postsService.getPostsAllByCategory('cars').subscribe(posts => {
    this.lastPublishedCars = posts;
    console.log('Posts by Category1:', this.lastPublishedCars);
  });
 
}

}
