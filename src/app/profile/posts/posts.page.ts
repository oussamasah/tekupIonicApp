import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AlertController, NavController } from '@ionic/angular';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alerte annulée');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alerte confirmée');
      },
    },
  ];

  message = 'Cet exemple de modal utilise des déclencheurs pour ouvrir automatiquement une modal lorsque le bouton est cliqué.';
  name="";
  postedit = {
    uid:"",
    category:"",
    title: '',
    description: '',
    price: '',
    gallery: [] as string[],
  };
  post = {
    userId: JSON.parse(localStorage.getItem('user')!).uid,
    category:"cars",
    title: '',
    description: '',
    price: '',
    gallery: [] as string[],
  };
  posts: any[] = [];
  isModalOpen: boolean = false;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private postService: PostsService,
    private alertController: AlertController,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  // Chargement des publications
  loadPosts() {
    this.postService.getPostsByUser(JSON.parse(localStorage.getItem('user')!).uid).subscribe(posts => {
      this.posts = posts;
    });
  }

  // Suppression d'une publication
  async deletePost(postId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer cette publication?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Supprimer',
          handler: () => {
            // Appeler la méthode deletePost dans le service PostService
            this.postService.deletePost(postId).then(() => {
              // Recharger les publications après la suppression
              this.loadPosts();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  // Chargement des détails d'une publication pour édition
  loadPostDetails(postId: any) {
    this.postService.getPostById(postId).subscribe(post => {
      this.postedit = post;
      this.isModalOpen = true;
    });
  }

  // Enregistrement des modifications apportées à une publication
  saveChanges() {
    // Mettre à jour les détails de la publication en utilisant le service PostService
    this.postService.updatePost(this.postedit).then(() => {
      // Naviguer de nouveau vers la liste des publications après l'édition
      this.cancelEdit();
    });
  }

  // Ajout d'une nouvelle publication
  addPost() {
    // Télécharger les images sur le stockage Cloud et obtenir les URL de téléchargement
    const uploadTasks = this.post.gallery.map(file => this.uploadImage(file));

    // Attendre la fin de toutes les téléchargements
    Promise.all(uploadTasks).then(downloadUrls => {
      // Ajouter la publication à Firestore avec les URL de téléchargement
      this.post.gallery = downloadUrls;
      this.postService.addPost(this.post).then(() => {
        console.log('Publication ajoutée avec succès !');
        // Réinitialiser le formulaire ou effectuer des actions supplémentaires
        this.post = {
          userId: JSON.parse(localStorage.getItem('user')!).uid,
          category: "",
          title: '',
          description: '',
          price: '',
          gallery: [],
        };
        this.loadPosts();
        this.cancel();
      }).catch(error => {
        console.error('Erreur lors de l\'ajout de la publication :', error);
      });
    });
  }

  // Téléchargement d'une image sur le stockage Cloud
  uploadImage(file: any): Promise<string> {
    const filePath = `gallery/${new Date().getTime()}_${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = storageRef.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            resolve(downloadURL);
          }, reject);
        })
      ).subscribe();
    });
  }

  // Gestion de la sélection d'un fichier
  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.post.gallery = Array.from(files);
    }
  }

  // Annulation de l'édition d'une publication
  cancelEdit() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  // Annulation de l'ajout d'une nouvelle publication
  cancel() {
    this.isModalOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  // Confirmation de l'édition d'une publication
  confirmEdit() {
    this.saveChanges();
  }

  // Confirmation de l'ajout d
  confirm() {
    this.addPost()
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }




}