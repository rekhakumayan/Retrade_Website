const PAYMENT_METHODS = [
  {
    id: 'COD',
    label: 'Cash on Delivery (COD)',
    description: 'Standard payment on arrival',
    available: true,
  },
  {
    id: 'CARD',
    label: 'Card Payments',
    description: 'Secure gateway integration',
    available: false,
    tag: 'SOON',
  },
  {
    id: 'UPI',
    label: 'UPI / Wallets',
    description: 'Digital first checkout',
    available: false,
    tag: 'SOON',
  },
];

const isPaymentMethodAvailable = (paymentMethod) => {
  const method = PAYMENT_METHODS.find((m) => m.id === paymentMethod);
  return method && method.available;
};

module.exports = { PAYMENT_METHODS, isPaymentMethodAvailable };