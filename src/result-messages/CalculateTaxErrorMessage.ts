import IResultMessage from "./IResultMessage";

class CalculateTaxErrorMessage implements IResultMessage {
    public readonly type: string;
    public readonly errorMessage: string;

    constructor(errorMessage: string) {
        this.type = 'onCalculateTaxError';
        this.errorMessage = errorMessage;
    }

    public toString(): string {
        return this.type;
    }
}

export default CalculateTaxErrorMessage;
