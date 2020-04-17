import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Freelancer } from '../freelancer';
import { FormBuilder } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user;
  updateForm;

  constructor(
  	private usersService: UsersService,
  	private route: ActivatedRoute,
  	private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      skillsets: ['', Validators.required],
      hobby: ['']
    });
  }

  freelancers: Freelancer

  ngOnInit(): void {
  	const id = this.route.snapshot.params['id'];
   
    this.usersService.getSingleUser(id).subscribe((data) => {
      this.updateForm = this.formBuilder.group({
        name: [data.name],
        email: [data.email],
        phone: [data.phone],
        skillsets: [data.skillsets],
        hobby: [data.hobby]
      })
    })
  }

  updateUser(){
    this.updateForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      skillsets: [''],
      hobby: ['']
    })    
  }

  onSubmit() {
    const id = this.route.snapshot.params['id'];

    this.usersService.updateUser(id, this.updateForm.value)
    .subscribe(res => {
      console.log('Updated user has been submitted'); 
    })
    alert('User updated!');
    this.gotoList();

  }

  gotoList() {
    this.router.navigate(['']);
  }

}
