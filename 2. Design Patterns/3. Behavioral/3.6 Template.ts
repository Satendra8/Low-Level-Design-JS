
// 1. Fetch data
// 2. Clean or transform data
// 3. Format the data
// 4. Save the to database
// 5. Send success message


// This was wroking for CSV

abstract class SaveDataTemplate {
    abstract fetch(): void;
    abstract clean(): void;
    abstract formatData(): void;
    abstract save(): void;
    abstract sendMessage(): void;

    /** make this fixed, so that noone can override this
        private execute() {
            this.fetch()
            this.clean()
            this.formatData()
            this.save()
            this.sendMessage()
        }
    */

    process() {
        this.execute()
    }

    private execute() {
        this.fetch()
        this.clean()
        this.formatData()
        this.save()
        this.sendMessage()
    }
}

// 1. Methods name should be same for all Save Data Task
// 2. Order of execution of functions should be same

class FetchAndSaveDataCSV extends SaveDataTemplate {
    file: string;

    constructor(file: string) {
        super()
        this.file = file;
    }

    fetch() {
        console.log("1. Data fetched successfully!")
    }

    clean() {
        console.log("2. Data cleanup successfully!")
    }

    formatData() {
        console.log("3. Data formated")
    }

    save() {
        console.log("4. save data to DB")
    }

    sendMessage() {
        console.log("6. Your data has been saved successfully!")
    }
}


const file1 = new FetchAndSaveDataCSV('data.csv')

file1.process()




class FetchAndSaveDataPDF extends SaveDataTemplate {
    file: string;

    constructor(file: string) {
        super()
        this.file = file;
    }

    fetch() {
        console.log("A. Data fetched successfully!")
    }

    clean() {
        console.log("B. Data cleanup successfully!")
    }

    formatData() {
        console.log("C. Data formated")
    }

    save() {
        console.log("D. save data to DB")
    }

    sendMessage() {
        console.log("E. Your data has been saved successfully!")
    }
}

const file2 = new FetchAndSaveDataPDF('data.pdf')

file2.process()



// Template Method → Controls the sequence of steps inside a class hierarchy. - All methods of single Class

// Facade → Hides the complexity of multiple subsystems behind one simple API. - Multiple Classes



// Template Method - Define steps of an algorithm

// Facade - Hide subsystems behind a simple API