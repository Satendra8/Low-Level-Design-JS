/**
    1. Virual Proxy
*/

interface Display {
    display(): void
}


class ImageDisplay implements Display {
    path: string

    constructor(path: string) {

        // expensive operations

        // compress image

        // set height and width

        this.path = path
    }

    display() {
        // dispaly this.path
        console.log("Display image", this.path)
    }
}



class ImageDisplayProxy implements Display {
    imageDisplay!: ImageDisplay
    path: string

    constructor(path: string) {
        this.path = path
    }

    display(): void {
        if (this.imageDisplay == null) {
            this.imageDisplay = new ImageDisplay(this.path)
        }

        this.imageDisplay.display()
    }
}


const img = new ImageDisplayProxy('photo.jpg')




/**
 2. Protection proxy
*/



interface IDocumentReader {
    unlockPdf(): void
}

class DocumentReader implements IDocumentReader {
    path: string
    password: string


    constructor(path: string, password: string) {
        this.path = path
        this.password = password
    }

    unlockPdf(): void {
        console.log("Pdf unlocked successfully", this.path)
    }
}

interface IUser {
    name: string
    email: string
    isPremium: boolean

    isUserPremium(): boolean;
}


class User implements IUser {
    name: string
    email: string
    isPremium: boolean = false


    constructor(name: string, email: string, isPremium: boolean) {
        this.name = name
        this.email = email
        this.isPremium = isPremium
    }

    isUserPremium() {
        return this.isPremium
    }
}

class DocumentReaderProxy implements IDocumentReader {
    path: string
    password: string
    documentReader!: DocumentReader
    user: IUser

    constructor(path: string, password: string, user: IUser) {
        this.path = path
        this.password = password
        this.user = user
    }

    unlockPdf(): void {
        if(this.user.isUserPremium()) {
            if(this.documentReader == null) {
                this.documentReader = new DocumentReader(this.path, this.password)
            }
            this.documentReader.unlockPdf()
        } else{
            console.log("You are not authorised to access this")
        }
    }
}


const user1 = new User("Satendra", "sk@gmail.com", false)

const reader = new DocumentReaderProxy("new.pdf", "12345678", user1)

reader.unlockPdf()





/**
 3. Remote Proxy
 */


interface IDatabase {
    fetchData(): void;
}

class Database implements IDatabase {
    fetchData(): void {
        console.log("Data fetched successfully...")
    }
}

class DatabaseProxy implements IDatabase{
    database!: Database;

    fetchData(): void {
        if(this.database == null) {
            console.log("Connection created successfully")
            this.database = new Database()
        }
        this.database.fetchData()
    }
}

const newDatabase = new DatabaseProxy()

newDatabase.fetchData()

newDatabase.fetchData()


