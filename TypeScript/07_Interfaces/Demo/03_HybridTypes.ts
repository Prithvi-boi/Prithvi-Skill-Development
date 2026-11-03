
/* --------- Notification System ---------
Concept: Hybrid Types (Function + Object Properties)

Create an interface called Notification that behaves both as a function and an object.

Requirements:
- It should be callable with a message: string parameter and return void.
- It should have a type property of type string.
- It should have a sentCount property of type number.
- It should have a resetCount() method that resets sentCount to 0.
Task: Implement the interface and create a notification function that satisfies all these requirements.
*/

interface Notification {
    (message: string) : string
    text: string
    sentCount: number
    resetCount() : void
}

function createNotification(): Notification {
    const notification = ((message: string) => {
        notification.text = message
        notification.sentCount += 1
        return `message: ${notification.text}`
    }) as Notification

    notification.sentCount = 0

    notification.resetCount = () => {
        notification.sentCount = 0
    }

    return notification
}

const noti = createNotification()