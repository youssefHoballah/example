import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../model/auth.service";

@Injectable()
export class AuthGuard{

    constructor(private router:Router,private auth: AuthService){}

    canActivate(route:ActivatedRoute,state:RouterStateSnapshot):boolean{
        if(!this.auth.authenticated){
            this.router.navigateByUrl("/admin/auth");
            return false;
        }
        return true;
    }
    
}