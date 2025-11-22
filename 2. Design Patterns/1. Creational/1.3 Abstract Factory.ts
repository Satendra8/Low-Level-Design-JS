/**
 The Abstract Factory Design Pattern is a creational pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes.
 
 It’s particularly useful in situations where:
    - You need to create objects that must be used together and are part of a consistent family (e.g., GUI elements like buttons, checkboxes, and menus).
    - Your system must support multiple configurations, environments, or product variants (e.g., light vs. dark themes, Windows vs. macOS look-and-feel).
    - You want to enforce consistency across related objects, ensuring that they are all created from the same factory.
 */


/* 1. The Problem: Platform-Specific UI

    Imagine you're building a cross-platform desktop application that must support both Windows and macOS.

    To provide a good user experience, your application should render native-looking UI components for each operating system like:

    1. Buttons
    2. Checkboxes
    3. Text fields
    4. Menus
*/

// Naive Implementation: Conditional UI Component Instantiation

// Windows elements

class WindowsButton1 {

    paint() {
        console.log("Painting a window button")
    }

    onClick() {
        console.log("Windows Button clicked")
    }
}


class WindowsCheckbox1 {

    paint() {
        console.log("Painting a window checkbox")
    }

    onSelect() {
        console.log("Windows checkbox selected")
    }
}

// MacOS Elements

class MacButton1 {

    paint() {
        console.log("Painting a mac button")
    }

    onClick() {
        console.log("Mac Button clicked")
    }
}


class MacCheckbox1 {

    paint() {
        console.log("Painting a mac checkbox")
    }

    onSelect() {
        console.log("Mac checkbox selected")
    }
}


const platform = process.platform;

if(platform === "win32") {
    const button = new WindowsButton1()
    const checkBox = new WindowsCheckbox1()
    button.paint()
    checkBox.paint()
} else if (platform === "darwin") {
    const button = new MacButton1()
    const checkBox = new MacCheckbox1()
    button.paint()
    checkBox.paint()
}


// ! Why This Approach Breaks Down
/**
    1. Tight Coupling to Concrete Classes - need to check os manually everywhere
    2. No Abstraction or Polymorphism - i can't create generic button or checkbox, i need to create specific one (max or widnows)
    3. Code Duplication and Repetition - multiple time creating classes
    4. Scalability Issues - Add new plateform Linux, need huge changes
    5. Violation of Open/Closed Principle - Any new variant requires modifying existing code

*/



//? 2. What is Abstract Factory
// The Abstract Factory Pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.


// 3. Implementing Abstract Factory


// 1. Define Abstract Product Interfaces

interface Button {
    paint(): void;
    onClick(): void;
}

interface Checkbox {
    paint(): void;
    onSelect(): void;
}

// 2. Create Concrete Product Classes

class WindowsButton implements Button {
    paint(): void {
        console.log("Painting Windows Button")
    }
    onClick(): void {
        console.log("Windows Button clicked")
    }
}

class WindowsCheckbox implements Checkbox {
    paint(): void {
        console.log("Painting Windows Checkbox")
    }
    onSelect(): void {
        console.log("Windows Checkbox selected")
    }
}


class MacButton implements Button {
    paint(): void {
        console.log("Painting Mac Button")
    }
    onClick(): void {
        console.log("Mac Button clicked")
    }
}

class MacCheckbox implements Checkbox {
    paint(): void {
        console.log("Painting Mac Checkbox")
    }
    onSelect(): void {
        console.log("Mac Checkbox selected")
    }
}


// 3. Define the Abstract Factory

interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}


// 4. Implement Concrete Factories

class WindowsFactory implements GUIFactory {
    createButton(): Button {
        return new WindowsButton();
    }
    createCheckbox(): Checkbox {
        return new WindowsCheckbox();
    }
}

class MacFactory implements GUIFactory {
    createButton(): Button {
        return new MacButton();
    }
    createCheckbox(): Checkbox {
        return new MacCheckbox();
    }
}

// 5. Client Code – Use Abstract Interfaces Only

//? The client code uses the factory to create UI components. It doesn't care which OS it is dealing with.

class Application {
    private readonly button: Button;
    private readonly checkbox: Checkbox;

    constructor(factory: GUIFactory) {
        this.button = factory.createButton()
        this.checkbox = factory.createCheckbox()
    }

    renderUI():void {
        this.button.paint();
        this.checkbox.paint();
    }
}



// Client code

const os = process.platform;

let factory: GUIFactory;

if (os === "win32") {
    factory = new WindowsFactory();
} else if (os === "darwin") {
    factory = new MacFactory();
} else {
    throw new Error(`Unsupported OS: ${os}`);
}

const app = new Application(factory);
app.renderUI();



/** What we Achieved
 * - Platform independence - Application code never references platform-specific classes
 * - Consistency: Buttons and checkboxes always match the selected OS style
 * - Open/Closed Principle: Add support for Linux or Android without modifying existing factories or components
 * - Testability & Flexibility: Factories can be swapped easily for testing or theming 
 */




//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------


//Abstract Factory = Factory of Factory

abstract class Car {
    abstract drive(): void;
}

abstract class LuxuryCars extends Car {
    abstract drive(): void;
}


class BMW extends LuxuryCars {
    drive() {
        console.log("driving BMW")
    }
}

class Ferrari extends LuxuryCars {
    drive() {
        console.log("driving Ferrari")
    }
}


abstract class OrdinaryCars extends Car {
    abstract drive(): void;
}


class Nano extends OrdinaryCars {
    drive() {
        console.log("driving Nano")
    }
}

class Suzuki extends OrdinaryCars {
    drive() {
        console.log("driving Suzuki")
    }
}

interface CarFactory {
    getCars(type: string): Car;
}

class OrdinaryCarFactory implements CarFactory {
    getCars(type: string) {
         switch(type){
            case "Nano":
                return new Nano();
            case "Suzuki":
                return new Suzuki();
            default:
                throw Error("Car doesn't exist")
        }
    }
}


class LuxuryFactory implements CarFactory {
    getCars(type: string) {
         switch(type){
            case "BMW":
                return new BMW();
            case "Ferrari":
                return new Ferrari();
            default:
                throw Error("Car doesn't exist")
        }
    }
}

class MainFactory {
    static getCarsFactory(factory: string) {
        switch(factory){
            case "OrdinaryCarFactory":
                return new OrdinaryCarFactory();
            case "LuxuryFactory":
                return new LuxuryFactory();
            default:
                throw Error("Car doesn't exist")
        }
    }
}


const type = "LuxuryFactory"

const carType = "BMW"

const factory = MainFactory.getCarsFactory(type)

const car = factory.getCars(carType)

car.drive()


