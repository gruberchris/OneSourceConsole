import IResultMessage from "./IResultMessage";

class ClientCreateErrorMessage implements IResultMessage {
    public readonly type: string;
    public readonly errorMessage: string;

    constructor(errorMessage: string) {
        this.type = 'onClientCreatedError';
        this.errorMessage = errorMessage;
    }

    public toString(): string {
        return this.type;
    }
}

export default ClientCreateErrorMessage;
