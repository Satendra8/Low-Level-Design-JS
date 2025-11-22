/**
 The Builder Design Pattern is a creational pattern that lets you construct complex objects step-by-step, separating the construction logic from the final representation.
 
 It’s particularly useful in situations where:

    - An object requires many optional fields, and not all of them are needed every time.
    - You want to avoid telescoping constructors or large constructors with multiple parameters.
    - The object construction process involves multiple steps that need to happen in a particular order.


    When building such objects, developers often rely on constructors with many parameters or expose setters for every field. For example, a User class might have fields like name, email, phone, address, and preferences.

    But as the number of fields grows, this approach becomes hard to manage, error-prone, and violates the Single Responsibility Principle — mixing construction logic with business logic.

    The Builder Pattern solves this by introducing a separate builder class that handles the object creation process. The client uses this builder to construct the object step-by-step, while keeping the final object immutable, consistent, and easy to create.
 */


// 1. The Problem: Building Complex HttpRequest Objects

/**
 Imagine you're building a system that needs to configure and create HTTP requests. Each HttpRequest can contain a mix of required and optional fields depending on the use case.

    Here’s what a typical HTTP request might include:

        i. URL (required)
        ii. HTTP Method (e.g., GET, POST, PUT – defaults to GET)
        iii. Headers (optional, multiple key-value pairs)
        iv. Query Parameters (optional, multiple key-value pairs)
        v. Request Body (optional, typically for POST/PUT)
        vi. Timeout (optional, default to 30 seconds)
*/



// The Naive Approach: Telescoping Constructors - doing constructor overloading, creating multiple constructors


class HttpRequest {
    private url: string;
    private method: string;
    private headers: Map<string, string>;
    private queryParams: Map<string, string>;
    private body: string;
    private timeout: number;

    constructor(url: string);
    constructor(url: string, method: string);
    constructor(url: string, method: string, headers: Map<string, string>);
    constructor(url: string, method: string, headers: Map<string, string>, queryParams: Map<string, string>);
    constructor(url: string, method: string, headers: Map<string, string>, queryParams: Map<string, string>, body: string);
    constructor(url: string, method: string, headers: Map<string, string>, queryParams: Map<string, string>, body: string, timeout: number);

    constructor(
        url: string,
        method: string = "GET",
        headers: Map<string, string> | null = null,
        queryParams: Map<string, string> | null = null, //assigning default value to null
        body: string | null = null,
        timeout: number = 3000
    ) {
        this.url = url,
        this.method = method,
        this.headers = headers ?? new Map(),
        this.queryParams = queryParams ?? new Map(),
        this.body = body ?? "",
        this.timeout = timeout
        console.log(`HttpRequest Created: URL=${url}, Method=${method}, Headers=${this.headers.size}, Params=${this.queryParams.size}, Body=${body !== null}, Timeout=${timeout}`);
    }
}


new HttpRequest("http://example.com");
new HttpRequest("http://example.com", "POST");
new HttpRequest("http://example.com", "POST", new Map([["Content-Type", "application/json"]]));
new HttpRequest("http://example.com", "POST", new Map([["Content-Type", "application/json"]]), new Map([["q", "search"]]));
new HttpRequest("http://example.com", "POST", new Map([["Content-Type", "application/json"]]), new Map([["q", "search"]]), '{"key":"value"}');
new HttpRequest("http://example.com", "POST", new Map([["Content-Type", "application/json"]]), new Map([["q", "search"]]), '{"key":"value"}', 5000);


//! What’s Wrong with This Approach?

/**
 * 1. Hard to Read and Write
 *      - Multiple parameters of the same type (e.g., String, Map) make it easy to accidentally swap arguments.
 *      - Code is difficult to understand at a glance especially when most parameters are null.
 * 2. Error-Prone
 *      - Clients must pass null for optional parameters they don’t want to set, increasing the risk of bugs.
 *      - Defensive programming inside constructors becomes necessary to avoid NullPointerExceptions.
 * 3. Inflexible and Fragile
 *      - If you want to set parameter 5 but not 3 and 4, you’re forced to pass null for 3 and 4.
 *      - You must follow the exact parameter order, which hurts readability and usability.
 * 4. Poor Scalability
 *      - Adding a new optional parameter requires adding or changing constructors, which may break existing code or force unnecessary updates to the client.
 *      - Testing and documentation become increasingly difficult to maintain.
 */


//? 2. What is the Builder Pattern

/** The Builder pattern separates the construction of a complex object from its representation.
 - The construction logic is encapsulated in a Builder.
 - The final object (the "Product") is created by calling a build() method.
 - The object itself typically has a private or package-private constructor, forcing construction through the builder.
*/


class HttpRequests {
    private readonly url: string;

    private readonly method: string;
    private readonly headers: Map<string, string>;
    private readonly queryParams: Map<string, string>;
    private readonly body: string;
    private readonly timeout: number;

    private constructor(builder: InstanceType< typeof HttpRequests.Builder>){
        this.url = builder.url;
        this.method = builder.method;
        this.headers = builder.headers;
        this.queryParams = builder.queryParams;
        this.body = builder.body;
        this.timeout = builder.timeout;
    }

    static Builder = class Builder{
        readonly url: string;
        method: string = "GET";
        headers: Map<string, string> = new Map();
        queryParams: Map<string, string> = new Map();
        body: string = "";
        timeout: number = 3000;


        constructor(url: string){
            this.url = url;
        }

        setMethod(method: string){
            this.method = method;
            return this;
        }

        addHeader(key: string, value: string){
            this.headers.set(key, value);
            return this;
        }

        addQueryParam(key: string, value: string){
            this.queryParams.set(key, value);
            return this;
        }

        setBody(body: string){
            this.body = body;
            return this;
        }

        setTimeout(timeout: number){
            this.timeout = timeout;
            return this;
        }

        build(): HttpRequests {
            return new HttpRequests(this);
        }
   }
}




const request1 = new HttpRequests.Builder("http://example.com")
                     .setMethod("GET")
                     .addHeader("accessToken", "Bearer xxxxxxxxxxx")
                     .addQueryParam("age", "25")




/** What We Achieved
 *      - No need for long constructors or null arguments.
 *      - Optional values are clearly named and easy to set.
 *      - The final object is immutable and fully initialized.
 *      - Readable and fluent client code.
 *      - Easily extendable. Want to add a new optional field? Just add a new method to the builder.
 */



//-------------------------------------------------------------------
//-------------------------------------------------------------------






// class Student {
//     constructor(name)
//     constructor(name, roll)
//     constructor(rollName, phone)
//     constructor(name, age, rollNo, address, phone) {

//     }
// }




// const student = new Student("Satendra", null, 123, null, 7004159119)
// const student1 = new Student("Satendra", 123)



/**
walls
roof
window
door

finishing - build()

*/

class Student1 {
    name: string
    age: number
    rollNo: string | null
    address: string | null
    phoneNo: string | null

    constructor(builder: StudentBuilder) {
        this.name = builder.name
        this.age = builder.age
        this.rollNo = builder.rollNo;
        this.address = builder.address;
        this.phoneNo = builder.phoneNo;
    }

    print() {
        console.log("name", this.name)
        console.log("age", this.age)
        console.log("rollNo", this.rollNo)
        console.log("address", this.address)
        console.log("phoneNo", this.phoneNo)
    }
}


class StudentBuilder {
    name!: string
    age!: number
    rollNo!: string | null
    address!: string | null
    phoneNo!: string | null

    /**
     this.name = null
     this.age = 12
     this.rollNo = null
     this.address = Delhi
     this.phoneNo = 123344
 
    */

    setAge(age: number) {
        this.age = age
        return this
    }

    setrollNo(rollNo: string) {
        this.rollNo = rollNo
        return this
    }

    setaddress(address: string) {
        this.address = address
        return this
    }

    setphoneNo(phoneNo: string) {
        this.phoneNo = phoneNo
        return this
    }

    

    build() {
        return new Student1(this)
    }
}


const studentBuilder = new StudentBuilder()

const student1 = studentBuilder.setAge(12)
                               .setphoneNo("123344")
                               .setaddress("Delhi")
                               .build()
                            
student1.print();