import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}
  saveData() {
    this.firebaseService.updateRecipes();
  }

  onFetchData() {
    this.firebaseService.fetchRecipes().subscribe((recipes) => {
      console.log(recipes);
    });

    this.router.navigate(['/recipe']);
  }
}
