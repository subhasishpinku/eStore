import { Component, Input } from '@angular/core'; // Correct import statement
import { IconDefinition, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'] // Correct property name
})
export class RatingsComponent {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faStarEmpty = faStarEmpty;

  stars: IconDefinition[] = [];

  private _score: number = 0;

  @Input()
  set score(val: number) {
    this.stars = []; // Clear stars array before updating

    const solidStarCount: number = Math.floor(val);
    for (let i = 0; i < solidStarCount; i++) {
      this.stars.push(this.faStar);
    }

    if (val - solidStarCount > 0 && val - solidStarCount < 1) {
      this.stars.push(this.faStarHalfStroke);
    }

    for (let i = this.stars.length; i < 5; i++) {
      this.stars.push(this.faStarEmpty);
    }

    this._score = val; // Update _score after updating stars array
  }
}
