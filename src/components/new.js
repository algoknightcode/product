import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const PaymentAndOrder = () => {
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualRequestSent, setManualRequestSent] = useState(false);
  const [showConfirmPaymentButton, setShowConfirmPaymentButton] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('T-shirt');

  const amount = 199;
  const upiId = "9868552523@pthdfc";
  const upiUrl = `upi://pay?pa=${upiId}&pn=Simran&am=${amount}&cu=INR`;

  const openGooglePay = () => {
    if (!name || !address || !product) {
      alert("Please fill the order form before proceeding to payment.");
      return;
    }
    window.location.href = upiUrl;
    setShowConfirmPaymentButton(true);
  };

  const sendManualConfirmationRequest = () => {
    setLoading(true);
    setManualRequestSent(true);

    setTimeout(() => {
      const adminConfirmed = window.confirm("Did you receive ₹199? Click OK to confirm.");
      if (adminConfirmed) {
        setPaymentStatus(true);
        sendWhatsAppOrder();
        setShowModal(true);
      } else {
        alert("Payment not confirmed.");
      }
      setLoading(false);
    }, 3000);
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
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required /><br /><br />
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="T-shirt">T-shirt</option>
          <option value="Shoes">Shoes</option>
          <option value="Cap">Cap</option>
        </select><br /><br />
      </form>

      <h2>Pay ₹{amount} via Google Pay</h2>
      <p>Scan QR or click the button below:</p>
      <QRCodeCanvas value={upiUrl} size={200} /><br /><br />

      {!showConfirmPaymentButton && (
        <button onClick={openGooglePay} style={buttonStyle("#34b7f1")}>
          Open Google Pay
        </button>
      )}

      {showConfirmPaymentButton && !paymentStatus && (
        <button
          onClick={sendManualConfirmationRequest}
          disabled={manualRequestSent}
          style={buttonStyle("#ff9800", manualRequestSent)}
        >
          Confirm Payment
        </button>
      )}

      {loading && <p><em>Waiting for admin confirmation...</em></p>}

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