
//1. Command Pattern solves the problem of needing to treat actions like objects — so they can be stored, undone, queued, and reused.



class Inventory {
    currentStock: number;
    productName: string;
    price: number;

    constructor(productName: string, price: number) {
        this.productName = productName
        this.price = price
        this.currentStock = 0
    }

    addInventory(quantity: number) {
        this.currentStock = this.currentStock + quantity;

    }

    removeInventory(quantity: number) {
        this.currentStock = this.currentStock - quantity;
    }

    getCurrentStock() {
        console.log(`Product: ${this.productName}  - Stock: ${this.currentStock}`)
    }
}


/**
const product1 = new Inventory("Bhujiya", 5)

// product1.addInventory(50)
product1.removeInventory(10)
product1.addInventory(20)

product1.getCurrentStock()

*/

//2. Command Pattern will be used to log and undo all above operations

interface InventoryAction {
    execute(): void;
    undo(): void;
}

class AddInventory implements InventoryAction {
    inventory: Inventory;
    quantity: number;

    constructor(inventory: Inventory, qauntity: number) {
        this.inventory = inventory
        this.quantity = qauntity
    }

    execute() {
        this.inventory.addInventory(this.quantity)
    }

    undo() {
        this.inventory.removeInventory(this.quantity)
    }
}


class RemoveInventory implements InventoryAction {
    inventory: Inventory;
    quantity: number;

    constructor(inventory: Inventory, qauntity: number) {
        this.inventory = inventory
        this.quantity = qauntity
    }

    execute() {
        this.inventory.removeInventory(this.quantity)
    }

    undo() {
        this.inventory.addInventory(this.quantity)
    }
}

/*? What we achived here
    - undo, redo
    - Execute later
**/

/*

const product1 = new Inventory("ABC", 12)

const operation1 = new AddInventory(product1, 100)

operation1.execute()

product1.getCurrentStock()


const operation2 = new RemoveInventory(product1, 20)

operation2.execute()
operation2.undo()

product1.getCurrentStock()

**/



// 3. Now I want to log the operations


class Logging {
    operations: InventoryAction[] = [];

    executeWithLogging(action: InventoryAction) {
        action.execute()
        this.operations.push(action)
    }

    undoWithLogging() {
        const action = this.operations.pop()
        if (action) {
            action.undo()
        }
    }

    getLogs() {
        for(const transaction of this.operations) {
            console.log("transaction = ", transaction)
        }
    }
}

const logger = new Logging()


const product1 = new Inventory("ABC", 12)

const operation1 = new AddInventory(product1, 100)

logger.executeWithLogging(operation1)

const operation2 = new RemoveInventory(product1, 20)

logger.executeWithLogging(operation2)

logger.undoWithLogging()

product1.getCurrentStock()
logger.getLogs()