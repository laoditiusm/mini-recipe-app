import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from './shared/recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  recipesUrl: string =
    'https://mini-recipe-app-default-rtdb.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.recipesUrl, {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    });
  }

  saveRecipe(body: Recipe) {
    this.http.post(this.recipesUrl, body).subscribe((responseData) => {
      console.log(responseData);
    });
  }

  updateRecipes() {
    const recipes = this.recipeService.getRecipes;
    this.http.put(this.recipesUrl, recipes).subscribe((responseData) => {
      console.log(responseData);
    });
  }
}
