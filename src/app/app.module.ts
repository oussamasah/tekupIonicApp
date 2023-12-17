// Importation des modules Angular nécessaires
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Importation des composants et modules personnalisés
import { NavigationComponent } from './navigation/navigation.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importation des modules AngularFire pour l'intégration avec Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// Déclaration du module principal de l'application
@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    
    // Configuration des modules AngularFire avec la configuration de l'environnement Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [
    // Configuration du fournisseur de la stratégie de réutilisation des routes
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    // Configuration du service de garde d'authentification AngularFire
    AngularFireAuthGuard,
  ],
  bootstrap: [AppComponent], // Définition du composant racine pour le démarrage de l'application
})
export class AppModule {}
