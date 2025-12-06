// Different Operation on different state allowed => STATE DESIGN


/**
 * Problem
 
 Document
    
    State
        Draft
        Review
        Publish

    Operations
        write()
        read()
        print()

    
    if (status == "Draft") {
        review()
        status = "Review"
    } elif (status == "Review") {
        publish()
        status = "Publish"
    }


    // When number of state grows, if-else will increase and code will change at multiple places

*/

interface State {
    read(document: Documents): void;
    write(document: Documents): void;
    print(document: Documents): void;
}

class Draft implements State {

    write(document: Documents) {
        // change state to Review
        document.state = new Review()
        console.log("Draft ======> Review")
    }

    read(document: Documents): void {
        console.log("You can't read without write");
    }

    print(document: Documents): void {
        console.log("You can't print without review");
    }
}

class Review implements State {

    read(document: Documents) {
        // change state to Print
        document.state = new Publish()
        console.log("Review ======> Publish")

    }
    
    write(document: Documents): void {
        console.log("You can't write while review");
    }

    print(document: Documents): void {
        console.log("You can't print without review");
    }
}

class Publish implements State{

    print(document: Documents) {
        console.log("You doc has published")

    }

    read(document: Documents) {
        console.log("You can't read while print")
    }
    
    write(document: Documents): void {
        console.log("You can't write while review");
    }
}

class Documents {
    state: State

    constructor() {
        this.state = new Draft()
    }

    write() {
        this.state.write(this)
    }

    read() {
        this.state.read(this)
    }

    print() {
        this.state.print(this)
    }
}

const doc1 = new Documents() // Draft

doc1.write() // Review

doc1.write()

doc1.print()



// TradeOff - State Pattern is powerful when your system keeps gaining more states but the operations stay the same.