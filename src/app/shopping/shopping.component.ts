import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ShoppingService } from '../shopping.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
})
export class Shopping implements OnInit {
  @ViewChild('f') form?: NgForm;
  isSubmitted = false;
  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients;
    this.shoppingService.ingredientsChanged.subscribe(
      (ingredients) => (this.ingredients = ingredients)
    );
  }
  onFormSubmit() {
    this.isSubmitted = true;
    if (this.isSubmitted && this.form?.valid) {
      let name = this.form.value['ingredientName'];
      let amount = this.form.value['ingredientAmount'];
      let ingredient = new Ingredient(name, amount);
      this.shoppingService.addIngredient(ingredient);
    }
  }
}
