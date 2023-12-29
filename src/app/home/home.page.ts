import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Déclaration des listes de publications
  lastPublishedCars: any;
  lastPublishedMotors: any;

  constructor(
    private afs: AngularFirestore,
    private postsService: PostsService,
  ) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Chargement des publications au démarrage
    this.load();
  }

  // Méthode pour charger les publications
  load() {
    // Récupération les 5 derniers publications liées à la catégorie 'cars'
    this.postsService.getPostsByCategory('cars').subscribe(posts => {
      this.lastPublishedCars = posts;
      console.log('Publications par catégorie "cars":', this.lastPublishedCars);
    });

    // Récupération les 5 derniers publications liées à la catégorie 'moto'
    this.postsService.getPostsByCategory('moto').subscribe(posts => {
      this.lastPublishedMotors = posts;
      console.log('Publications par catégorie "moto":', this.lastPublishedMotors);
    });
  }
}
/* test build jenkins two  */
