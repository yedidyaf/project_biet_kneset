// PayPalPaymentComponent.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPaymentComponent = ({ amount, onSuccess, onError, onClose }) => {
  const initialOptions = {
    "client-id": "AVcPikaPRy1p_qOW9AoTRJS_vF4sCENGdC3NhoPnnjzFuex_Fl8754QrfuIRBLTCfc-9mSD0ev6EjEcZ", // החלף זאת ב-Client ID שלך מ-PayPal Sandbox
    currency: "ILS",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="paypal-payment-form">
        <h2>תשלום מאובטח באמצעות PayPal</h2>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              onSuccess(details);
            });
          }}
          onError={(err) => {
            onError(err);
            console.error('PayPal error', err);
          }}
        />
        <button onClick={onClose}>סגור</button>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPaymentComponent;