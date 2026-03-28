"use client";

import styles from "./styles/CheckoutSteps.module.css";
import Image from "next/image";

const CheckoutSteps = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: "Shipping", icon: "/assets/svg/location.svg" },
    { id: 2, label: "Payment", icon: "/assets/svg/payment.svg" },
    { id: 3, label: "Review", icon: "/assets/svg/review.svg" },
  ];

  return (
    <div className={styles.stepsWrapper}>
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div className={styles.stepContainer} key={step.id}>

            <div
              className={`${styles.stepBox} ${
                isActive || isCompleted ? styles.active : ""
              }`}
            >
              <Image
                src={isCompleted ? "/assets/svg/tick.svg" : step.icon}
                alt={step.label}
                width={20}
                height={20}
              />
            </div>

            
            <span
              className={`${styles.stepLabel} ${
                isActive || isCompleted ? styles.activeLabel : ""
              }`}
            >
              {step.label}
            </span>


            {index !== steps.length - 1 && (
              <div
                className={`${styles.connector} ${
                  isCompleted ? styles.connectorActive : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;