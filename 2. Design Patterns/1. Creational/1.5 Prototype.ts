/**
 The Prototype Design Pattern is a creational design pattern that lets you create new objects by cloning existing ones, instead of instantiating them from scratch.

 It’s particularly useful in situations where:
    - Creating a new object is expensive, time-consuming, or resource-intensive.
    - You want to avoid duplicating complex initialization logic.
    - You need many similar objects with only slight differences.


 The Challenge of Cloning Objects

    Imagine you have an object in your system, and you want to create an exact copy of it. How would you do it?

    Your first instinct might be to:

    Create a new object of the same class.
    Manually copy each field from the original object to the new one.
    Simple enough, right?

    Well, not quite.

    Problem 1: Encapsulation Gets in the Way
        This approach assumes that all fields of the object are publicly accessible. But in a well-designed system, many fields are private and hidden behind encapsulation. That means your cloning logic can’t access them directly.

        Unless you break encapsulation (which defeats the purpose of object-oriented design), you can’t reliably copy the object this way.

    Problem 2: Class-Level Dependency
        Even if you could access all the fields, you'd still need to know the concrete class of the object to instantiate a copy.

        This tightly couples your cloning logic to the object's class, which introduces problems:

        It violates the Open/Closed Principle.
        It reduces flexibility if the object's implementation changes.
        It becomes harder to scale when you work with polymorphism.
    Problem 3: Interface-Only Contexts
        In many cases, your code doesn’t work with concrete classes at all—it works with interfaces.

        For example:

        public void processClone(Shape shape) {
            Shape cloned = ???; // we only know it implements Shape
        }
        Here, you know the object implements a certain interface (Shape), but you don’t know what class it is, let alone how to create a new instance of it. You’re stuck unless the object knows how to clone itself.
*/


//? The Better Way: Let the Object Clone Itself

/*
    This is where the Prototype Design Pattern comes in.

    Instead of having external code copy or recreate the object, the object itself knows how to create its clone. It exposes a clone() or copy() method that returns a new instance with the same data.

    This:

        - Preserves encapsulation
        - Eliminates the need to know the concrete class
        - Makes the system more flexible and extensible
*/


// The Problem: Spawning Enemies in a Game


/** Let’s say you’re developing a 2D shooting game where enemies appear frequently throughout the gameplay.
 *  You have several enemy types with distinct attributes:
 *      - BasicEnemy: Low health, slow speed — used in early levels.
 *      - ArmoredEnemy: High health, medium speed — harder to defeat, appears later.
 *      - FlyingEnemy: Medium health, fast speed — harder to hit, used for surprise attacks.
 * 
 *  Each enemy type comes with predefined properties such as:
 *      - Health (how much damage they can take)
 *      - Speed (how quickly they move across the screen)
 *      - Armor (whether they take reduced damage)
 *      - Weapon type (e.g., laser, cannon, missile)
 *      - Sprite or appearance (the visual representation)
 * 
 * 
 *  Now, imagine you need to spawn a FlyingEnemy. You might write code like this:
 *      Enemy flying1 = new Enemy("Flying", 100, 10.5, false, "Laser");
 *      Enemy flying2 = new Enemy("Flying", 100, 10.5, false, "Laser");
 * 
 * 
 * But Here’s the Problem
 *      - Repetitive Code: You’re duplicating the same instantiation logic again and again.
 *      - Scattered Defaults: If the default speed or weapon of FlyingEnemy changes, you need to update it in every single place you created one.
 *      - Error-Prone: Forget to set one property? Use a wrong value? Bugs will creep in silently.
 *      - Cluttered Codebase: Your main game loop or spawn logic becomes bloated with object construction details.
 * 
 * 
 * As your game scales — adding more enemy types, behaviors, or configurations — this naive approach quickly becomes hard to manage and maintain.
 *
 * You need a clean, centralized, and reusable way to create enemy instances with consistent defaults while allowing minor tweaks.
 */



//? The Prototype Design Pattern

// The Prototype pattern specifies the kinds of objects to create using a prototypical instance and creates new objects by copying (cloning) this prototype.
// Instead of configuring every new object line-by-line, we define a pre-configured prototype and simply clone it whenever we need a new instance.



// Step 1: Define the Prototype Interface (EnemyPrototype)


interface EnemyPrototype {
    clone(): EnemyPrototype;
}

// Step 2: Create the Concrete Prototype Class (Enemy)

class Enemy implements EnemyPrototype {
    private type: string;
    private health: number;
    private speed: number;
    private armored: boolean;
    private weapon: string;

    constructor(type: string, health: number, speed: number, armored: boolean, weapon: string){
        this.type = type;
        this.health = health;
        this.speed = speed;
        this.armored = armored;
        this.weapon = weapon;
    }

    clone(): Enemy{
        return new Enemy(this.type, this.health, this.speed, this.armored, this.weapon);
    }

    setHealth(health: number): void {
        this.health = health;
    }

    printStatus(): void{
        console.log(`${this.type} [Health: ${this.health}, Speed: ${this.speed}, Armored: ${this.armored}, Weapon: ${this.weapon}]`);
    } 
}


/** A Quick Note on Cloning:
 *  
 *  Shallow Copy: This implementation performs a shallow copy. It’s fine if all fields are primitives or immutable (like String). But if Enemy had a field like a List, both the original and cloned enemies would share the same list object, which can cause subtle bugs.
 *  Deep Copy: If your object contains mutable reference types, you should create a deep copy in the copy constructor.
 * 
 */


//? Step 3 (Optional): Create a Prototype Registry (EnemyRegistry)


// A Prototype Registry (or Manager) stores pre-configured prototype instances. This keeps your code organized, especially when you have many types of enemies.

class EnemyRegistry {
    private prototypes: Map<string, Enemy> = new Map();

    register(key: string, prototype: Enemy): void {
        this.prototypes.set(key, prototype);
    }

    get(key: string): Enemy {
        const prototype = this.prototypes.get(key);
        if(prototype !== undefined) {
            return prototype.clone();
        }
        throw new Error(`No prototype registered for: ${key}`);
    }
}

const registry = new EnemyRegistry();

// Register prototype enemies

registry.register("flying", new Enemy("FlyingEnemy", 100, 12.0, false, "Laser"));
registry.register("armored", new Enemy("ArmoredEnemy", 300, 6.0, true, "Cannon"));

// Clone from registry

const e1 = registry.get("flying");
const e2 = registry.get("flying");
e2.setHealth(80);

const e3 = registry.get("armored");

e1.printStatus();
e2.printStatus();
e3.printStatus();



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


class Student {
    name: string
    age: number
    rollNo: string
    address: string
    phoneNo: string

    constructor(name: string, age: number, rollNo: string, address: string, phoneNo: string) {
        this.name = name
        this.age = age
        this.rollNo = rollNo;
        this.address = address;
        this.phoneNo = phoneNo;
    }

    clone() {
        return new Student(this.name, this.age, this.rollNo, this.address, this.phoneNo)
    }

    setName(name: string) {
        this.name = name
    }

    setAge(age: number) {
        this.age = age
    }

    setAddress(address: string) {
        this.address = address
    }

    setPhoneNo(phoneNo: string) {
        this.phoneNo = phoneNo
    }

    print() {
        console.log("name", this.name)
        console.log("age", this.age)
        console.log("rollNo", this.rollNo)
        console.log("address", this.address)
        console.log("phoneNo", this.phoneNo)
    }
}


const student = new Student("Satendra", 12, "123", "Delhi", "7004159119")


const studentA = student.clone()
studentA.setName("Tanu")
const studentB = student.clone()
studentB.setName("A")
studentB.setAddress("Gopalganj")

studentA.print()
studentB.print()
