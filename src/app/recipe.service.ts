import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './shared/recipe.model';
import { Ingredient } from './shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes ? recipes : [];
    this.recipesChanged.emit(this.recipes.slice());
  }

  get getRecipes() {
    return this.recipes.slice(0);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.emit(this.recipes.slice(0));
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes = this.recipes.filter((item) => item.name != recipe.name);
    this.recipesChanged.emit(this.recipes.slice());
  }
}
