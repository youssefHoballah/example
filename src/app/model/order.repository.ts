import { StaticDataSource } from "./static.datasource";
import {Order} from "./order.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class OrderRepository{

    private orders: Order[]=[];
    private loaded:boolean =false;
    constructor(private dataSource:RestDataSource){}

    loadOrders(){
        this.loaded=true;
        this.dataSource.getOrders().subscribe(orders=> this.orders=orders)
    }
    getOrders():Order[]{
        if(!this.loaded){
            this.loadOrders();
            return this.orders;
        }
        else{return this.orders;}
        
    }

    saveOrder(order:Order):Observable<Order>{
        return this.dataSource.saveOrder(order);

    }

    updateOrder(order:Order){
        this.dataSource.updateOrder(order).subscribe(o=> this.orders.splice(this.orders.findIndex(o=> o.id==order.id),1,order));

    }
    deleteOrder(id:number){
        this.dataSource.deleteOrder(id).subscribe(o=> this.orders.splice(this.orders.findIndex(o=> o.id==id),1));

    }

}