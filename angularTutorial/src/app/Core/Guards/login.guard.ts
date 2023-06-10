import { CanActivateChildFn } from '@angular/router';
import { AccountService } from '../Services/account.service';
import { inject } from '@angular/core';

let LoggedIn: boolean = false;

export const loginGuard: CanActivateChildFn = (childRoute, state) => {
  inject(AccountService).isLoggedIn.subscribe(data=>{
    LoggedIn = data;  
  });

  // sometime will be string
  if(LoggedIn){
    return true;
  }else{
    return false;
  }
  return true;
};
