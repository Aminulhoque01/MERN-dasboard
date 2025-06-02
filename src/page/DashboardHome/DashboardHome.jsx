import { Modal } from "antd";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserCenterPin = () => {
  const user = useSelector((state) => state.auth.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const showModal = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  // Navigate to shop detail and close modal
  const handleShopClick = (shopName) => {
    setIsModalVisible(false);
    // Encode shopName for URL safety if needed
    const encodedShop = encodeURIComponent(shopName);
    navigate(`/shop/${encodedShop}`);
  };

  return (
    <>
      <div
        onClick={showModal}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#00AFF5",
          padding: "12px 20px",
          borderRadius: "30px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 9999,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          color: "white",
          userSelect: "none",
          fontWeight: "600",
        }}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
        ) : (
          <FaUserCircle style={{ width: 32, height: 32 }} />
        )}
        <span>{user.username || "User"}</span>
      </div>

      <Modal
        title="Your Shops"
        visible={isModalVisible}
        onCancel={handleClose}
        footer={[
          <button key="close" onClick={handleClose}>
            Close
          </button>,
        ]}
      >
        <ul>
          {user.shops?.length > 0 ? (
            user.shops.map((shop, i) => (
              <li
                key={i}
                style={{
                  padding: "8px 0",
                  cursor: "pointer",
                  color: "#1890ff",
                  textDecoration: "underline",
                }}
                onClick={() => handleShopClick(shop)}
              >
                {shop}
              </li>
            ))
          ) : (
            <p>No shops found</p>
          )}
        </ul>
      </Modal>
    </>
  );
};

export default UserCenterPin;
