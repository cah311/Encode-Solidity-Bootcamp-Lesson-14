import { AppService } from "./app.service";
import { PaymentOrder } from "./models/paymentOrder.model";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getContractAddress(): string;
    getTotalSupply(): Promise<number>;
    getAllowance(from: string, to: string): Promise<number>;
    getTransaction(hash: string): Promise<import("@ethersproject/abstract-provider").TransactionResponse>;
    getPaymentOrders(): {
        value: number;
        id: number;
    }[];
    createPaymentOrder(body: PaymentOrder): number;
}
