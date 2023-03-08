import { ethers } from "ethers";
import { PaymentOrder } from "./models/paymentOrder.model";
export declare class AppService {
    provider: ethers.providers.BaseProvider;
    contract: ethers.Contract;
    paymentOrders: PaymentOrder[];
    constructor();
    getContractAddress(): string;
    getTotalSupply(): Promise<number>;
    getAllowance(from: string, to: string): Promise<number>;
    getTransaction(hash: string): Promise<ethers.providers.TransactionResponse>;
    getPaymentOrders(): {
        value: number;
        id: number;
    }[];
    createPaymentOrder(value: number, secret: string): number;
    claimPayment(id: number, secret: string, address: string): void;
}
