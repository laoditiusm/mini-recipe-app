import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] | undefined;
  isFetchFail = false;
  isFetching = true;
  loading = 'Laoding...';

  constructor(
    private recipeService: RecipeService,
    private firebaseService: FirebaseService
  ) {}
  ngOnInit(): void {
    this.firebaseService.fetchRecipes().subscribe(
      (recipes) => {
        this.recipeService.setRecipes(recipes);
        this.isFetching = false;
      },
      (error) => {
        if (error.status == 0) {
          this.isFetchFail = true;
        }
      }
    );

    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
  }
}
