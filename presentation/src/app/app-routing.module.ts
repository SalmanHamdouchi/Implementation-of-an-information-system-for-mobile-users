import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard  } from './services/auth.guard';
import { IssignedinGuard } from './services/issignedin.guard';
import { AbscencePage } from './home-prof/activite-details/abscence/abscence.page';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [IssignedinGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home-prof',
    loadChildren: () => import('./home-prof/home-prof.module').then( m => m.HomeProfPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-prof/activite-details',
    loadChildren: () => import('./home-prof/activite-details/activite-details.module').then( m => m.ActiviteDetailsPageModule),
    canActivate: [AuthGuard]
  },
   {
    path: 'home-prof/activite-details/seance/modify/:activiteId',
    loadChildren: () => import('./home-prof/activite-details/modification-page/modification-page.module').then( m => m.ModificationPagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-prof/activite-details/seance/abscence',
    loadChildren: () => import('./home-prof/activite-details/abscence/abscence.module').then( m => m.AbscencePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-etud',
    loadChildren: () => import('./home-etud/home-etud.module').then( m => m.HomeEtudPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-etud/etud-seances/:id',
    loadChildren: () => import('./home-etud/etud-seances/etud-seances.module').then( m => m.EtudSeancesPageModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
