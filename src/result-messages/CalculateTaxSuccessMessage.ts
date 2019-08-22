import IResultMessage from "./IResultMessage";

class CalculateTaxSuccessMessage implements IResultMessage {
    public readonly type: string;
    public readonly json: string;

    constructor(json: string) {
        this.type = 'onCalculateTaxSuccess';
        this.json = json;
    }

    public toString(): string {
        return this.type;
    }
}

export default CalculateTaxSuccessMessage;
