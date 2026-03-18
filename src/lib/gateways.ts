export interface Gateway {
  id: string;
  name: string;
  percentageFee: number;
  fixedFee: number;
  currency: string;
  decimalPlaces: number;
  currencySymbol: string;
}

export const GATEWAYS: Gateway[] = [
  {
    id: "stripe",
    name: "Stripe",
    percentageFee: 2.9,
    fixedFee: 0.3,
    currency: "USD",
    decimalPlaces: 2,
    currencySymbol: "$",
  },
  {
    id: "paypal",
    name: "PayPal",
    percentageFee: 3.49,
    fixedFee: 0.49,
    currency: "USD",
    decimalPlaces: 2,
    currencySymbol: "$",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    percentageFee: 2,
    fixedFee: 0,
    currency: "INR",
    decimalPlaces: 2,
    currencySymbol: "₹",
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    percentageFee: 1.5,
    fixedFee: 0,
    currency: "PKR",
    decimalPlaces: 0,
    currencySymbol: "Rs.",
  },
  {
    id: "easypaisa",
    name: "Easypaisa",
    percentageFee: 1.8,
    fixedFee: 0,
    currency: "PKR",
    decimalPlaces: 0,
    currencySymbol: "Rs.",
  },
  {
    id: "2checkout",
    name: "2Checkout",
    percentageFee: 3.5,
    fixedFee: 0.35,
    currency: "USD",
    decimalPlaces: 2,
    currencySymbol: "$",
  },
];
