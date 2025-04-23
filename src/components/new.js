import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const PaymentAndOrder = () => {
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [manualRequestSent, setManualRequestSent] = useState(false);
  const [showConfirmPaymentButton, setShowConfirmPaymentButton] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('T-shirt');

  const amount = 199;
  const upiId = "9868552523@pthdfc";
  const upiUrl = `upi://pay?pa=${upiId}&pn=Simran&am=${amount}&cu=INR`;

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const openGooglePay = () => {
    if (!name || !address || !product) {
      alert("Please fill the order form before proceeding to payment.");
      return;
    }
    window.location.href = upiUrl;
    setShowConfirmPaymentButton(true);
  };

  const sendManualConfirmationRequest = () => {
    setManualRequestSent(true);
    setPaymentStatus(true);
    sendWhatsAppOrder();
    setShowModal(true);
  };

  const sendWhatsAppOrder = () => {
    const message = `✅ *Payment Received!*\n\n👤 Name: ${name}\n🏠 Address: ${address}\n📦 Product: ${product}\n💸 Amount Paid: ₹${amount}`;
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseURL = isMobile
      ? `https://wa.me/919868552523?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=919868552523&text=${encodedMessage}`;

    window.open(baseURL, "_blank");
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem', textAlign: 'center' }}>
      <h2>🛒 Place Your Order</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        /><br /><br />
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="T-shirt">T-shirt</option>
          <option value="Shoes">Shoes</option>
          <option value="Cap">Cap</option>
        </select><br /><br />
      </form>

      <h2>Pay ₹{amount} via UPI</h2>
      <p>Scan the QR code below to pay:</p>
      <QRCodeCanvas value={upiUrl} size={200} /><br /><br />

      {/* Android users: Show GPay button */}
      {isAndroid && !showConfirmPaymentButton && (
        <button onClick={openGooglePay} style={buttonStyle("#34b7f1")}>
          Open Google Pay
        </button>
      )}

      {/* iOS users: Show scan message */}
      {isIOS && (
        <p style={{ fontStyle: "italic", color: "#555", marginBottom: "20px" }}>
          📱 iPhone user? Please scan this QR using your UPI app (PhonePe, Google Pay, Paytm, etc.)
        </p>
      )}

      {/* Laptop or non-mobile users: Display message */}
      {!isAndroid && !isIOS && (
        <p style={{ fontStyle: "italic", color: "#777", marginBottom: "20px" }}>
          💻 On laptop? Please scan the QR using any UPI app.
        </p>
      )}

      {/* For iOS or Laptop users: Show 'Confirm Payment' button after scanning QR */}
      {(!isAndroid && name && address && product && !paymentStatus && !manualRequestSent) && (
        <button
          onClick={() => setShowConfirmPaymentButton(true)}
          style={buttonStyle("#34b7f1")}
        >
          I Have Scanned the QR
        </button>
      )}

      {/* Show Confirm Payment Button after clicking "I Have Scanned the QR" */}
      {showConfirmPaymentButton && !paymentStatus && (
        <button
          onClick={sendManualConfirmationRequest}
          disabled={manualRequestSent}
          style={buttonStyle("#ff9800", manualRequestSent)}
        >
          Confirm Payment
        </button>
      )}

      {/* Modal on successful payment */}
      {showModal && (
        <div style={modalBackdrop}>
          <div style={modalContent}>
            <h3 style={{ color: "#28a745" }}>✅ Payment Successful!</h3>
            <p>₹{amount} received. Order sent via WhatsApp!</p>
            <button onClick={() => setShowModal(false)} style={buttonStyle("#28a745")}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Button styles
const buttonStyle = (bg, disabled = false) => ({
  padding: "12px 20px",
  backgroundColor: bg,
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: disabled ? "not-allowed" : "pointer",
  marginBottom: "10px",
});

// Modal styles
const modalBackdrop = {
  position: "fixed",
  top: "0", left: "0", right: "0", bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex", justifyContent: "center", alignItems: "center",
  zIndex: "1000",
};

const modalContent = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

export default PaymentAndOrder;