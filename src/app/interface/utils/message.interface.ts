export class Message{
    constructor(text: string){
        this.text = text
    }
    text!: string
    error: boolean = false
}