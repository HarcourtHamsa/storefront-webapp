'use client'

import Button from '@/components/button/button';
import { usePaystackPayment } from 'react-paystack'; // Assuming usePaystackPayment is imported from another file


const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log('ref');
};
const onClose = () => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log('error');
};


const PaystackButton = ({ email, amount, label }: { email: string, amount: string, label?: string }) => {
    const initiatePayment = usePaystackPayment({
        reference: new Date().getTime().toString(),
        email: "hamsaharcourt@gmail.com",
        amount: parseInt(amount) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
    });

    return (
        <Button
            onClick={() => initiatePayment({ onSuccess })}
            label={label || "Pay with Paystack"}
            isLoading={false}
        />
    );
};

export default PaystackButton;
