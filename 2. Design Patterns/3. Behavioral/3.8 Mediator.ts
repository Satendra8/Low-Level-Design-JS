/** Mediator
 * 
 * 
 * 
 */


/**
interface User {
    sendAll(message: string): void
    send(user: User, message: string): void;
    receive(message: string): void;
}

class UserA implements User {
    name: string;
    userList: User[] = []

    constructor(name: string) {
        this.name = name;
    }

    addUser(user: User) {
        this.userList.push(user)
    }

    sendAll(message: string) {
        for(const user of this.userList) {
            user.receive(message)
        }
    }

    send(user: User, message: string) {
        user.receive(message)
    }

    receive(message: string) {
        console.log(this.name," Message Received: ", message)
    }
}

class UserB implements User {
    name: string;
    userList: User[] = []

    constructor(name: string) {
        this.name = name;
    }

    addUser(user: User) {
        this.userList.push(user)
    }

    sendAll(message: string) {
        for(const user of this.userList) {
            user.receive(message)
        }
    }

    send(user: User, message: string) {
        user.receive(message)
    }

    receive(message: string) {
        console.log(this.name," Message Received: ", message)

    }
}

class UserC implements User {
    name: string;
    userList: User[] = []

    constructor(name: string) {
        this.name = name;
    }

    addUser(user: User) {
        this.userList.push(user)
    }

    sendAll(message: string) {
        for(const user of this.userList) {
            user.receive(message)
        }
    }

    send(user: User, message: string) {
        user.receive(message)
    }

    receive(message: string) {
        console.log(this.name," Message Received: ", message)
    }
}


const user1 = new UserA("satendra")
const user2 = new UserB("tanu")
const user3 = new UserB("sidhi")

user1.addUser(user2)
user1.addUser(user3)

user1.send(user2, "hi")
user1.send(user3, "hello")

// Problem 1: every user has reference of users
// Problem 2: Tight coupling

*/


//? Mediator Design Pattern


interface User {
    receive(message: string): void;
}


class Mediator {
    userList: User[] = [];

    addUser(user: User) {
        this.userList.push(user)
    }

    sendAll(message: string) {
        for(const user of this.userList) {
            user.receive(message)
        }
    }
}


class UserA implements User {
    name: string;
    mediator: Mediator;

    constructor(name: string, mediator: Mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    receive(message: string) {
        console.log(this.name," Message Received: ", message)
    }
}


class UserB implements User {
        name: string;
    mediator: Mediator;

    constructor(name: string, mediator: Mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    receive(message: string) {
        console.log(this.name," Message Received: ", message)
    }
}

class UserC implements User {
        name: string;
    mediator: Mediator;

    constructor(name: string, mediator: Mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    receive(message: string) {
        console.log(this.name," Message Received: ", message)
    }
}


const mediator = new Mediator()
const user1 = new UserA("satendra1", mediator)
const user2 = new UserA("satendra2", mediator)
const user3 = new UserA("satendra3", mediator)

mediator.addUser(user1)
mediator.addUser(user2)
mediator.addUser(user3)

mediator.sendAll("Hello All...")



/** Observer Vs  Mediator*/

// Observer - notify to multiple users, but users cannot communicate to each other

// Mediator - user can communicate to each other



