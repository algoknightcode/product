import React, { useState } from 'react';

const WhatsAppOrderForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState('T-shirt');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const message = `🛍️ *New Order!*\n\n👤 Name: ${name}\n🏠 Address: ${address}\n📦 Product: ${product}`;
    const encodedMessage = encodeURIComponent(message);
  
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseURL = isMobile
      ? `https://wa.me/919868552523?text=${encodedMessage}`   // for phones
      : `https://web.whatsapp.com/send?phone=919868552523&text=${encodedMessage}`; // for desktop
  
    window.open(baseURL, '_blank');
  };
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>🛒 Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />

        <label>Address:</label><br />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required /><br /><br />

        <label>Product:</label><br />
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="T-shirt">T-shirt</option>
          <option value="Shoes">Shoes</option>
          <option value="Cap">Cap</option>
        </select><br /><br />

        <button type="submit">Place Order via WhatsApp</button>
      </form>
    </div>
  );
};

export default WhatsAppOrderForm;