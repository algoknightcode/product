import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const RollDice = () => {
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualRequestSent, setManualRequestSent] = useState(false);
  const [showConfirmPaymentButton, setShowConfirmPaymentButton] = useState(false);

  const upiId = "9868552523@pthdfc"; // Your UPI ID
  const amount = 199; // Payment amount in INR
  const upiUrl = `upi://pay?pa=${upiId}&pn=Simran&am=${amount}&cu=INR`;

  const openGooglePay = () => {
    window.location.href = upiUrl;
    setShowConfirmPaymentButton(true); // Show "Confirm Payment" after Google Pay is clicked
  };

  const sendManualConfirmationRequest = async () => {
    setLoading(true);
    setManualRequestSent(true);

    // Simulate contacting admin
    setTimeout(() => {
      const adminConfirmed = window.confirm("Did you receive ₹199? Click OK to confirm.");
      if (adminConfirmed) {
        setPaymentStatus(true);
        setShowModal(true);
      } else {
        alert("Payment not confirmed.");
      }
      setLoading(false);
    }, 3000);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Pay ₹{amount} via Google Pay</h2>

      <p>Scan the QR Code or click the button to open Google Pay:</p>
      
      {/* QR Code */}
      <div style={{ marginBottom: "20px" }}>
        <QRCodeCanvas value={upiUrl} size={200} />
      </div>

      {/* Google Pay Button */}
      {!showConfirmPaymentButton && (
        <div>
          <button
            onClick={openGooglePay}
            style={{
              padding: "12px 20px",
              backgroundColor: "#34b7f1",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Open Google Pay
          </button>
        </div>
      )}

      {/* Confirm Payment Button */}
      {showConfirmPaymentButton && !paymentStatus && (
        <button
          onClick={sendManualConfirmationRequest}
          disabled={manualRequestSent}
          style={{
            padding: "12px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: manualRequestSent ? "not-allowed" : "pointer",
            marginBottom: "10px",
          }}
        >
          Confirm Payment
        </button>
      )}

      {loading && <p style={{ fontStyle: "italic" }}>Waiting for admin confirmation...</p>}

      {/* Modal on Successful Payment */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ color: "#28a745" }}>✅ Payment Successful!</h3>
            <p>Your payment of ₹{amount} has been received.</p>

            <button
              onClick={() => setShowModal(false)}
              style={{
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "white",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RollDice;