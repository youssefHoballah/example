import { Component } from "@angular/core";
import { OrderRepository } from "../model/order.repository";
import {Order} from "../model/order.model";

@Component({
    templateUrl: "orderTable.component.html"
})
export class OrderTableComponent{

    includeShipped:boolean=false;

constructor(private repositorty:OrderRepository){}

getOrders(){
return this.repositorty.getOrders().filter(o=>
    this.includeShipped || !o.shipped);
}
markShipped(order:Order){
    order.shipped=true;
    this.repositorty.updateOrder(order);
}
delete(id:number){
    this.repositorty.deleteOrder(id);
}
}