/**
//? Problem 1:
interface Robot {
    walk(): void;
    talk(): void;
    fly(): void;
    projection(): void;
}


class CompanionRobot implements Robot {
    walk() {
        console.log("Companion Robot is walking.");
    }
    talk() {
        console.log("Companion Robot is talking.");
    }

    fly() {
        console.log("Companion Robot cannot fly.");
    }
    projection() {
        console.log("Companion Robot is projecting holograms.");
    }
}

class NormalRoborot implements Robot {
    walk() {
        console.log("Normal Roborot is walking.");
    }
    talk() {
        console.log("Normal Roborot is talking.");
    }
    //! Liskov Substitution Principle violation 
    fly() {
        throw new Error("Normal Roborot cannot fly.");
    }
    projection() {
        console.log("Normal Roborot cannot project holograms.");
    }
}

*/

import { constants } from "buffer";


abstract class Robot {
    walk() {
        console.log("Robot is walking");
    }

    talk() {
        console.log("Robot is talking");
    }

    abstract projection(): void;
}

abstract class FlyingRobot extends Robot {
    flying(){
        console.log("Robot is flying");
    }
    abstract projection(): void;
}

class CompanionRobot extends FlyingRobot {
    projection(): void {
        console.log("Projecting companion robot")
    }
}

class NormalRobot extends Robot {
    projection(): void {
        console.log("Projecting normal robot")
    }
}

class CrowRobot extends FlyingRobot {
    projection(): void {
        console.log("Projecting companion robot")
    }
}

class EagleRobot extends FlyingRobot {
    projection(): void {
        console.log("Projecting companion robot")
    }
}

class SparrowRobot extends FlyingRobot {
    projection(): void {
        console.log("Projecting companion robot")
    }
}


// Robot can fly with normal fly or jet fly

abstract class JetFly extends FlyingRobot {
    flying(){
        console.log("Jet Fly");
    }
    abstract projection(): void;
}

class Helicopter extends JetFly {
    projection(): void {
        console.log("Projecting companion robot")
    }
}

class Aeroplane extends JetFly {
    projection(): void {
        console.log("Projecting companion robot")
    }
}

class Rocket extends JetFly {
    projection(): void {
        console.log("Projecting rocket robot")
    }
}


const rocket1 = new Rocket()

rocket1.flying()
rocket1.projection()



/** Strategy Pattern
interface Flying {
    fly(): void;
}

interface Walking {
    walk(): void;
}

interface Projection {
    projection(): void;
}


class Robot {
    flyObj: Flying;
    walkObj: Walking;
    projectionObj: Projection;


    constructor(flyObj: Flying, walkObj: Walking, projectionObj: Projection) {
        this.flyObj = flyObj;
        this.walkObj = walkObj;
        this.projectionObj = projectionObj;
    }

    fly() {
        this.flyObj.fly()
    }

    walk() {
        this.walkObj.walk()
    }

    projection() {
        this.projectionObj.projection()
    }
}

class NormalFly implements Flying {
    fly() {
        console.log("Normal fly")
    }
}

class JetFly implements Flying {
    fly() {
        console.log("Jet fly")
    }
}

class NormalWalk implements Walking {
    walk() {
        console.log("Normal walk")
    }
}

class NoWalk implements Walking {
    walk() {
        console.log("No walk")
    }
}

class HologramProjection implements Projection {
    projection() {
        console.log("Hologram Projection")
    }
}

class NoProjection implements Projection {
    projection() {
        console.log("No Projection")
    }
}

const robot1 = new Robot(
    new JetFly(),
    new NormalWalk(),
    new HologramProjection()
)

robot1.fly()
robot1.walk()
robot1.projection()

*/


// Strategy - Number of behaviuor constant

/**
Behaviour             Type

    walk             Nomral walk, No walk
    talk             Nomral talk, No talk
    fly              Normal fly, Jet fly

*/


// Visitor - behaviour can be multiple but they the way to do that is fixed




// Visitor - each operation has single type

// Strategy - number of operations fixed but number of types not fixed