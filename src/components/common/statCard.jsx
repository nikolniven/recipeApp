import React from "react";

// Define styles object better later on
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    margin: "20px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease-in-out",
    width: "250px", // Fixed width instead of 100%
    height: "250px", // Fixed height for square shape
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    },
  },
};

// Fix component structure and naming convention (use PascalCase)
const StatCard = ({ title, image, description, onClick }) => {
  return (
    <div className="card" onClick={onClick} style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
