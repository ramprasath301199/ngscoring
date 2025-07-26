import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent {
  private matchService = inject(HttpService);
  matches: any[] = [];
  today: any = new Date();
  ngOnInit(): void {
    console.log(new Date('2025-07-03T14:48:00.000Z') <= new Date());
    this.matchService.getallMatch().subscribe(
      (response: any) => {
        if (response.status === 1) {
          console.log(response);
          this.matches = response.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getStatusClass(dateStr: string): string {
    const itemDate = new Date(dateStr);
    const today = new Date();

    // Clear time for both to compare only the date part
    itemDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (itemDate > today) return 'bg-secondary';
    if (itemDate.getTime() === today.getTime()) return 'bg-success';
    return 'bg-danger';
  }
}
