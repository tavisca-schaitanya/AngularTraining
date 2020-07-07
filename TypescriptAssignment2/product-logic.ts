import {Product} from "./product";

class ProductLogic{
    private _products: Array<Product>;

    private _productsBuffer: Array<Product>;

    constructor(){
        this._products = new Array<Product>();
        this._productsBuffer = new Array<Product>();
    }

    getAllProducts(): Array<Product>{
        return this._products;
    }

    getProductsByCategory(category: string): Array<Product>{
        return this._productsBuffer.filter(product => product.Category == category);
    }

    getProductsByManufacturer(manufacturer: string): Array<Product>{
        return this._products.filter(product => product.Manufacturer == manufacturer);
    }

    create(
        productId: string,
        productName: any,
        category: any,
        manufacturer: any,
        description: string,
        price: number
    ): string
    {
        if(this.isDuplicate(productId))
        {
            return "ProductId must be unique";
        }
        try {
            this._productsBuffer.push(new Product(productId, productName, category, manufacturer, description, price));
        } catch (error) {
            return error;
        }

        return "Product created successfully";
    }

    private isDuplicate(productId: string){
        return this._productsBuffer.some(product => product.ProductId === productId);
    }

    update(productId: string, product: Product): string{
        var targetProduct = this._productsBuffer.find(product => product.ProductId == productId);

        try {
            targetProduct.ProductName = product.ProductName;
            targetProduct.Category = product.Category;
            targetProduct.Manufacturer = product.Manufacturer;
            targetProduct.Description = product.Description;
            targetProduct.Price = product.Price;
        } catch (error) {
            return error;
        }

        return "Product updated successfully";
    }

    delete(productId: string): string{
        var index = this._productsBuffer.indexOf(this._productsBuffer.find(product => product.ProductId == productId));

        if(index == -1){
            return "Product does not exist";
        }
        else{
            this._products.splice(index, 1);
            return "Product deleted successfully";
        }
    }

    save(){
        this._products = new Array<Product>();
        this._productsBuffer.forEach(product => this._products.push(product.clone()));
    }
}




let productLogic = new ProductLogic();

// Testing create logic
console.log(productLogic.create("1", "LED TV", "Electronics", "Samsung", "32 inch smart LED TV", 21000));
console.log(productLogic.create("2", "Tshirt", "Clothing", "Roadster", "Dark blue medium size t-shirt", 600));
productLogic.save();
// Testing get all products
console.log(productLogic.getAllProducts());
// Testing all validations
console.log(productLogic.create("1", "LED TV", "Electronics", "Samsung", "32 inch smart LED TV", 21000));
console.log(productLogic.create("5", 2, "Electronics", "Samsung", "32 inch smart LED TV", 21000));
console.log(productLogic.create("5", "LED TV", 12, "Samsung", "32 inch smart LED TV", 21000));
console.log(productLogic.create("5", "LED TV", "Electronics", 3, "32 inch smart LED TV", 21000));
console.log(productLogic.create("5", "LED TV", "Electronics", "Samsung", "32 inch smart LED TV".repeat(6), 21000));
console.log(productLogic.create("5", "LED TV", "Electronics", "Samsung", "32 inch smart LED TV", -10));
// Testing get all products after validation failures
productLogic.save();
console.log(productLogic.getAllProducts());
console.log(productLogic.create("3", "Laptop", "Electronics", "Dell", "8 GB RAM and 1 TB Hard disk", 60000));
console.log(productLogic.create("4", "Earphones", "Electronics", "Samsung", "Bluetooth earphones with incase charging", 5000));
productLogic.save();
console.log(productLogic.getAllProducts());
// Testing get all products by category
console.log(productLogic.getProductsByCategory("Electronics"));
//Testing get all products by manufacturer
console.log(productLogic.getProductsByManufacturer("Samsung"));
// Testing update
console.log(productLogic.update("1", new Product("1", "LED TV", "Electronics", "Samsung", "64 inch smart LED TV", 21000)))
productLogic.save();
// Testing delete
console.log(productLogic.delete("1"));
productLogic.save();
productLogic.getAllProducts();
