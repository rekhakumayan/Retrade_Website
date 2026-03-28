export const getVendorId = () => {
  const vendorId = process.env.NEXT_PUBLIC_VENDOR_ID;

  if (!vendorId) {
    console.error("Vendor ID missing in .env");
  }

  return vendorId;
};