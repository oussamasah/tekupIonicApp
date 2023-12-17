import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-motors',
  templateUrl: './motors.page.html',
  styleUrls: ['./motors.page.scss'],
})
export class MotorsPage implements OnInit {

  lastPublishedCars: any;

  constructor(
    private afs: AngularFirestore,
    private postsService: PostsService,
  ) {}
  
  ngOnInit() {
    // Chargement des publications lors de l'initialisation de la page
    this.load();
  }

  load() {
    // Utilisation du service de gestion des publications pour récupérer les publications liées à la catégorie "moto"
    this.postsService.getPostsAllByCategory('moto').subscribe(posts => {
      // Attribution des publications récupérées à la variable de la classe
      this.lastPublishedCars = posts;
      // Affichage des publications dans la console (à des fins de débogage)
      console.log('Publications par catégorie "moto":', this.lastPublishedCars);
    });
  }
}
