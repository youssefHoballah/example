import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import {Router} from "@angular/router";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent {
    private selectedCategory = null;
    public productsPerPage = 4;
    public selectedPage = 1;

    constructor(private repository: ProductRepository,public cart:Cart,private router:Router) { }
    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        return this.repository.getProducts(this.selectedCategory).slice(pageIndex, pageIndex + this.productsPerPage);
    }
    get categories(): string[] {
        return this.repository.getCategories();
    }
    changeCategory(cat?: string) {
        this.selectedCategory = cat;
    }
    changePageSize(newProductsPerPage: number) {
        this.productsPerPage = newProductsPerPage;
        this.changePage(1);
    }
    changePage(pageNumber: number) {
        this.selectedPage = pageNumber;
    }

    addProductToCart(product:Product) {
        this.cart.addLine(product);
        this.router.navigateByUrl("/cart");
        
    }
    get pageCount(): number {
        return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)
    }
    get pageNumbers(): number[] {
        return Array(Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)).fill(0).map((x, i) => i + 1);
    }
}
