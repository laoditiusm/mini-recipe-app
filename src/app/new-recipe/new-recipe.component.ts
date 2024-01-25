import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  recipe: Recipe = new Recipe('', '', '', []);
  ingredients: Ingredient[] = [];
  newRecipeForm: FormGroup | any;
  isSubmitted = false;
  showSaved = false;
  isFieldsinValid = false;
  isSuccessSubmit = false;

  constructor(private route: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.newRecipeForm = new FormGroup({
      recipeName: new FormControl(null, Validators.required),
      recipeDesc: new FormControl(null, Validators.required),
      recipeImgUrl: new FormControl(null, Validators.required),
      ingredientName: new FormControl(null, Validators.required),
      ingredientAmount: new FormControl(null, Validators.required),
    });
  }
  addIngredient(name: HTMLInputElement, amount: HTMLInputElement) {
    let ingredientName = this.newRecipeForm.get('ingredientName').value;
    let ingredientAmount = this.newRecipeForm.get('ingredientAmount').value;

    if (name.value.length > 0 && amount.value.length > 0) {
      this.ingredients.push(new Ingredient(ingredientName, ingredientAmount));
      this.showSaved = true;
      name.value = ' ';
      amount.value = ' ';
      setTimeout(() => {
        this.showSaved = false;
      }, 1200);
    } else {
      this.isFieldsinValid = true;
    }

    console.log(this.ingredients);
  }

  onFormSubmit(
    name: HTMLInputElement,
    desc: HTMLTextAreaElement,
    url: HTMLInputElement
  ) {
    this.isSubmitted = true;
    if (this.newRecipeForm.valid && this.ingredients.length > 0) {
      let recipeName = this.newRecipeForm.get('recipeName').value;
      let recipeDesc = this.newRecipeForm.get('recipeDesc').value;
      let recipeImgUrl = this.newRecipeForm.get('recipeImgUrl').value;

      this.recipe.name = recipeName;
      this.recipe.description = recipeDesc;
      this.recipe.imgUrl = recipeImgUrl;
      this.recipe.ingredients = this.ingredients;

      console.log(this.recipe);

      this.isSuccessSubmit = true;
      this.recipeService.addRecipe(this.recipe);
      console.log(this.recipeService.getRecipes);

      setTimeout(() => {
        this.isSuccessSubmit = false;
      }, 1000);

      name.value = '';
      desc.value = '';
      url.value = '';
    }
  }

  closeForm() {
    this.route.navigate(['/recipe']);
  }
}
