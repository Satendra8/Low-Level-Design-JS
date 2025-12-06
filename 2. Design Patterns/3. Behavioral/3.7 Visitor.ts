// Visitor Pattern helps you add new operations to existing class hierarchies without modifying those classes.


/**
abstract class Item {
    price: number;

    constructor(price: number) {
        this.price = price
    }

    calculatePrice() {
        console.log("Item price Rs. ", this.price)
    }

    applyDiscount() {
        console.log("Discount Amount Rs. ", this.price * 0.05)
    }

    applyGst() {
        console.log("GST Amount Rs. ", this.price * 0.18)
    }
}

class Book extends Item {
    name: string
    price: number


    constructor(name: string, price: number) {
        super(price)
        this.name = name
        this.price = price
    }

    applyGst() {
        console.log("GST Amount Rs. ", this.price * 0.05)
    }
}

class Clothes extends Item {
    name: string
    price: number


    constructor(name: string, price: number) {
        super(price)
        this.name = name
        this.price = price
    }


    applyGst() {
        console.log("GST Amount Rs. ", this.price * 0.12)
    }
}

class Electronics extends Item {
    name: string
    price: number


    constructor(name: string, price: number) {
        super(price)
        this.name = name
        this.price = price
    }
}

const book1 = new Book("Science", 100)

book1.calculatePrice()
book1.applyDiscount()
book1.applyGst()

//! Problem
// What if we need to override the methods for different classes
// All responsibility is on parent
// If we need to add new method, we need to change class - voilating Open Close Principle

*/




abstract class Item {
    price: number;

    constructor(price: number) {
        this.price = price
    }

    abstract accept(visitor: ApplyCalculation): void;
}

class Book extends Item {
    name: string
    price: number


    constructor(name: string, price: number) {
        super(price)
        this.name = name
        this.price = price
    }

    accept(visitor: ApplyCalculation): void {
        visitor.applyForBook(this)
    }
}

class Clothes extends Item {
    name: string
    price: number
    visitor!: ApplyCalculation



    constructor(name: string, price: number) {
        super(price)
        this.name = name
        this.price = price
    }

    accept(visitor: ApplyCalculation): void {
        visitor.applyForCloth(this)
    }
}

class Electronics extends Item {
    name: string
    price: number
    visitor!: ApplyCalculation


    constructor(name: string, price: number) {
        super(price)
        this.name = name
        this.price = price
    }

    accept(visitor: ApplyCalculation): void {
        visitor.applyForElectnics(this)
    }
}

class Stationary extends Item {
    name: string
    price: number
    visitor!: ApplyCalculation


    constructor(name: string, price: number) {
        super(price)
        this.name = name
        this.price = price
    }

    accept(visitor: ApplyCalculation): void {
        visitor.applyForElectnics(this)
    }
}




interface ApplyCalculation {
    applyForBook(item: Item): void;

    applyForCloth(item: Item): void;

    applyForElectnics(item: Item): void;

    applyForStationary(item: Item): void;
}

class CalculatePrice implements ApplyCalculation {
    applyForBook(item: Item): void {
        console.log("Item price Rs. ", item.price)
    }

    applyForCloth(item: Item): void {
        console.log("Item price Rs. ", item.price)
    }

    applyForElectnics(item: Item): void {
        console.log("Item price Rs. ", item.price)
    }

    applyForStationary(item: Item): void {
        console.log("Item price Rs. ", item.price)
    }
}

class ApplyDiscount implements ApplyCalculation {

    applyForBook(item: Item): void {
        console.log("Item Discount Rs. ", item.price * 0.02)
    }

    applyForCloth(item: Item): void {
        console.log("Item Discount Rs. ", item.price * 0.08)
    }

    applyForElectnics(item: Item): void {
        console.log("Item Discount Rs. ", item.price * 0.12)
    }

    applyForStationary(item: Item): void {
        console.log("Item Discount Rs. ", item.price * 0.11)
    }
}

class ApplyGst implements ApplyCalculation {

    applyForBook(item: Item): void {
        console.log("Item GST Rs. ", item.price * 0.05)
    }

    applyForCloth(item: Item): void {
        console.log("Item GST Rs. ", item.price * 0.12)
    }

    applyForElectnics(item: Item): void {
        console.log("Item GST Rs. ", item.price * 0.18)
    }

    applyForStationary(item: Item): void {
        console.log("Item GST Rs. ", item.price * 0.09)
    }
}

const book1 = new Book("Science", 100)

book1.accept(new ApplyDiscount())
book1.accept(new ApplyGst())