import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-scoring',
  standalone: true,
  imports: [HeaderComponent, LoaderComponent],
  templateUrl: './scoring.component.html',
  styleUrl: './scoring.component.css',
})
export class ScoringComponent {
  label = 'Scoring';
  loader = false;
}
