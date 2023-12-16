import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-motors',
  templateUrl: './motors.page.html',
  styleUrls: ['./motors.page.scss'],
})
export class MotorsPage implements OnInit {

  lastPublishedCars:any

  
  constructor(
    private afs: AngularFirestore,
    private postsService: PostsService,
  ) {}
  
  ngOnInit() {
  this.load()
  }
  load(){
    this.postsService.getPostsAllByCategory('moto').subscribe(posts => {
      this.lastPublishedCars = posts;
      console.log('Posts by Category1:', this.lastPublishedCars);
    });
   
  }

}
