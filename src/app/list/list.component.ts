import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Freelancer } from '../freelancer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users;
  title = 'CDN';

  freelancer: Freelancer;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  	this.getAllUsers()
  }

  getAllUsers() {
  	this.users = this.usersService.getAllUsers();
  }

  deleteUser(user) {
    console.log('users', this.users)
    console.log('users id', user.id)
  		return this.usersService.deleteUser(user.id)
      	  .subscribe(res => {
      	  	console.log('user deleted!')
            alert('User deleted!');
            this.getAllUsers()
      	  },
          error => console.log(error));
  }

  goToEdit(data) {
    this.router.navigate(['edit/'+data.id]);
  }

}