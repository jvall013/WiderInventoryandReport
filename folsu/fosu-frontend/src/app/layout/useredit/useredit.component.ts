import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../model/user.model';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  userList: User[];
  edituserslist: User[] = [];




  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getAllUsers()
      .subscribe(users => {
        this.userList = users;
      });
  }

  editUser(user: User) {
    if (this.userList.includes(user)) {
      if (!this.edituserslist.includes(user)) {
        this.edituserslist.push(user);
      } else {
        this.edituserslist.splice(this.edituserslist.indexOf(user), 1);
        this.userService.editUser(user).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editUser(user);
          console.error('Update Unsuccesful');
        });
      }
    }
  }

  doneUser(user: User) {
 
    this.userService.editUser(user).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      this.editUser(user);
      console.error('Update Unsuccesful');
    });


    }

    submitUser(event, user: User) {
      if (event.keyCode === 13) {
        this.editUser(user);
      }

    }

    deleteUser(user: User) {
      this.userService.deleteTodo(user._id).subscribe(res => {
        this.userList.splice(this.userList.indexOf(user), 1);
      });
    }

    // This method will get called on Create button event
/*     create() {
      this.userService.createTodo(this.newTodo)
        .subscribe((res) => {
          this.todosList.push(res.data)
          this.newTodo = new ToDo()
        })
    } */}
