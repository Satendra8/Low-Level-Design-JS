// POLLING
/**

Youtube             user1 - 5 min interval
  video1
  video2
  video3
 
*/

/**
//! POLLING is bad Approach
class Youtube {
  channelName: string;
  videoList: Array<{ url: string; title: string; description: string }> = [];

  constructor(channelName: string) {
    this.channelName = channelName;
  }

  uploadVideo(url: string, title: string, description: string): void {
    this.videoList.push({
      "url" : url,
      "title" : title,
      "description" : description
    })
  }

  checkIfNewVideoUploaded() {
    return true
  }
}

class User{

  name: string
  age: number
  channel: Youtube

  constructor(name: string, age: number, channel: Youtube) {
    this.name = name;
    this.age = age;
    this.channel = channel
  }

  polling() {
    setInterval(()=>{
      console.log("Checking if new video uploaded")
      this.channel.checkIfNewVideoUploaded()
    }, 10000)
  }
}


const yt = new Youtube("MyChannel");
yt.uploadVideo("http://youtube.com/video1", "My First Video", "This is the description of my first video.");
yt.uploadVideo("http://youtube.com/video2", "My Second Video", "This is the description of my second video.");

const user1 = new User("S", 12, yt)
user1.polling()

*/


/**

Youtube                       user1
    video1                    user2
    video2                    user3
    video3                    user4

    Observable               Observer

*/


class Youtube {
  channelName: string;
  videoList: Array<{ url: string; title: string; description: string }> = [];
  subcribers: User[] = [];

  constructor(channelName: string) {
    this.channelName = channelName;
  }

  uploadVideo(url: string, title: string, description: string): void {
    this.videoList.push({
      "url" : url,
      "title" : title,
      "description" : description
    })

    // notify
    for (const user of this.subcribers) {
      console.log(`${user.name} New Video uploaded: ${title}, Please watch`);
    }
  }

  subscribe(user: User) {
    this.subcribers.push(user)
  }
}

class User{
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const yt = new Youtube("Travel Vlog")

const user1 = new User("Satendra", 25)
const user2 = new User("Tanu", 23)
const user3 = new User("ABC", 23)

yt.subscribe(user1)
yt.subscribe(user2)
yt.subscribe(user3)

yt.uploadVideo("https:youtube.com", "Nepal Tour", "Please watch....")


