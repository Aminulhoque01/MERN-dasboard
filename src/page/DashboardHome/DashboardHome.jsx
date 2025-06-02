import { Modal } from "antd";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserCenterPin = () => {
  const user = useSelector((state) => state.auth.user);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!user) return null;

  const showModal = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  return (
    <>
      {/* Centered fixed user icon & name */}
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

      {/* Modal to show shops */}
      <Modal
        title="Your Shops"
        visible={isModalVisible}
        onOk={handleClose}
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
              <li key={i} style={{ padding: "8px 0" }}>
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
