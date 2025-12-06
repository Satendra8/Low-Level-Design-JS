/**

    Music Player
        play method will play all songs one by
        currently we are using array to store songs

    
    Requirment: Use Linked List at place of array
 */

/**

    absract Iterator
                hasNext()
                next()

    class ArrayIterator extends Iterator
                arrayList: number[] = []

                constructor(arr) {
                    this.arrList = arr
                }

                hasNext()
                next()


    class LinkedListIterator extends Iterator
                linkedList: Node = null
                
                constructor(head) {
                    this.linkedList = head
                }

                hasNext()
                next()



    
    abstact Iterable
            getIterator(): Iterator

    
    class ArrayIterable extends Iterable

            constructor(arr) {
                this.arr = arr
            }

            getIterator() {
                return new ArrayIterator(this.arr)
            }


    class LinkedListIterable extends Iterable

            constructor(head) {
                this.head = head
            }
            
            getIterator() {
                return new LinkedListIterator(this.head)
            }
 */









/*



class Song {
    name: string
    url: string

    constructor(name: string, url: string) {
        this.name = name
        this.url = url
    }
}


class MusicPlayer {
    songList: Song[] = [];
    addSong(song: Song){
        this.songList.push(song)
    }

    playAllSongs() {
        [1,2,3,4,5]
        for(const song of this.songList) {
            console.log("Playing Song", song.name, "...")
        }
    }
}


// 1 -> 2 -> 3 -> 4


class Nodes {
    data: number
    next: any

    constructor(data: number, next?: any) {
        this.data = data
        this.next = next
    }

    static traverseNode(head: Nodes) {
        if(head == null) {
            return
        }

        let temp = head

        while(temp != null) {

            console.log(temp.data);
            temp = temp.next
        }
    }
}


const node4 = new Nodes(4, null)
const node3 = new Nodes(3, node4)
const node2 = new Nodes(2, node3)
const node1 = new Nodes(1, node2)

Nodes.traverseNode(node1)

*/

class Nodes {
    data: string
    next: any

    constructor(data: string, next?: any) {
        this.data = data
        this.next = next
    }

    static traverseNode(head: Nodes) {
        if(head == null) {
            return
        }

        let temp = head

        while(temp != null) {

            console.log(temp.data);
            temp = temp.next
        }
    }
}



abstract class Iterators {
    abstract hasNext(): void;
    abstract nextt(): void;
}

class ArrayIterators extends Iterators {
    arrayList: string[] = []
    index: number = 0;

    constructor(arr: string[]) {
        super();
        this.arrayList = arr
    }

    hasNext() {
        return this.index < this.arrayList.length;
    }
    nextt() {

        if(this.hasNext()) {
            console.log(this.arrayList[this.index])
            this.index ++;
        } else {
            console.log("Array lenght exceeds..")
        } 
    }
}


class LinkedListIterators extends Iterators {
    head: any = null
            
    constructor(head: any) {
        super()
        this.head = head
    }

    hasNext() {
        return this.head != null
    }
    nextt() {
        if(this.hasNext()) {
            console.log(this.head.data)
            this.head = this.head.next
        } else {
            console.log("Linked List is empty...")
        }
    }
}



abstract class Iterables {
    abstract getIterator(): void
}


class ArrayIterables extends Iterables {
    arr: string[] = []
    constructor(arr: string[]) {
        super()
        this.arr = arr
    }

    getIterator() {
        return new ArrayIterators(this.arr)
    }
}

       


class LinkedListIterable extends Iterables {
    head: any = null

    constructor(head: any) {
        super()
        this.head = head
    }

    getIterator() {
        return new LinkedListIterators(this.head)
    }
}


/**
const node4 = new Nodes(4, null)
const node3 = new Nodes(3, node4)
const node2 = new Nodes(2, node3)
const head = new Nodes(1, node2)

const LLIterable = new LinkedListIterable(head)

const iter = LLIterable.getIterator()

iter.nextt() // 1
iter.nextt() // 2
iter.nextt() // 3
iter.nextt() // 4
*/


/*
const arrIterable = new ArrayIterables([10, 20, 30, 40, 50])

const iter = arrIterable.getIterator()

iter.nextt()
iter.nextt()
iter.nextt()
iter.nextt()
console.log(iter.hasNext())
iter.nextt()
console.log(iter.hasNext())
iter.nextt()
**/


class Song {
    name: string
    url: string

    constructor(name: string, url: string) {
        this.name = name
        this.url = url
    }
}

class MusicPlayer {
    songList: any;

    playAllSongs(iter: any) {
        
        while(iter.hasNext()) {
            iter.nextt()
        }
    }
}


// if LinkedList

/**

const node4 = new Nodes("4.mp3", null)
const node3 = new Nodes("3.mp3", node4)
const node2 = new Nodes("2.mp3", node3)
const head = new Nodes("1.mp3", node2)

const songIterable = new LinkedListIterable(head)
const iter = songIterable.getIterator()

const player = new MusicPlayer()

player.playAllSongs(iter)

*/


// Array

const songIterable = new ArrayIterables(["1.mp3", "2.mp3", "3.mp3", "4.mp3"])
const iter = songIterable.getIterator()

const player = new MusicPlayer()

player.playAllSongs(iter)