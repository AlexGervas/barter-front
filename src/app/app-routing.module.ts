import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { RegistrationComponent } from './modules/auth/pages/registration/registration.component';
import { NotFoundComponent } from './modules/home/pages/not-found/not-found.component';
import { FavoritesComponent } from './modules/home/pages/favorites/favorites.component';
import { BasketComponent } from './modules/home/pages/basket/basket.component';
import { MenuComponent } from './modules/home/components/menu/menu.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { PersonalRoomComponent } from './modules/home/pages/personal-room/personal-room.component';
import { AddProductComponent } from './modules/home/pages/add-product/add-product.component';
import { SuggestionsComponent } from './modules/home/pages/suggestions/suggestions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'home/favorites',
        component: FavoritesComponent
      },
      {
        path: 'home/basket',
        component: BasketComponent
      },
      {
        path: 'home/personal-room',
        component: PersonalRoomComponent
      },
      {
        path: 'home/add-product',
        component: AddProductComponent
      },
      {
        path: 'home/suggestions',
        component: SuggestionsComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
