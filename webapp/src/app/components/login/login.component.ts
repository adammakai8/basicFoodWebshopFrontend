import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
    ) { 
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  } 

  ngOnInit(): void { }

  controlHasError(controlName: string, errorKey: string): boolean {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].getError(errorKey);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(user => {
        localStorage.setItem('user', user._id);
        this.router.navigate(['/products']);
        console.log(user);
      }, error => {
        this.snackBar.open('Sikertelen bejelentkezés', undefined, { duration: 3000 });
        console.log(error);
      });
    }
  }

  onRegisternavigation(): void {
    this.router.navigate(['/registration']);
  }
}
