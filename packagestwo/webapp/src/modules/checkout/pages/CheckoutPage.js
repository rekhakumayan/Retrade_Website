"use client";

import { useState } from "react";
import CheckoutSteps from "@/modules/checkout/components/CheckoutSteps";
import DeliveryDetails from "@/modules/checkout/components/DeliveryDetails";
import OrderSummary from "@/modules/checkout/components/OrderSummary";
import PaymentOption from "@/modules/checkout/components/PaymentOption";
import FinalReview from "@/modules/checkout/components/FinalReview";
import OrderConfirm from "@/modules/checkout/components/OrderConfirm";
// import AddAddressModal from "@/modules/checkout/components/AddAddressModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [showAddAddress, setShowAddAddress] = useState(false);

  const router = useRouter();

  const cartItems = [
    {
      id: 1,
      name: "Sony WH-1000XM5",
      price: 26991,
      quantity: 1,
    },
    {
      id: 2,
      name: "JBL Flip 6",
      price: 9499,
      quantity: 1,
    },
  ];

  const handleAddAddress = () => {
    setShowAddAddress(true);
  };

  
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const gst = +(subtotal * 0.12).toFixed(2);
  const deliveryCharge = 0;

  const totalPrice = +(subtotal + gst + deliveryCharge).toFixed(2);

  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.container}`}>

        
        <div className={styles.checkoutHeader}>
          <button
            className={styles.backArrowBtn}
            onClick={() => router.push("/cart")}
            aria-label="Go back"
          >
            <Image
              src="/assets/svg/arrow.svg"
              alt="Back"
              width={18}
              height={18}
            />
          </button>

          <h1 className={styles.cartTitle}>Checkout Flow</h1>
        </div>

        
        <CheckoutSteps currentStep={step} />


        <div className="row mt-4 g-4 align-items-start">

              <div className="col-lg-8 col-md-12">

            {step === 1 && (
              <DeliveryDetails
                onSelectPayment={() => setStep(2)}
                onAddAddress={handleAddAddress}
              />
            )}

            {step === 2 && (
              <PaymentOption
                onBack={() => setStep(1)}
                onConfirmOrder={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <FinalReview
                onBack={() => setStep(2)}
                totalPrice={totalPrice}
              />
            )}

            {step === 4 && (
              <OrderConfirm
                cartItems={cartItems}
                totalPrice={totalPrice}
              />
            )}

          </div>

          
          <div className="col-lg-4 col-md-12">
            <div className={styles.summaryWrapper}>
              <OrderSummary cartItems={cartItems} />
            </div>
          </div>

        </div>

        
        {showAddAddress && (
          <AddAddressModal
            show={showAddAddress}
            onClose={() => setShowAddAddress(false)}
          />
        )}

      </div>
    </div>
  );
};

export default CheckoutPage;