import { Payment } from './enums/payment.enum';
import { Shippers } from './enums/shippers.enum';

export class Order {
    user_id!: string;
    items!: any[];
    shipper!: Shippers;
    address!: string;
    payment!: Payment;
}