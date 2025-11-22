/*

Paypal

getProduct - product

makePayment - Payment

Generate Invoice - Invoice

Send Notification - Notification

*/


class Product {
    getProduct() {
        console.log("fetching Product: Product A, Price: Rs. 10")
    }
}


class Payment {
    makePayment() {
        console.log("Payemnt done for Rs.", 10)
    }
}

class Invoice {
    generateInvoice() {
        console.log("Generate invoice, ProductName: Product A, Price: 10, Gst: 1.8, Total: Rs. 11.8")
    }
}

class Notifications {
    sendNotification() {
        console.log("Sending notification...")
    }
}

class BuyNowFacade {
    buyeNow() {
        const productA = new Product()
        const payment = new Payment()
        const invoice = new Invoice()
        const notification = new Notifications()

        productA.getProduct()
        payment.makePayment()
        invoice.generateInvoice()
        notification.sendNotification()
    }
}

class Client {
    static addToCart() {
        const addToCart = new BuyNowFacade()
        addToCart.buyeNow();
    }
}

Client.addToCart()