
export class ErrorHandler extends Error{
    statusCode: number;
    errorCode: string | null;
    errorStatus: string | null

    constructor(message:string,statusCode: number, errorCode?: string, errorStatus?: string){
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode || null;
        this.errorStatus = errorStatus || null;
    }
}