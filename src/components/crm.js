import React, { useEffect, useState } from "react";

const CRM = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedRequests = JSON.parse(localStorage.getItem("payment_requests")) || [];
      setRequests(storedRequests);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAction = (id, status) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("payment_requests", JSON.stringify(updatedRequests));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 CRM - Payment Request Dashboard</h2>
      {requests.length === 0 ? (
        <p>No payment requests yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.productName}</td>
                <td>₹{req.amount}</td>
                <td>
                  {req.status === "accepted"
                    ? "✅ Accepted"
                    : req.status === "rejected"
                    ? "❌ Rejected"
                    : "Pending"}
                </td>
                <td>
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(req.id, "accepted")}
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "6px 10px",
                          marginRight: "5px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "rejected")}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          padding: "6px 10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CRM;