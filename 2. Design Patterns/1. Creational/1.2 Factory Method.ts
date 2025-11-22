/**
 The Factory Method Design Pattern is a creational pattern that provides an interface for creating objects in a superclass,
 but allows subclasses to alter the type of objects that will be created.

 It’s particularly useful in situations where:
    - The exact type of object to be created isn't known until runtime.
    - Object creation logic is complex, repetitive, or needs encapsulation.
    - You want to follow the Open/Closed Principle, open for extension, closed for modification.


 When you have multiple objects of similar type, you might start with basic conditional logic (like if-else or switch statements) to decide which object to create.

 But as your application grows, this approach becomes rigid, harder to test, and tightly couples your code to specific classes, violating key design principles.

 Factory method lets you create different objects without tightly coupling your code to specific classes.

*/

O, [], ^







// 1. The Problem: Sending Notifications

class EmailNotifications {
    send(message: string): void{
        console.log("Sending email.....")
    }
}

// class NotificationService {
//     sendNotification(message: string): void {
//         const email = new EmailNotification();
//         email.send(message)
//     }
// }


// What if we need to support SMS notifications

class SMSNotifications {
    send(message: string): void{
        console.log("Sending sms.....")
    }
}

class NotificationServices {
    sendNotification(message: string, type: string): void {
        if(type == "EMAIL") {
            const email = new EmailNotification();
            email.send(message)
        } else if (type == "SMS") {
            const sms = new SMSNotification();
            sms.send(message)
        }
        // what if we want to send Push, Slack, WhatsApp notification, then this becomes a nightmare to maintain

        /**
         - Every time you add a new notification channel, you must modify the same core logic.
         - Testing becomes cumbersome because the logic is intertwined with object creation.
         - It violates key design principles, especially the Open/Closed Principle—the idea that classes should be open for extension but closed for modification.
        */
    }
}


// 2. Clean it up with Simple Factory


/**
 Here’s the idea:
    - You create a separate class (a “factory”) whose only job is to centralize and encapsulate object creation.
    - The notification service no longer needs to know which concrete class to instantiate. It simply asks the factory for the right type of notification.
*/


class SimpleNotificationFactory {
    static createNotification(type: string){
        switch(type) {
            case "EMAIL":
                return new EmailNotification();
            case "SMS":
                return new SMSNotification();
            default:
                throw new Error("Unknown type")
        }
    }
}


// now NotificationService is cleaner

class NotificationService {
    sendNotification(type: string, message: string): void {
        const notification = SimpleNotificationFactory.createNotification(type);
        notification.send(message);
    }
}


/**
 With this approach:
    - Adding new notification types becomes easier. You just modify the factory, not the service using it.
    - Testing and maintenance get simpler.
    - But as your product grows and you keep adding new notification types, something starts to feel off again.
    - We are still hard coding, Our system is better, but it's still not open to extension without modification.
    - that’s exactly the type of problems Factory Method Design Pattern solves.
*/



// 3. What is Factory Method


/**
 *  Each subclass defines its own way of instantiating an object.
 *  The base class defines a common interface for creating that object, but doesn’t know what the object is.
 *  The base class also often defines common behavior, using the created object in some way.
 *  Instead of putting the burden of decision-making in a single place, we distribute object creation responsibilities across the system in a clean, organized way.
 * 
 */


interface Notifications {
    send(message: string): void;
}

class EmailNotification implements Notifications {
    send(message: string): void {
        console.log(`Sending email: ${message}`);
    }
}


class SMSNotification implements Notifications {
    send(message: string): void {
        console.log(`Sending sms: ${message}`);
    }
}

class PushNotification implements Notifications {
    send(message: string): void {
        console.log(`Sending push notification: ${message}`);
    }
}

// We create an abstract class that declares the factory method 


abstract class NotificationCreator {
    abstract createNotification(): Notifications;

    send(message: string): void{
        const notification = this.createNotification();
        notification.send(message)
    }

    /**
        Think of this class as a template:
            - It doesn't know what notification it's sending but it knows how to send it.
            - It defers the choice of notification type to its subclasses.
    */
}



// Define Concrete Creators

class EmailNotificationCreator extends NotificationCreator {
    createNotification(): Notifications {
        return new EmailNotification();
    }
}

class SMSNotificationCreator extends NotificationCreator {
    createNotification(): Notifications {
        return new SMSNotification();
    }
}

class PushNotificationCreator extends NotificationCreator {
    createNotification(): Notifications {
        return new PushNotification();
    }
}


// Use it in the Client Code


let creator: NotificationCreator;

// Send Email
creator = new EmailNotificationCreator();
creator.send("Welcome to our platform!");

// Send SMS
creator = new SMSNotificationCreator();
creator.send("Your OTP is 123456");

// Send Push Notification
creator  = new PushNotificationCreator();
creator.send("You have a new follower!")

/**
 * Creates the appropriate creator 
 * Calls the shared send() method
 * Internally delegates to the right Notification type
 */


// Easy Addition

class SlackNotification implements Notifications {
   send(message: string): void {
      console.log(`Sending slack notification: ${message}`);
   }
}

class SlackNotificationCreator extends NotificationCreator {
   createNotification(): Notifications {
      return new SlackNotification();
   }
}

// Done. No modification to existing code. No regression risk. No coupling.


            preference

User1 - EmailNotification
User2 - SMSNotification
User3 - WhatsApp



Notification Service - send()


    EmailService
    SMSService
    WhatsAPP
    Slack



NotificationFactory {

    public static getNotificationObject(preferenec) {



        if (preference == Email){
            return new EmailNotification();
        }
        
    }

}



const notify = NotificationFactory.getNotificationObject(preferenc)
notify.send()



//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------


abstract class Shape {
    abstract draw(): void;
}

class Circle extends Shape {
    draw() {
        console.log("drawing Circle")
    }
}

class Square extends Shape {
    draw() {
        console.log("drawing Square")
    }
}

class Triangle extends Shape {
    draw() {
        console.log("drawing Triangle")
    }
}

class ShapeFactory {

    static getShape(type: string) {
         switch(type){
            case "Triangle":
                return new Triangle();
            case "Circle":
                console.log("circle")
                return new Circle();
            case "Square":
                return new Square();
            default:
                throw Error("Shape doesn't exist")
        }
    }
}


const type = "Triangle";
const circle = ShapeFactory.getShape(type);
circle.draw()