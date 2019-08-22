import IResultMessage from "./IResultMessage";

class ResponseMessage implements IResultMessage {
    public readonly type: string;
    public readonly eid: string;
    public readonly body: string;
    public readonly response: object;

    constructor(eid: string, body: string, response?: object) {
        this.type = 'onResponse';
        this.eid = eid;
        this.body = body;
        this.response = response;
    }

    public toString(): string {
        return `${this.eid} | ${this.type}`;
    }
}

export default ResponseMessage;
