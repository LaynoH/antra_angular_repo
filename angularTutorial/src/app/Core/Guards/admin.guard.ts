import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../Services/account.service';

let isLoggedIn:boolean = false;
let isAdmin: boolean = false;

export const adminGuard: CanMatchFn = (route, segments) => {
  
  inject(AccountService).isLoggedIn.subscribe(data=>{
    isLoggedIn = data;
  });

  inject(AccountService).currentUser.subscribe(data=>{
    isAdmin = data.isAdmin;
  });

  if(isLoggedIn && isAdmin){
    console.log("user is loggedin as authorized admin");
    return true;
  } 

  if(isLoggedIn && !isAdmin){
    console.log("user is loggedin but not as authorized admin");
    return false;
  }else{
    return false;
  }

};
