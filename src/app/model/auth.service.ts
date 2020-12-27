import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";


@Injectable()
export class AuthService{

    constructor(private datasource: RestDataSource){}
    authenticate(user: string,pass:string): Observable<boolean>{
        return this.datasource.authenticate(user,pass);
    }
    get authenticated():boolean{
        return this.datasource.auth_token!=null;
    }
    clear(){
        this.datasource.auth_token=null;
    }
}