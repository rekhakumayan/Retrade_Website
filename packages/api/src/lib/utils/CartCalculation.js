const GST_RATE = parseInt(process.env.GST_RATE) / 100;

const calculateItemTotal = (product, quantity) => {
  const finalPrice =
    product.price.final != null && !isNaN(product.price.final)
      ? product.price.final
      : product.price.original -
        (product.price.original * (product.price.discount || 0)) / 100;

  return parseFloat((finalPrice * quantity).toFixed(2));
};

const calculateCartSummary = (items) => {
  const subtotal = parseFloat(
    items.reduce((sum, item) => sum + item.itemTotal, 0).toFixed(2)
  );
  const gst = parseFloat((subtotal * GST_RATE).toFixed(2));
  const total = parseFloat((subtotal + gst).toFixed(2));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    gst,
    deliveryText: 'FREE',
    total,
    itemCount,
  };
};

module.exports = { calculateItemTotal, calculateCartSummary };