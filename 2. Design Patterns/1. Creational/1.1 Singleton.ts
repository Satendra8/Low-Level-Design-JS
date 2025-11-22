/**
In software development, we often require classes that can only have one object.

Example: thread pools, caches, loggers etc.

Creating more than one objects of these could lead to issues such as incorrect program behavior, overuse of resources, or inconsistent results.

This is where Singleton Design Pattern comes into play.


What is Singleton Pattern?

Singleton Pattern is a creational design pattern that guarantees a class has only one instance and provides a global point of access to it.

*/

// 7 Most Common Ways to Implement Singleton



/** 1. Lazy Initialization */  

/**
 * 1. Checks if an instance already exists (instance == null).
 * 2. If not, it creates a new instance.
 * 3. If an instance already exists, it skips the creation step.
 */

class LazySigleton {
    public static instance: LazySigleton;

    // private constructor
    private constructor(){}

    public static getInstance(): LazySigleton{
        if(LazySigleton.instance == null){
            LazySigleton.instance = new LazySigleton();
        }
        return LazySigleton.instance;
    }
}

const obj1 = LazySigleton.getInstance()
const obj2 = LazySigleton.getInstance()

console.log(obj1 === obj2)

// The implementation is not thread safe, 
// if multiple threads call getInstance() simultaneously when instance is null,
// it's possible to create multiple instances.




/** 2. Eager Initialization */  

/**
 * 1. create instance in advance, when the class is loaded.
 */

class EagerSigleton {
    public static instance: EagerSigleton = new EagerSigleton();

    // private constructor
    private constructor(){}

    public static getInstance(): EagerSigleton{
        return EagerSigleton.instance;
    }
}

// The implementation is not thread safe, 
// if multiple threads call getInstance() simultaneously when instance is null,
// it's possible to create multiple instances.
const object1 = EagerSigleton.getInstance()
const object2 = EagerSigleton.getInstance()

console.log(obj1 === obj2)


/**

Real-World Examples of Singleton


- Managing Shared Resources (database connections, thread pools, caches, configuration settings)
- Coordinating System-Wide Actions (logging, print spoolers, file managers)
- Managing State (user session, application state)


Specific Examples:

- Logger Classes: Many logging frameworks use the Singleton pattern to provide a global logging object. This ensures that log messages are consistently handled and written to the same output stream.
- Database Connection Pools: Connection pools help manage and reuse database connections efficiently. A Singleton can ensure that only one pool is created and used throughout the application.
- Cache Objects: In-memory caches are often implemented as Singletons to provide a single point of access for cached data across the application.
- Thread Pools: Thread pools manage a collection of worker threads. A Singleton ensures that the same pool is used throughout the application, preventing resource overuse.
- File System: File systems often use Singleton objects to represent the file system and provide a unified interface for file operations.



Pros
    i. Ensure a single instance of a class and provides a global point of access to it.
    ii. Only one object is created, which can be particularly beneficial for resource-heavy classes.
    iii. Provides a way to maintain global state within an application
    iv. Supports the lazy loading, where the instance is only created when it's first needed.
    v. Guarantees that every object in the application uses the same global resource.

Cons
    i. Violates the SRP: The pattern solves two problems at the same time.
    ii. In multithreaded environments, special care must be taken to implement Singletons correctly to avoid race conditions.
    iii. Introduces global state into an application, which might be difficult to manage.
    iv. Classes using the singleton can become tightly coupled to the singleton class.
    v. Singleton patterns can make unit testing difficult due to the global state it introduces.


** It's important to note that the Singleton pattern should be used judiciously, as it introduces global state and can make testing and maintenance more challenging. Consider alternative approaches like dependency injection when possible to promote loose coupling and testability.

*/





//---------------------------------------------------------------------------
//---------------------------------------------------------------------------



// lazy initialization

class DatabaseConnection {
    static instance: DatabaseConnection;

    private constructor() {
        console.log("1")
    }

    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection()
        }
        return DatabaseConnection.instance;
    }
}


// eager initialization

class DatabaseConnection1 {
    static instance: DatabaseConnection = new DatabaseConnection1();

    private constructor() {
        console.log("2")
    }

    static getInstance() {
        return DatabaseConnection.instance;
    }
}




let connect1 =  DatabaseConnection1.getInstance()
let connect2 =  DatabaseConnection1.getInstance()
let connect3 =  DatabaseConnection1.getInstance()
let connect4 =  DatabaseConnection1.getInstance()


console.log(connect1)
console.log(connect2)

