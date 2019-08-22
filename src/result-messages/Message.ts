import IResultMessage from "./IResultMessage";

class Message implements IResultMessage {
    public readonly type: string;
    public readonly eid: string;
    public readonly message: string;

    constructor(eid: string, message: string) {
        this.type = 'onMessage';
        this.eid = eid;
        this.message = message;
    }

    public toString(): string {
        return `${this.eid} | ${this.type}`;
    }
}

export default Message;
