import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  //constructor(private fb:FormBuilder){}
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm:FormGroup = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  }); 

  login():void{
    console.log('Formulario',this.myForm.value);
    const {email,password} = this.myForm.value;
    this.authService.login(email,password)
    .subscribe({
      next:()=> this.router.navigateByUrl('/dashboard'),
      error:(errorMessage)=> {
        Swal.fire('Error',errorMessage,'error')
      }
    });
  }

}
