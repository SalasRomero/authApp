import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private fb= inject(FormBuilder);

  public myForm:FormGroup = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    name:['',[Validators.required,Validators.minLength(3)]],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required,Validators.minLength(6)]],
  });

  register():void{
    console.log(this.myForm.value);
    
  }

}
