import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { Shopping } from './shopping/shopping.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Route[] = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'recipe',
    component: RecipeComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: NewRecipeComponent },
      { path: ':id', component: RecipeDetailsComponent },
    ],
  },
  { path: 'shopping', component: Shopping },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
