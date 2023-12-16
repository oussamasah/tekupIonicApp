import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AngularFireAuthGuard, isNotAnonymous ,redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard'
import { map, pipe } from 'rxjs';


export const redirectAnonymousTo = (redirect: any[]) => 
  pipe(isNotAnonymous, map(loggedIn => loggedIn || redirect)
);

const redirectUnauthorizedToLogin = () => redirectAnonymousTo(['login']);

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: NavigationComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home',
          },
          {
            path: 'home',
            loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
          },
          {
            path: 'cars',
            loadChildren: () => import('./cars/cars.module').then( m => m.CarsPageModule)
          },
          {
            path: 'motors',
            loadChildren: () => import('./motors/motors.module').then( m => m.MotorsPageModule)
          },
          {
            path: 'profile',
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: redirectUnauthorizedToLogin },
            loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
          },
          {
            path: 'posts',
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: redirectUnauthorizedToLogin },
            loadChildren: () => import('./profile/posts/posts.module').then( m => m.PostsPageModule)
          },
          {
            path: 'signup',
            loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
          },
          {
            path: 'login',
            loadChildren: () =>  import('./login/login.module').then( m => m.LoginPageModule)
          },
          {
            path: 'detail/:id',
            loadChildren: () =>  import('./postdetails/postdetails.module').then( m => m.PostdetailsPageModule)
          }
        ],
      },

    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}