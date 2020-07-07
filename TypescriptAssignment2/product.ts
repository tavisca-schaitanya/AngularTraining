export class Product{

    private _productId: string;
    private _productName: any;
    private _category: any;
    private _manufacturer: any;
    private _description: string;
    private _price: number;

    constructor(
    productId: string,
    productName: any,
    category: any,
    manufacturer: any,
    description: string,
    price: number
    )
    {
        this._productId = productId,
        this.ProductName = productName,
        this.Category = category,
        this.Manufacturer = manufacturer,
        this.Description = description,
        this.Price = price;
    }

    get ProductId(): string{
        return this._productId;
    }

    get ProductName(): any{
        return this._productName;
    }

    get Category(){
        return this._category;
    }

    get Manufacturer(){
        return this._manufacturer;
    }

    get Description(){
        return this._description;
    }

    get Price(){
        return this._price;
    }

    set ProductName(name: any){
        if(typeof(name) != "string")
        {
            throw "Product name must be string";
        }
        this._productName = name;
    }

    set Category(category: any){
        if(typeof(category) != "string")
        {
            throw "Category name must be string";
        }
        this._category = category;
    }

    set Manufacturer(manufacturer: any){
        if(typeof(manufacturer) != "string")
        {
            throw "Manufacturer name must be string";
        }
        this._manufacturer = manufacturer;
    }

    set Description(description: string){
        if(description.length > 100)
        {
            throw "Description should not be more than 100 characters";
        }
        this._description = description;
    }

    set Price(price: number){
        if(price < 0)
        {
            throw "Price should not be negative";
        }
        this._price = price;
    }

    clone(){
        return new Product(
            this._productId,
            this._productName,
            this._category,
            this._manufacturer,
            this._description,
            this._price
        );
    }
}


