import IResultMessage from "./IResultMessage";

class SoapErrorMessage implements IResultMessage {
    public readonly type: string;
    public readonly eid: string;
    public readonly errorMessage: string;

    constructor(eid: string, errorMessage: string) {
        this.type = 'onSoapError';
        this.eid = eid;
        this.errorMessage = errorMessage;
    }

    public toString(): string {
        return `${this.eid} | ${this.type}`;
    }
}

export default SoapErrorMessage;
