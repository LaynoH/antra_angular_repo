import { CanActivateChildFn } from '@angular/router';
import { AccountService } from '../Services/account.service';


export const loginGuard: CanActivateChildFn = (childRoute, state) => {
  
  return true;
};
