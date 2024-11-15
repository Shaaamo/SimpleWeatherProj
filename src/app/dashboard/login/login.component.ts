import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const {username, password} = this.loginForm.value;

    this.http.post('https://fakestoreapi.com/auth/login', {
      username: username,
      password: password,
    }).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}
