class Database {
    id: number;
    name: string;
    careTaker!: CareTaker;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.careTaker = new CareTaker();
    }
    updateData(id: number, name: string) {
        this.careTaker.addMomento(new Momento(this.id, this.name))
        this.id = id
        this.name = name
    }

    restoreData(state: number) {
        const momento = this.careTaker.getMomento(state)
        this.id = momento.id
        this.name = momento.name
    }

    display() {
        console.log("id : ", this.id, " name : ", this.name)
    }
}


class Momento {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}


class CareTaker {
    database: Momento[] = []

    addMomento(momento: Momento) {
        this.database.push(momento)
    }

    getMomento(state: number) {
        if(state > this.database.length) {
            throw new Error("Error: This state doesn't exist")
        } else {
            return this.database[state]
        }
    }
}



/**
(1, "Satendra")
(1, "Satendra K")
(1, "Satendra Kumar")
*/


const data1 = new Database(1, "Satendra")
data1.updateData(1, "Satendra K")
data1.updateData(1, "Satendra Ku")
data1.updateData(1, "Satendra Kumar")

data1.restoreData(1)
data1.display()



