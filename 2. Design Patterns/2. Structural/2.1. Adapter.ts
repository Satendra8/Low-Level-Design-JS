/**
 *  The Adapter Design Pattern is a structural design pattern that allows incompatible interfaces to work together by converting the interface of one class into another that the client expects.
 * 
 * It’s particularly useful in situations where:
 *   - You’re integrating with a legacy system or a third-party library that doesn’t match your current interface.
 *   - You want to reuse existing functionality without modifying its source code.
 *   - You need to bridge the gap between new and old code, or between systems built with different interface designs.
 */

// 1. The Problem: Incompatible Payment Interfaces

/**
    Imagine you’re building the checkout component of an e-commerce application.
    Your Checkout Service is designed to work with a Payment Interface for handling payments.
*/


interface PaymentProcessor {
    processPayment(amount: number, currency :string): void;
    isPaymentSuccessful(): boolean;
    getTransactionId(): string | null;
}


// Your team already has an internal payment processor that fits this interface perfectly:

class InHousePaymentProcessor implements PaymentProcessor {
    private transactionId: string | null = null;
    private isPaymentSuccessfull: boolean = false;

    processPayment(amount: number, currency: string): void {
        console.log("InHousePaymentProcessor: Processing payment of " + amount + " " + currency);
        this.transactionId = "TXN_" + Date.now();
        this.isPaymentSuccessfull = true;
        console.log("InHousePaymentProcessor: Payment successful. Txn ID: " + this.transactionId);
    }

    isPaymentSuccessful(): boolean {
        return this.isPaymentSuccessfull;
    }

    getTransactionId(): string | null {
        return this.transactionId;
    }
}


// Your CheckoutService uses this interface and works beautifully with the in-house payment processor:

class CheckoutService {
    private paymentProcessor: PaymentProcessor;

    constructor(paymentProcessor: PaymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }

    checkout(amount: number, currency: string): void {
        console.log("CheckoutService: Attempting to process order for $" + amount + " " + currency);
        this.paymentProcessor.processPayment(amount, currency);
        if(this.paymentProcessor.isPaymentSuccessful()) {
            console.log("CheckoutService: Order successful! Transaction ID: " + this.paymentProcessor.getTransactionId());
        } else {
            console.log("CheckoutService: Order failed. Payment was not successful.");
        }

    }
}


const processor: PaymentProcessor = new InHousePaymentProcessor();
const checkout: CheckoutService = new CheckoutService(processor);
checkout.checkout(199.99, "USD");


//! Everything works smoothly. You’ve decoupled your checkout business logic from the underlying payment implementation, allowing future flexibility. Great job so far.

//! Now, management drops a new requirement: integrate with a legacy third-party payment provider, widely used and battle-tested… but with a completely different interface.

class LegacyGateway {
    private transactionReferenceNumber!: number;
    private isPaymentSuccessful!: boolean;

    executeTransaction(totalAmount: number, currency: string): void {
        console.log("LegacyGateway: Executing transaction for " 
                  + currency + " " + totalAmount);
       this.transactionReferenceNumber = Date.now() * 1000000 + Math.floor(Math.random() * 1000000);
       this.isPaymentSuccessful = true;
       console.log("LegacyGateway: Transaction executed successfully. Txn ID: "  + this.transactionReferenceNumber);
    }

    checkStatus(): boolean {
        return this.isPaymentSuccessful;
    }

    getReferenceNumber(): number {
        return this.transactionReferenceNumber;
    }
}

/**

You now have two incompatible interfaces. Your existing CheckoutService expects a PaymentProcessor. But LegacyGateway does not implement it and it’s methods and signatures don't match:
    - processPayment(double) vs. executeTransaction(double, String)
    - isPaymentSuccessful() vs. checkStatus(long)
    - getTransactionId() vs. getReferenceNumber() (and their types are different too!)

And here’s the challenge:
    - You can’t change CheckoutService — it’s used system-wide and tied to the PaymentProcessor interface.
    - You can’t modify LegacyGateway — it’s from an external vendor.
    - But you must make them work together.


What you need is a translator — a class that sits between CheckoutService and LegacyGateway, adapting the incompatible interface into one that works with your system.

This is exactly what the Adapter Design Pattern does.

*/


//? 2. What is the Adapter Pattern

// The Adapter acts as a bridge between an incompatible interface and what the client actually expects.


// 3. Implementing Adapter


class LegacyGatewayAdapter implements PaymentProcessor {
    private readonly legacyGateway: LegacyGateway;
    private transactioId!: number;

    constructor(legacyGateway: LegacyGateway) {
        this.legacyGateway = legacyGateway;
    }

    // processPayment(amount: number, currency :string): void;
    // isPaymentSuccessful(): boolean;
    // getTransactionId(): string | null;
    processPayment(amount: number, currency: string): void {
        this.legacyGateway.executeTransaction(amount, currency);
        this.transactioId = this.legacyGateway.getReferenceNumber(); 
    }

    isPaymentSuccessful(): boolean {
        return this.legacyGateway.checkStatus();
    }

    getTransactionId(): string | null {
        return "LEGACY_TXN" + this.legacyGateway.getReferenceNumber();
    }
}


const legacyGateway = new LegacyGateway()

const legacyProcessor: PaymentProcessor = new LegacyGatewayAdapter(legacyGateway);

legacyProcessor.processPayment(50, "$")



// What Makes This Adapter Work?



/**
1. Composition Over Inheritance
    We use object composition, not inheritance. The adapter wraps the LegacyGateway instead of subclassing it. This keeps the adapter:

    - Loosely coupled
    - Easier to test
    - More flexible to change
    - It also follows effective Java best practices for working with third-party or legacy code.


2. Method Translation
    Each method in PaymentProcessor is translated into equivalent calls to the legacy API. This often includes:

    - Renaming or remapping method names
    - Reorganizing parameters
    - Converting return types — e.g., converting a long transaction reference into a formatted String ID

3. Encapsulation of Legacy Logic
    The adapter shields the rest of your codebase from the quirks or structure of the legacy class. From the outside, no one knows — or cares — that a legacy system is being used.

    This improves:
        - Encapsulation
        - Code readability
        - Maintainability
*/



//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------



interface Payement {
    pay(amount: number): void;
}


class DebitCardPayment implements Payement {
    pay(amount: number) {
        console.log("Payement done Successfully of ", amount)
    }
}


class Razorpay {
    receivePayemnt(amount: number) {
        console.log(`Payment done ${amount}, Thanks for choosing razorpay.`)
    }
}


class RazorpayAdapter implements Payement {
    pay(amount: number): void {
        const obj = new Razorpay();
        obj.receivePayemnt(amount);
    }
}



const debitPayment: Payement = new RazorpayAdapter()
debitPayment.pay(50)



/********************************************************************************************************************************/


// Adapter


interface Logger {
    logInfo(message: string): void;
    logError(message: string): void;
}



class CustomLogger implements Logger{
    logInfo(message: string) {
        console.info(message)
    }

    logError(message: string) {
        console.log(message)
    }
}


class WinStonLogger{
    winStonLogInfo(message: string) {
        console.info(message)
    }

    winStonLogError(message: string) {
        console.info(message)
    }
}


class WinStonAdaptor implements Logger {
    logInfo(message: string) {
        const obj = new WinStonLogger()
        obj.winStonLogInfo(message)
    }

    logError(message: string) {
        const obj = new WinStonLogger()
        obj.winStonLogInfo(message)
    }

}


class PinoLogger {
     pinoLogInfo(message: string) {
        console.info(message)
    }

    pinoLogError(message: string) {
        console.info(message)
    }

}



const winston = new WinStonAdaptor()

winston.logInfo("This is me")