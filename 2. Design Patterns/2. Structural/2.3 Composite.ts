/** The Composite Design Pattern is a structural pattern that lets you treat individual objects and compositions of objects uniformly.
 *  It allows you to build tree-like structures (e.g., file systems, UI hierarchies, organizational charts) where clients can work with both single elements and groups of elements using the same interface.
 * 
 *  It’s particularly useful in situations where:
 *      - You need to represent part-whole hierarchies.
 *      - You want to perform operations on both leaf nodes and composite nodes in a consistent way.
 *      - You want to avoid writing special-case logic to distinguish between "single" and "grouped" objects.
 */


// 1. The Problem: Modeling a File Explorer


/**
 Imagine you're building a file explorer application (like Finder on macOS or File Explorer on Windows). The system needs to represent:
    - Files – simple items that have a name and a size.
    - Folders – containers that can hold files and other folders (even nested folders).

 Your goal is to support operations such as:
    - getSize() – return the total size of a file or folder (which is the sum of all contents).
    - printStructure() – print the name of the item, including indentation to show hierarchy.
    - delete() – delete a file or a folder and everything inside it.
*/


// The Naive Approach: A straightforward solution might involve two separate classes: File and Folder. Here's a simplified version:


class Files1 {
    private name!: string;
    private size!: number;

    getSize() {
        return this.size;
    }

    getStructure(indent: string) {
        console.log(indent + this.name)
    }

    delete() {
        console.log("Deleting file: ", this.name)
    }
}

class Folders1 {
    private name!: string;
    private contents: any[] = [];

    getSize() {
        let total = 0;

        for(const item of this.contents) {
            if(item instanceof Files1) {
                total += item.getSize();
            } else if (item instanceof Folders1) {
                total += item.getSize();
            }
        }
        return total;
    }

    getStructure(indent: string) {
        for(const item of this.contents) {
            if(item instanceof Files1) {
                console.log(indent + this.name);
            } else if (item instanceof Folders1) {
                console.log(indent + this.name)
            }
        }
    }

    delete() {
        for(const item of this.contents) {
            if(item instanceof Files1) {
                item.delete();
            } else if (item instanceof Folders1) {
                item.delete();
            }
        }
        console.log("Deleting folder: ", this.name)
    }
}


//! What’s Wrong With This Approach?

// As the structure grows more complex, this solution introduces several critical problems:

/**
 As the structure grows more complex, this solution introduces several critical problems:
    1. Repetitive Type Checks
        - Operations like getSize(), printStructure(), and delete() require repeated instanceof checks and downcasting — leading to duplicated and fragile logic.

    2. No Shared Abstraction
        - There’s no common interface for File and Folder, which means you can’t treat them uniformly.

    3. Violation of Open/Closed Principle
        - To add new item types (e.g., Shortcut, CompressedFolder), you must modify existing logic in every place where type checks happen — increasing the risk of bugs and regression.

    4. Lack of Recursive Elegance
        - Deleting deeply nested folders or computing sizes across multiple levels becomes a tangled mess of nested conditionals and recursive checks.

 We need a solution that:
    1. Introduces a common interface (e.g., FileSystemItem) for all components.
    2. Allows files and folders to be treated uniformly via polymorphism.
    3. Enables folders to contain a list of the same interface, supporting arbitrary nesting.
    4. Supports recursive operations like delete and getSize without type checks.
    5. Makes the system easy to extend — new item types can be added without modifying existing logic.

*/



// 2. What is the Composite Pattern

// The Composite Design Pattern is a structural design pattern that lets you treat individual objects and groups of objects in a uniform way.

// In a composite structure, each node in the hierarchy shares the same interface, whether it’s a leaf (e.g., a File) or a composite (e.g., a Folder). This allows clients to perform operations like getSize(), delete(), or render() recursively and consistently across both.


// 3. Implementing Composite


interface FileSystemItem {
    getSize(): number;
    printStructure(indent: string): void;
    delete(): void;
}


class Files implements FileSystemItem {
    private readonly name!: string;
    private readonly size!: number;

    constructor(name: string, size: number) {
        this.name = name
        this.size = size
    }

    getSize(): number {
        return this.size
    }

    printStructure(indent: string): void {
        console.log(indent + this.name)
    }

    delete(): void {
        console.log("Deleting File: ", this.name)
    }
}


class Folder implements FileSystemItem {
    private readonly name!: string;
    private readonly childs: FileSystemItem[] = [];

    constructor(name: string) {
        this.name = name
    }

    addItem(item: FileSystemItem): void {
        this.childs.push(item);
    }

    getSize(): number {
        let total = 0;

        for(const item of this.childs) {
            total += item.getSize()
        }
        return total
    }

    printStructure(indent: string): void {
        console.log(this.name, "/")

        for(const item of this.childs) {
            item.printStructure(indent + " ")
        }
    }

    delete(): void {
        for(const item of this.childs) {
            item.delete();
        }
        console.log("Deleting folder: ", this.name)
    }
}


// The Folder class is a composite. It can contain both File and Folder instances, making it recursive and scalable.

// 4. Client Code

const file1: FileSystemItem = new Files('Readme.md', 100);
const file2: FileSystemItem = new Files('photo.jpg', 1500);
const file3: FileSystemItem = new Files('data.csv', 300);

const documents: Folder = new Folder('Documents');
documents.addItem(file1)
documents.addItem(file3)


const pictures: Folder = new Folder("Pictures")
documents.addItem(file2)

const home: Folder = new Folder("Home")
home.addItem(documents)
home.addItem(pictures)


console.log("---- File Structure ----");

home.printStructure("");

console.log("\nTotal Size: " + home.getSize() + " KB");

console.log("\n---- Deleting All ----");

home.delete();

/** Output

---- File Structure ----
+ Home/
  + Documents/
    - readme.txt (5 KB)
    - data.csv (300 KB)
  + Pictures/
    - photo.jpg (1500 KB)

Total Size: 1805 KB

---- Deleting All ----
Deleting file: readme.txt
Deleting file: data.csv
Deleting folder: Documents
Deleting file: photo.jpg
Deleting folder: Pictures
Deleting folder: Home

*/


// With the Composite Pattern, we’ve modeled the file system the way it naturally works, as a tree of items where some are leaves and others are containers. Each operation (getSize(), printStructure(), delete()) is now modular, recursive, and extensible.

/** What We Achieved with Composite?
 *      - Unified treatment: Files and folders share a common interface, allowing polymorphism
 *      - Clean recursion: No instanceof, no casting — just delegation
 *      - Scalability: Easily supports deeply nested structures
 *      - Maintainability: Adding new file types (e.g., Shortcut, CompressedFolder) is easy
 *      - Extensibility: New operations can be added via interface extension or visitor pattern
 */




//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------


/**
class Files {
    size!: number;
    name!: string;

    constructor(name: string, size: number) {
        this.size = size;
        this.name = name;
    }

    getSize() {
        return this.size;
    }

    printFileStructure() {
        console.log("-", this.name)
    }
}


class Folder {
    name!: string;
    nestedFolder:any[] = [];


    constructor(name: string) {
        this.name = name;
    }

    addFile(name: string, size: number) {
        const file = new Files(name, size)
        this.nestedFolder.push(file)
    }

    addFolder(name: string) {
        const folder = new Folder(name);
        this.nestedFolder.push(folder)
        return folder;
    }

    getSize() {
        let totalSize = 0;
        for (const item of this.nestedFolder) {
            totalSize += item.getSize();
        }
        return totalSize;
    }

    printStructure() {
        console.log("+ ", this.name, "/")
        for (const item of this.nestedFolder) {
            if(item instanceof Files) {
                item.printFileStructure()
            } else if (item instanceof Folder) {
                item.printStructure()
            } else if (item instanceof Shortcut) {

            }
        }

    }
}



const home  = new Folder("Home")
const documents = home.addFolder("Documents")

documents.addFile("readme.txt", 5)
documents.addFile("data.csv", 300)

const tanu = documents.addFolder("Tanu")

tanu.addFile("a.txt", 10)


const pictures = home.addFolder("Pictures")
pictures.addFile("photo.jpg", 1500)


home.printStructure()


/**

---- File Structure ----

+ Home/
  + Documents/
    - readme.txt (5 KB)
    - data.csv (300 KB)
  + Pictures/
    - photo.jpg (1500 KB)


*/

// The Composite Design Pattern is a structural design pattern used to treat individual objects and groups of objects in a uniform way.

interface FileSystemItem {
    getSize(): number;
    printStructure(): void;
    delete(): void;
}

class Files implements FileSystemItem {

    size!: number;
    name!: string;

    constructor(name: string, size: number) {
        this.size = size;
        this.name = name;
    }

    getSize() {
        return this.size;
    }

    printStructure() {
        console.log("-", this.name)
    }

    delete(): void {
        this.name = ""
    }
}


class Folder implements FileSystemItem {
    name!: string;
    nestedFolder:any[] = [];


    constructor(name: string) {
        this.name = name;
    }

    addFileSystem(file: FileSystemItem) {
        this.nestedFolder.push(file)
    }

    getSize() {
        let totalSize = 0;
        for (const item of this.nestedFolder) {
            totalSize += item.getSize();
        }
        return totalSize;
    }

    printStructure() {
        console.log("+ ", this.name, "/")
        for (const item of this.nestedFolder) {
                item.printStructure()
            }
    }

    delete(): void {
        this.nestedFolder = []
        this.name = ""
    }
}


const home = new Folder("Home")

const documents = new Folder("Documents")
home.addFileSystem(documents)

documents.addFileSystem(new Files("readme.txt", 5))
documents.addFileSystem(new Files("data.csv", 300))


const pictures = new Folder("Pictures")
home.addFileSystem(pictures)
pictures.addFileSystem(new Files("photo.jpeg", 1500))


home.printStructure()

pictures.delete()

console.log("------------------------\n\n")

home.printStructure()




/**

---- File Structure ----

+ Home/
  + Documents/
    - readme.txt (5 KB)
    - data.csv (300 KB)
  + Pictures/
    - photo.jpg (1500 KB)
*//**
class Files {
    size!: number;
    name!: string;

    constructor(name: string, size: number) {
        this.size = size;
        this.name = name;
    }

    getSize() {
        return this.size;
    }

    printFileStructure() {
        console.log("-", this.name)
    }
}


class Folder {
    name!: string;
    nestedFolder:any[] = [];


    constructor(name: string) {
        this.name = name;
    }

    addFile(name: string, size: number) {
        const file = new Files(name, size)
        this.nestedFolder.push(file)
    }

    addFolder(name: string) {
        const folder = new Folder(name);
        this.nestedFolder.push(folder)
        return folder;
    }

    getSize() {
        let totalSize = 0;
        for (const item of this.nestedFolder) {
            totalSize += item.getSize();
        }
        return totalSize;
    }

    printStructure() {
        console.log("+ ", this.name, "/")
        for (const item of this.nestedFolder) {
            if(item instanceof Files) {
                item.printFileStructure()
            } else if (item instanceof Folder) {
                item.printStructure()
            } else if (item instanceof Shortcut) {

            }
        }

    }
}



const home  = new Folder("Home")
const documents = home.addFolder("Documents")

documents.addFile("readme.txt", 5)
documents.addFile("data.csv", 300)

const tanu = documents.addFolder("Tanu")

tanu.addFile("a.txt", 10)


const pictures = home.addFolder("Pictures")
pictures.addFile("photo.jpg", 1500)


home.printStructure()


/**

---- File Structure ----

+ Home/
  + Documents/
    - readme.txt (5 KB)
    - data.csv (300 KB)
  + Pictures/
    - photo.jpg (1500 KB)


*/

// The Composite Design Pattern is a structural design pattern used to treat individual objects and groups of objects in a uniform way.

interface FileSystemItem {
    getSize(): number;
    printStructure(): void;
    delete(): void;
}

class Files implements FileSystemItem {

    size!: number;
    name!: string;

    constructor(name: string, size: number) {
        this.size = size;
        this.name = name;
    }

    getSize() {
        return this.size;
    }

    printStructure() {
        console.log("-", this.name)
    }

    delete(): void {
        this.name = ""
    }
}


class Folder implements FileSystemItem {
    name!: string;
    nestedFolder:any[] = [];


    constructor(name: string) {
        this.name = name;
    }

    addFileSystem(file: FileSystemItem) {
        this.nestedFolder.push(file)
    }

    getSize() {
        let totalSize = 0;
        for (const item of this.nestedFolder) {
            totalSize += item.getSize();
        }
        return totalSize;
    }

    printStructure() {
        console.log("+ ", this.name, "/")
        for (const item of this.nestedFolder) {
                item.printStructure()
            }
    }

    delete(): void {
        this.nestedFolder = []
        this.name = ""
    }
}


const home = new Folder("Home")

const documents = new Folder("Documents")
home.addFileSystem(documents)

documents.addFileSystem(new Files("readme.txt", 5))
documents.addFileSystem(new Files("data.csv", 300))


const pictures = new Folder("Pictures")
home.addFileSystem(pictures)
pictures.addFileSystem(new Files("photo.jpeg", 1500))


home.printStructure()

pictures.delete()

console.log("------------------------\n\n")

home.printStructure()




/**

---- File Structure ----

+ Home/
  + Documents/
    - readme.txt (5 KB)
    - data.csv (300 KB)
  + Pictures/
    - photo.jpg (1500 KB)
*/


/**
 
interface CompanyEmployee {
    addMember(employee: CompanyEmployee): void;
    printHeirarchy(): void;
}


class Manager implements CompanyEmployee {
    name!: string;
    listEmployees: CompanyEmployee[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addMember(employee: CompanyEmployee): void {
        this.listEmployees.push(employee)
    }

    printHeirarchy(): void {
        console.log("+ ", this.name, "/")
        for(const item of this.listEmployees) {
            item.printHeirarchy()
        }
    }
}


class Employee implements CompanyEmployee {
    name!: string;

    constructor(name: string) {
        this.name = name;
    }


    addMember(employee: CompanyEmployee): void {
        console.log(employee)
    }

    printHeirarchy(): void {
        console.log("-", this.name)
    }
}


const ayush = new Manager("Ayush P Gupta")
const satendra = new Manager("Satendra")
ayush.addMember(satendra)

satendra.addMember(new Employee("Diksha"))

ayush.printHeirarchy()

*/



