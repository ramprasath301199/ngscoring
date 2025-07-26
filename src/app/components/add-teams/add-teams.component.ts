import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-add-teams',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, LoaderComponent],
  templateUrl: './add-teams.component.html',
  styleUrl: './add-teams.component.css',
})
export class AddTeamsComponent {
  loader = false;
  private apiservice = inject(HttpService);
  private router = inject(Router);
  team = {
    name: '',
    place: '',
    image: '',
  };
  label = 'Create Team';
  submitTeam(form: NgForm) {
    this.loader = true;
    const payload = {
      name: this.team.name,
      place: this.team.place,
      image: this.team.image,
    };
    this.apiservice.createTeam(payload).subscribe(
      (response: any) => {
        if (response.status == 1) {
          this.loader = false;
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.loader = false;
        console.log(error);
      }
    );
  }
}
