import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatchesComponent } from '../matches/matches.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, MatchesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  label = 'home';
}
