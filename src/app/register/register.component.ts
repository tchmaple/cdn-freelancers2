import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;
 
  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      skillsets: ['', Validators.required],
      hobby: ['']
    });
  }

  ngOnInit(): void {
    this.newUser()
  }

  newUser(){
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      skillsets: [''],
      hobby: ['']
    })    
  }

  get email() { 
    return this.registerForm.get('email'); 
  }

  onSubmit() {
    console.log('new data', this.registerForm.value)
    this.usersService.registerUser(this.registerForm.value)
    .subscribe(users => {
        console.log('New user registered has been submitted')
    });
    this.registerForm.reset();
    alert('New user registered!');
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['']);
  }

}
