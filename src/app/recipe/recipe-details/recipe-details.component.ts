import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  id: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
      console.log(this.recipe);
    });
  }

  deleteRecipe() {
    let id = this.route.snapshot.params['id'];

    let recipes = this.recipeService.getRecipes;
    let targetRecipe = recipes[id];

    this.recipeService.deleteRecipe(targetRecipe);
    this.router.navigate(['/recipe']);
  }
}
