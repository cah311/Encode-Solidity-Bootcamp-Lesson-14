import { Injectable } from "@nestjs/common";
import { ethers } from "ethers";
import * as tokenJson from "./assets/MyToken.json";
import { PaymentOrder } from "./models/paymentOrder.model";

const CONTRACT_ADDRESS = "0xE2EF249E4aBeC90c8c319A4BA5e3A0b515715c10";

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  contract: ethers.Contract;

  paymentOrders: PaymentOrder[];

  constructor() {
    this.provider = ethers.getDefaultProvider("goerli");
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      tokenJson.abi,
      this.provider
    );
    this.paymentOrders = [];
  }

  getContractAddress(): string {
    return CONTRACT_ADDRESS;
  }

  async getTotalSupply(): Promise<number> {
    const totalSupplyBN = await this.contract.totalSupply();
    const totalSupplyString = ethers.utils.formatEther(totalSupplyBN);
    const totalSupplynumber = parseFloat(totalSupplyString);
    return totalSupplynumber;
  }

  async getAllowance(from: string, to: string): Promise<number> {
    const allowanceBN = await this.contract.allowance(from, to);
    const allowanceString = ethers.utils.formatEther(allowanceBN);
    const allowanceNumber = parseFloat(allowanceString);
    return allowanceNumber;
  }

  async getTransaction(
    hash: string
  ): Promise<ethers.providers.TransactionResponse> {
    return this.provider.getTransaction(hash);
  }

  getPaymentOrders() {
    // need to map these
    return this.paymentOrders.map((po) => {
      return { value: po.value, id: po.id };
    });
  }

  createPaymentOrder(value: number, secret: string): number {
    const newPaymentOrder = new PaymentOrder();
    newPaymentOrder.value = value;
    newPaymentOrder.secret = secret;
    newPaymentOrder.id = this.paymentOrders.length;
    this.paymentOrders.push(newPaymentOrder);
    return newPaymentOrder.id;
  }

  claimPayment(id: number, secret: string, address: string) {
    //To Do
    // Check if secret matches
    // Pick your public key from env
    // Create a signer
    // Connect the signer to the contract
    // MInt value to the address
  }
}
