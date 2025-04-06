import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'loader', pathMatch: 'full' },
  { path: 'loader', loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), 
    canLoad: [AuthGuard]
  },
  { path: 'new-notes', loadChildren: () => import('./pages/new-notes/new-notes.module').then( m => m.NewNotesPageModule), 
    canLoad: [AuthGuard]
  },
  { path: 'history', loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule), 
    canLoad: [AuthGuard]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
