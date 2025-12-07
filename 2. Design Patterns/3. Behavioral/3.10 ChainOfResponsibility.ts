/**
The Chain of Responsibility Design Pattern is a behavioral pattern that lets you pass requests along a chain of handlers, allowing each handler to decide whether to process the request or pass it to the next handler in the chain.
*/




abstract class Notes {
   public next: Notes | undefined;

    notesHandler(nextNote?: Notes) {
        this.next = nextNote
    }
    abstract dispense(amount: number): void;
}


class ThousandNote extends Notes {
    dispense(amount: number) {
        console.log("Dispensing cash of 1000 *", Math.floor(amount / 1000))
        const rem = amount % 1000;

        if (rem && this.next) {
            this.next.dispense(rem)
        }
    }
}


class FiveHundredNote extends Notes {
    dispense(amount: number) {
        console.log("Dispensing cash of 500 *", Math.floor(amount / 500))
        const rem = amount % 500;

        if (rem && this.next) {
            this.next.dispense(rem)
        }
    }
}

class HundredNote extends Notes {

    dispense(amount: number) {
        console.log("Dispensing cash of 100 *", Math.floor(amount / 100))
        const rem = amount % 100;

        if (rem) {
            throw new Error("Insufficient Balance...")
        }
    }
}




const thousandNote = new ThousandNote()
const fiveHundredNote = new FiveHundredNote()
const hundredNote = new HundredNote()
thousandNote.notesHandler(fiveHundredNote)
fiveHundredNote.notesHandler(hundredNote)
thousandNote.dispense(5600)