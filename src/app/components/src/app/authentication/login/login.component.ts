import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  passwordshow = false;
  private service = inject(HttpService);
  private router = inject(Router);
  showpassowrd() {
    this.passwordshow = !this.passwordshow;
  }
  submit() {
    const payload = {
      email: this.email,
      password: this.password,
    };
    this.service.LoginUser(payload).subscribe(
      (response: any) => {
        if (response.status == 1) {
          localStorage.setItem('userdetails', JSON.stringify(response));
          this.router.navigate(['/home']);
        } else {
          console.log(response);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
