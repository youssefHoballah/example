import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";

@Component({
    templateUrl: "auth.component.html"
}
)
export class AuthComponent {

    public errorMessage = null;
    public userName:string;
    public password:string;

    constructor(private router: Router,private auth: AuthService) { }

    authenticate(form: NgForm) {
        if (form.valid){
            this.auth.authenticate(this.userName,this.password).subscribe(response=>{
                if (response){
                    this.router.navigateByUrl("/admin/main");
                }
                this.errorMessage = "Authorization Failed"
            })
        }
        else{
            this.errorMessage= "Form Data Invalid";
        }
    }
}