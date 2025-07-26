import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name = '';
  email = '';
  mobile = '';
  address = '';
  password = '';
  passwordshow = false;
  private service = inject(HttpService);
  private router = inject(Router);
  showpassowrd() {
    this.passwordshow = !this.passwordshow;
  }
  submit() {
    const payload = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      address: this.address,
    };
    this.service.createUser(payload).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 1) {
          this.router.navigate(['./login']);
        }
      },
      (err) => {
        console.log(err, 'error');
      }
    );
  }
}
