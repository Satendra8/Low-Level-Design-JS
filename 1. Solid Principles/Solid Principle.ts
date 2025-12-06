
/**
Solid Principles


S - Single Responsibility Principle (SRP)
O - Open/Closed Principle
L - Liskov's Substitution Principle
I - Interface Segregration Principle
D - Dependency Inversion Principle

*/

// S. A class should have only 1 reason to change.

//! Wrong Approach
class Invoice{
    productId: number;
    productName: number;
    price: number;
    quantity: number;
    total: number;

    constructor(productId: number, productName: number, price: number, quantity: number){
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.total = price * quantity;
    }

    printInvoice() {
        console.log(`Invoice create for`)
        console.log(`Product: ${this.productId} - ${this.productName}}`)
        console.log(`Quantity -  ${this.quantity}`)
        console.log(`Price -  ${this.price}`)
        console.log(`Total -  ${this.total}`)
    }

    saveInvoice() {
        //? save invoice to db
    }
}

// Right Approach

class Invoice{
    // Holds data & calculation logic
    productId: number;
    productName: number;
    price: number;
    quantity: number;
    total: number;

    constructor(productId: number, productName: number, price: number, quantity: number){
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.total = price * quantity;
    }
}

class PrintInvoice {
    // Handles display/printing concerns
    invoice: Invoice;

    constructor(invoice: Invoice) {
        this.invoice = invoice
    }

    printInvoice() {
        console.log(`Invoice create for`)
        console.log(`Product: ${this.invoice.productId} - ${this.invoice.productName}}`)
        console.log(`Quantity -  ${this.invoice.quantity}`)
        console.log(`Price -  ${this.invoice.price}`)
        console.log(`Total -  ${this.invoice.total}`)
    }

    printInvoiceToPDF(){
        //? print to pdf
    }
}


class saveInvoice {
    // Handles persistence (saving to DB or file)
    invoice: Invoice;

    constructor(invoice: Invoice) {
        this.invoice = invoice
    }

    save() {
        // save invoice to db
    }

    saveToFile() {
        // save invoice to file
    }
}


// -----------------------------------------------------------


// O. Open for extension but closed for modification



class Invoice{
    productId: number;
    productName: number;
    price: number;
    quantity: number;
    total: number;

    constructor(productId: number, productName: number, price: number, quantity: number){
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.total = price * quantity;
    }
}

//! Wrong Approach

class InvoiceDao {
    // Handles persistence (saving to DB or file)
    invoice: Invoice;

    constructor(invoice: Invoice) {
        this.invoice = invoice
    }

    save() {
        // save invoice to db
    }

    saveToFile() {
        // save invoice to file
    }
}


//? Right Approach

abstract class InvoiceDao {
    abstract save(): void;
}

class DataBaseInvoiceDao extends InvoiceDao {
    save() {
        // save invoice to database
    }
}

class FileInvoiceDao extends InvoiceDao {
    save() {
        // save invoice to file
    }
}

// later if i want invoice to create a pdf and store on s3 bucket i can create a new class without changing existing


//------------------------------------------------------------------------------


// L. Liskov's Substitution Principle

/**

-> If a class B is subtype of class A, then we should be able to replace object of A with B without breaking the behaviour of the program.
-> subclass should extend the capablity of parent class not narrow it down

        A
        ^
        |
        |

        B

        we should be able to replace the object of A with B
*/


//! Wrong Approach

interface Bike {
    turnOnEngine(): void;
    accelarate(): void;
}

class MotorCycle implements Bike {
    isEngineTurnOn: boolean = false;
    speed: number = 0;

    turnOnEngine(): void {
       this.isEngineTurnOn = true
    }

    accelarate(): void {
        // increase the speed
    }
}

class Bicycle implements Bike {
    speed: number = 0;

    turnOnEngine(): void {
        throw new Error('Engine not found!'); // Here we cannot replace Bike with Bicycle
        // subclass should extend the capablity of parent class not narrow it down
    }

    accelarate(): void {
        // increse the speed
    }
}


//? Right Approach

interface Bike {
    accelarate(): void;
}

interface EngineBike extends Bike {
    turnOnEngine(): void;
}

class MotorCycle implements EngineBike {
    isEngineTurnOn: boolean = false;
    speed: number = 0;

    turnOnEngine(): void {
       this.isEngineTurnOn = true
    }

    accelarate(): void {
        // increase the speed
    }
}

class Bicycle implements Bike {
    speed: number = 0;

    accelarate(): void {
        // increse the speed
    }
}

// Now I can Substitute
// Bicycle for Bike ✅
// MotorCycle for EngineBike ✅



//---------------------------------------------------------------------------------------------



// I - Interface Segregration Principle - Interface should be such, that client should not implement unnecessary functions they do not need


//! Wrong Approach

interface RestaurantEmployee {
    serveCustomers(): void;
    takeOrders(): void;
    cookFood(): void;
    decideMenu(): void;
}


class Waiter implements RestaurantEmployee {
    serveCustomers(): void {
        // yes this is my job
        console.log("Serving the customer");
    }

    takeOrders(): void {
        // yes this is my job
        console.log("Taking the order");
    }

    cookFood(): void {
        // not my job
    }

    decideMenu(): void {
        // not my job
    }
}

// Right Approach


interface WaiterInterface {
    serveCustomers(): void;
    takeOrders(): void;
}

class Waiter implements WaiterInterface {
    serveCustomers(): void {
        console.log("Serving the customer");
    }

    takeOrders(): void {
        console.log("Taking the order");
    }
}

interface ChefInterface {
    cookFood(): void;
    decideMenu(): void;
}


class Chef implements ChefInterface {
    cookFood(): void {
        console.log("Cooking food")
    }

    decideMenu(): void {
        console.log("Deciding menu")
    }
}


//--------------------------------------------------------------------------------------------




// D - Dependency Inversion Principle - High level component should not depend on low level components directly, instead they should depend on abstractions.

interface Keyboard {
    type(): void;
}

class WiredKeyboard implements Keyboard {
    type(): void {
        console.log("Typing using wired keyboard")
    }
}

class BluetoothKeyboard implements Keyboard {
    type(): void {
        console.log("Typing using bluetooth keyboard")
    }
}


interface Mouse {
    click(): void;
}

class WiredMouse implements Mouse {
    click(): void {
        console.log("Clicking using wired mouse")
    }
}

class BluetoothMouse implements Mouse {
    click(): void {
        console.log("Clicking using bluetooth mouse")
    }
}


//! Wrong Approach

class MacBook {
    keyboard: WiredKeyboard; // high level module directly depending on low level module
    mouse: WiredMouse;

    constructor() {
        this.keyboard = new WiredKeyboard(); // direct dependency on concrete class
        this.mouse = new WiredMouse();
    }
}


//? Right Approach

class NewMacBook {
    keyboard: Keyboard;
    mouse: Mouse;

    constructor(keyboard: Keyboard, mouse: Mouse) {
        this.keyboard = keyboard;
        this.mouse = mouse;
    }
}


const macBook1 = new NewMacBook(new BluetoothKeyboard(), new BluetoothMouse())
macBook1.keyboard.type()
macBook1.mouse.click()