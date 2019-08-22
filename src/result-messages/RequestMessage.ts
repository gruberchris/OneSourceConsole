import IResultMessage from "./IResultMessage";

class RequestMessage implements IResultMessage {
    public readonly type: string;
    public readonly eid: string;
    public readonly xml: string;

    constructor(eid: string, xml: string) {
        this.type = 'onRequest';
        this.eid = eid;
        this.xml = xml;
    }

    public toString(): string {
        return `${this.eid} | ${this.type}`;
    }
}

export default RequestMessage;
