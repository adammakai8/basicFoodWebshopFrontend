import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
    ) {
    this.registForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern('.+ .+')]),
      birthdate: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')])
    })
   }

  ngOnInit(): void {
  }

  controlHasError(controlName: string, errorKey: string): boolean {
    return this.registForm.controls[controlName].invalid && this.registForm.controls[controlName].getError(errorKey);
  }

  onRegistration(): void {
    if (this.registForm.valid) {
      this.userService.registerUser(this.registForm.value).subscribe(user => {
        console.log(user);
        this.snackBar.open('Sikeres regisztráció', undefined, { duration: 3000 });
        this.router.navigate(['/login']);
      }, error => {
        this.snackBar.open('Sikertelen regisztráció', undefined, { duration: 3000 });
      });
    }
  }
}
