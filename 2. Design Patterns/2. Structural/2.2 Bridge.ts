/**
 * The Bridge Design Pattern is a structural pattern that lets you decouple an abstraction from its implementation, allowing the two to vary independently.
 * 
 * It’s particularly useful in situations where:
 *  - You have classes that can be extended in multiple orthogonal dimensions (e.g., shape vs. rendering technology, UI control vs. platform).
 *  - You want to avoid a deep inheritance hierarchy that multiplies combinations of features.
 *  - You need to combine multiple variations of behavior or implementation at runtime.
 * 
 * The Bridge Pattern splits a class into two separate hierarchies:
 *  - One for the abstraction (e.g., shape, UI control)
 *  - One for the implementation (e.g., rendering engine, platform)
 * 
 * These two hierarchies are "bridged" via composition — not inheritance — allowing you to mix and match independently.
 * 
 */


// 1. The Problem: Drawing Shapes

/**
 Imagine you're building a cross-platform graphics library. It supports rendering shapes like circles and rectangles using different rendering approaches:
    1. 🟢 Vector rendering – for scalable, resolution-independent output
    2. 🔵 Raster rendering – for pixel-based output

 Now, you need to support:
    1. Drawing different shapes (e.g., Circle, Rectangle)
    2. Using different renderers (e.g., VectorRenderer, RasterRenderer)

*/


// Naive Implementation: Subclass for Every Combination

abstract class Shape1 {
    public abstract draw(): void;
}


// circle variants
class VectorCircle extends Shape1 {
    public draw(): void {
        console.log("Drawing circle as VECTORS")
    }
}

class RasterCircle extends Shape1 {
    public draw(): void {
        console.log("Drawing circle as PIXELS")
    }
}

// rectangle variants

class VectorRectangle extends Shape1 {
    public draw(): void {
        console.log("Drawing rectangle as VECTORS")
    }
}

class RasterRectangle extends Shape1 {
    public draw(): void {
        console.log("Drawing rectangle as PIXELS")
    }
}


let circle = new RasterCircle()
let circle3 = new VectorCircle()
let rectangle = new RasterRectangle()
let rectangle3 = new VectorRectangle()

circle.draw();
rectangle.draw();


//! Why This Quickly Breaks Down

/**
 1. Class Explosion
    Every new combination of shape and rendering method requires a new subclass:
        - 2 shapes × 2 renderers = 4 classes
        - Add a third renderer (e.g., OpenGL)? Now you need 6 classes
        - Add more shapes (e.g., triangle, ellipse)? The combinations multiply

 2. Tight Coupling
    Each class ties together shape logic and rendering logic. You can’t reuse rendering behavior independently of the shape — they’re intertwined.

 3. Violates Open/Closed Principle
    If you want to support a new rendering engine, you must modify or recreate every shape for that renderer.

 What We Really Need
    We need a solution that:
        - Separates the abstraction (Shape) from its implementation (Renderer)
        - Allows new renderers to be added without touching shape classes
        - Enables new shapes to be added without modifying or duplicating renderer logic
        - Keeps the system scalable, extensible, and composable
*/


//? The Bridge Design Pattern lets you split a class into two separate hierarchies — one for the abstraction and another for the implementation — so that they can evolve independently.

// Let’s now implement the Bridge Pattern to decouple our Shape abstraction (e.g., Circle, Rectangle) from the Renderer implementation (e.g., VectorRenderer, RasterRenderer).


// 1: Define the Implementor Interface (Renderer)

interface Renderer {
    renderCircle(radius: number): void;
    renderRectangle(width: number, height: number): void;
}

// 2. Create Concrete Implementations of the Renderer

class VectorRenderer implements Renderer {
    renderCircle(radius: number): void {
        console.log("Drawing a circle of radius " + radius + " using VECTOR rendering.");
    }

    renderRectangle(width: number, height: number): void {
        console.log("Drawing a rectangle " + width + "x" + height + " using VECTOR rendering.");
    }
}

class RasterRenderer implements Renderer {
    renderCircle(radius: number): void {
        console.log("Drawing a circle of radius " + radius + " using PIXEL rendering.");
    }

    renderRectangle(width: number, height: number): void {
        console.log("Drawing a rectangle " + width + "x" + height + " using PIXEL rendering.");
    }
}

// define abstraction shape
abstract class Shape {
    protected renderer!: Renderer;

    // The constructor in Shape makes sure that all subclasses get the renderer property initialized properly, without repeating code in every subclass.
    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    public abstract draw(): void;
}

// Create Concrete Shapes
class Circle extends Shape {
    protected radius!: number

    constructor(renderer: Renderer, radius: number) {
        super(renderer);
        this.radius = radius;
    }

    public draw(): void {
        this.renderer.renderCircle(this.radius);
    }
}


class Rectangle extends Shape {
    protected width!: number
    protected height!: number

    constructor(renderer: Renderer, width: number, height: number) {
        super(renderer);
        this.width = width;
        this.height = height;
    }

    public draw(): void {
        this.renderer.renderRectangle(this.width, this.height);
    }
}


// Client Code

const raster = new RasterRenderer();
const vector = new VectorRenderer();

let circle1 = new Circle(vector, 7);
let circle2 = new Circle(raster, 7);


let rectangle1 = new Rectangle(raster, 8, 15);
let rectangle2 = new Rectangle(vector, 8, 15);

circle1.draw(); // vector
circle2.draw(); // raster

rectangle1.draw(); // vector
rectangle2.draw(); // raster


/** What We Achieved
 *      - Decoupled abstractions from implementations: Shapes and renderers evolve independently
 *      - Open/Closed compliance: You can add new renderers or shapes without modifying existing ones
 *      - No class explosion: Avoided the need for every shape-renderer subclass
 *      - Runtime flexibility: Dynamically switch renderers based on user/device context
 *      - Clean, extensible design: Each class has a single responsibility and can be composed as needed
 */




//--------------------------------------------------------------------------
//--------------------------------------------------------------------------





/**
interface Device {
    turnOn(): void;
    turnOff(): void;
}


class TV implements Device {
    turnOn(): void {
        console.log("TV is on");
    }

    turnOff(): void {
        console.log("Tv is off")
    }
}


class Radio implements Device {
    turnOn(): void {
        console.log("Radio is on");
    }

    turnOff(): void {
        console.log("Radio is off")
    }
}

class AC implements Device {
    turnOn(): void {
        console.log("AC is on");
    }

    turnOff(): void {
        console.log("AC is off")
    }
}


interface Remote {
    click(isOn: boolean): void;

}

interface SmartRemote {
    touch(isOn: boolean): void;
}


class TVRemote implements Remote {
    click(isOn: boolean) {
        const obj = new TV()
        if (isOn) {
            obj.turnOn()
        } else {
            obj.turnOff()
        }
    }
}

class RadioRemote implements Remote {
    click(isOn: boolean) {
        const obj = new Radio()
        if (isOn) {
            obj.turnOn()
        } else {
            obj.turnOff()
        }
    }
}

class ACRemote implements Remote {
    click(isOn: boolean) {
        const obj = new AC()
        if (isOn) {
            obj.turnOn()
        } else {
            obj.turnOff()
        }
    }
}


class TVSmartRemote implements SmartRemote {
    touch(isOn: boolean) {
        const obj = new TV()
        if (isOn) {
            obj.turnOn()
        } else {
            obj.turnOff()
        }
    }
}

class RadioSmartRemote implements SmartRemote {
    touch(isOn: boolean) {
        const obj = new Radio()
        if (isOn) {
            obj.turnOn()
        } else {
            obj.turnOff()
        }
    }
}

class ACSmartRemote implements SmartRemote {
    touch(isOn: boolean) {
        const obj = new AC()
        if (isOn) {
            obj.turnOn()
        } else {
            obj.turnOff()
        }
    }
}
*/


interface Device {
    turnOn(): void;
    turnOff(): void;
}


class TV implements Device {
    turnOn(): void {
        console.log("TV is on")
    }

    turnOff(): void {
        console.log("TV is off")
    }
}

class Radio implements Device {
    turnOn(): void {
        console.log("Radio is on")
    }

    turnOff(): void {
        console.log("Radio is off")
    }
}

class AC implements Device {
    turnOn(): void {
        console.log("AC is on")
    }

    turnOff(): void {
        console.log("AC is off")
    }
}


interface Remote {
    click(device: Device): void;
}

class NormalRemote implements Remote{
    click(device: Device): void {
        device.turnOn();
        device.turnOff();
    }
}


const d1 = new AC()

const r1 = new NormalRemote()

r1.click(d1)




/************************************************************************************************************************ */\




interface MessageSender {
    send(message: string): void;
}



class SMS implements MessageSender {
    send(message: string): void {
        console.log("Sending SMS", message);
    }
}

class Email implements MessageSender {
    send(message: string): void {
        console.log("Sending Email", message);
    }
}

class Whatsapp implements MessageSender {
    send(message: string): void {
        console.log("Sending Whatsapp", message);
    }
}


interface NotificationType{
    notify(sender: MessageSender): void;
}


class Reminder implements NotificationType {
    notify(sender: MessageSender): void {
        sender.send("Sending Reminder")
    }
}

class Alert implements NotificationType {
    notify(sender: MessageSender): void {
        sender.send("Sending Alert")
    }
}

class Promotion implements NotificationType {
    notify(sender: MessageSender): void {
        sender.send("Sending Promotion")
    }
}

const s = new SMS()

const remind = new Reminder()

remind.notify(s)