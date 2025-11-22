/**


Robot


coordinateX: number
coordinateY: number
type: string   (HUMANOID, ROBOTIC DOG)
body: image (31kb)



1000000 * 32kb = 32GB



Intrinsic data (fixed) = 64kb

    type: string   (HUMANOID, ROBOTIC DOG)
    body: image (31kb)


Extrinsic (variable)
    coordinateX: number
    coordinateY: number

*/
             
/**
//! Bad Example

class Robot {
    coordinateX: number;
    coordinateY: number;
    type: string;
    body: ImageBitmap;

    constructor(coordinateX: number, coordinateY: number, type: string, body: ImageBitmap) {
        this.coordinateX = coordinateX
        this.coordinateY = coordinateY
        this.type = type
        this.body = body
    }
}


const arr = []
for(let i=0; i<=100000; i++) {
    arr.push(new Robot(i*1, i*2, "HUMANOID", new ImageBitmap()))
}

*/


//? Good Example

// intrinsic
class RobotFlyweight {
    type: string;
    body: string;

    constructor(type: string, body: string) {
        this.type = type
        this.body = body
    }
}


// extrinsic
class Robot {
    robot: RobotFlyweight;
    coordinateX: number;
    coordinateY: number;
    

    constructor(coordinateX: number, coordinateY: number, robot: RobotFlyweight) {
        this.coordinateX = coordinateX
        this.coordinateY = coordinateY
        this.robot = robot
    }

    display(){
        console.log(this.robot.type, this.robot.body, this.coordinateX, this.coordinateY)
    }
}



const humanoid = new RobotFlyweight("HUMANOID", "LARGE_FILE")
const roboticDog = new RobotFlyweight("ROBOTIC_DOG", "LARGE_FILE")


const robot1 = new Robot(100, 100, humanoid)
const robot2 = new Robot(100, 120, roboticDog)

robot1.display()
robot2.display()








//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------




/**You need to render a city map that shows:

1 million trees

Each tree has only two types (Neem, Mango)

Each tree stores its x,y coordinate and treeType properties

TreeType contains: color, texture image, common name, height pattern

Hint:
Coordinates are unique → extrinsic
TreeType is shared → intrinsic → Flyweight

*/


// class Tree {
//     coordinateX: number = 4bytes
//     coordinateY: number = 4bytes
//     type: string        = 8 bytes (Mango, Neem)
//     color: string       = 4 byte (Green)
//     img: string         = 20 kb
//     height: number      = 4 bytes
// }



class TreeFlyWeight {
    type: string
    colour: string
    img: string

    constructor(type: string, colour: string, img: string) {
        this.type = type
        this.colour = colour
        this.img = img
    }
}


class Tree {

    coordinateX: number
    coordinateY: number
    height: number
    tree: TreeFlyWeight

    constructor(coordinateX: number, coordinateY: number, height: number, tree: TreeFlyWeight) {
        this.coordinateX = coordinateX
        this.coordinateY = coordinateY
        this.height = height
        this.tree = tree
    }

    display() {
        console.log(this.tree.type, this.tree.colour, this.tree.img, this.coordinateX, this.coordinateY, this.height)
    }
}


const mango = new TreeFlyWeight("MANGO", "Green", "img1.jpeg")
const neem = new TreeFlyWeight("NEEM", "Green", "img2.jpeg")

const tree1 = new Tree(100, 101, 10, mango)
const tree2 = new Tree(50, 51, 8, neem)

tree1.display()
tree2.display()