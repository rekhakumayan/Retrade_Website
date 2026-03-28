const generateCSV = (data) => {

  const headers = [
    'Vendor Id',
    'Vendor Name',
    'Vendor Shop',
    'Email',
    'Price',
    'GST',
    'Coupon',
    'Delivery Charges',
    'Extra Charges',
    'Total Amount',
    'Commission Rate',
    'Earned Commission',
    'Orders',
    'Status'
  ];

  const rows = data.map((item) => [
    item.vendorId,
    item.vendorName,
    item.vendorShop,
    item.email,
    item.price,
    item.gst,
    item.coupon,
    item.deliveryCharges,
    item.extraCharges,
    item.totalAmount,
    item.commissionRate,
    item.earnedCommission,
    item.orders,
    item.status
  ]);

  // totals calculation
  const totals = data.reduce(
    (acc, item) => {
      acc.price += item.price || 0;
      acc.gst += item.gst || 0;
      acc.totalAmount += item.totalAmount || 0;
      acc.earnedCommission += item.earnedCommission || 0;
      acc.orders += item.orders || 0;
      return acc;
    },
    { price: 0, gst: 0, totalAmount: 0, earnedCommission: 0, orders: 0 }
  );

  // totals row
  rows.push([
    'TOTAL',
    '',
    '',
    '',
    totals.price.toFixed(2),
    totals.gst.toFixed(2),
    '',
    '',
    '',
    totals.totalAmount.toFixed(2),
    '',
    totals.earnedCommission.toFixed(2),
    totals.orders,
    ''
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csv;
};

module.exports = generateCSV;