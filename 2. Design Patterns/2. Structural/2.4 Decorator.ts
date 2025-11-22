/** The Decorator Design Pattern is a structural pattern that lets you dynamically add new behavior or responsibilities to objects without modifying their underlying code.
 *  It’s particularly useful in situations where:
 *      - You want to extend the functionality of a class without subclassing it.
 *      - You need to compose behaviors at runtime, in various combinations.
 *      - You want to avoid bloated classes filled with if-else logic for optional features.
 */

// 1. The Problem: Adding Features to a Text Renderer

/**
 Imagine you’re building a rich text rendering system (like a simple word processor or a markdown preview tool). At the core of your system is a TextView component that renders plain text on screen.
    Soon, product requirements evolve:

    You need to support bold text
    Then italic text
    Then underlined text
    Then scrollable and bordered text containers
    And possibly combinations of those (e.g., bold + italic + underlined)
*/

// Naive Approach: Subclassing for Every Combination



//! Wrong Approach

/**
class BasePizza {
    cost() {
        return 10;
    }
}

class BasePizzaExtraChees {
    cost() {
        return 70;
    }
}

class BasePizzaExtraCheesOlives {
    cost() {
        return 100;
    }
}


class BasePizzaOlives {
    cost() {
        return 90;
    }
}

class BasePizaaJalepino {
    cost() {
        return 110;
    }
}

class BasePizzaExtraCheesOlivesJalepino {
    cost() {
        return 150;
    }
}
*/

//Decorator pattern allows you to add features dynamically without modifying the base class.
//Each topping simply wraps another pizza object.
//You can stack unlimited decorators:
//new Mushroom(new Cheese(new Margarita(new BasePizza())))


/**
class BasePizza {
    cost() {
        return 10;
    }
}

class Farmhouse extends BasePizza {
    cost(): number {
        return 100;
    }
}



abstract class ToppingDecorator extends BasePizza {
    pizza: BasePizza;
    
    constructor(pizza: BasePizza) {
        super();
        this.pizza = pizza;
    }

    abstract cost(): number;
}

class Margarita extends ToppingDecorator {
    constructor(pizza: BasePizza) {
        super(pizza);
    }

    cost(): number {
        return this.pizza.cost() + 50;
    }
}

class Corn extends ToppingDecorator {
    constructor(pizza: BasePizza) {
        super(pizza);
    }

    cost(): number {
        return this.pizza.cost() + 70;
    }
}


class Mushroom extends ToppingDecorator {
    constructor(pizza: BasePizza) {
        super(pizza);
    }

    cost(): number {
        return this.pizza.cost() + 90;
    }
}

const pizza = new Farmhouse();

const corn = new Margarita(new Corn(new Margarita(pizza)));



console.log(corn.cost())

*/


class UserService {
    createUser(name: string, email :string, age: string) {
        // save to db
        console.log("Final create user call")
    }
}

abstract class MethodDecorators extends UserService {
    user!: UserService;

    constructor(user: UserService) {
        super()
        this.user = user;
    }

    abstract createUser(name: string, email: string, age: string): void;
}
 

class StartTime extends MethodDecorators {
    constructor(user: UserService) {
        super(user)
    }

    createUser(name: string, email: string, age: string) {
        console.log("Start time start", new Date())
        this.user.createUser(name, email, age);
        console.log("Start time end", new Date())
    }

}

class EndTime extends MethodDecorators {
    constructor(user: UserService) {
        super(user)
    }

    createUser(name: string, email: string, age: string) {
        console.log("End time start", new Date())
        this.user.createUser(name, email, age);
        console.log("End time end", new Date())

    }
}

class RunTime extends MethodDecorators {
    constructor(user: UserService) {
        super(user)
    }

    createUser(name: string, email: string, age: string) {
        console.log("Run time start", new Date())
        this.user.createUser(name, email, age);
        console.log("Run time start", new Date())
    }
}


class ArgumentsReceived extends MethodDecorators {
    constructor(user: UserService) {
        super(user)
    }

    createUser(name: string, email: string, age: string) {
        console.log("Arguments start", name, email, age)
        this.user.createUser(name, email, age);
        console.log("Arguments end", name, email, age)
    }
}



const satendra = new UserService()

const obj = new StartTime(new EndTime(new RunTime(new ArgumentsReceived(satendra))))

obj.createUser("Satendra", "sk@gmail.com", "25")

