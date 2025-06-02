// /* eslint-disable react/prop-types */

// import { FiMenu } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../../redux/features/auth/authApi";
// // import { useSelector } from "react-redux";
// // import { imageBaseUrl } from "../../../config/imageBaseUrl";

// const Header = ({ toggleSidebar }) => {
//   const navigate = useNavigate();
//   // const { user } = useSelector((state) => state.auth);
//   const { loginuser } = useLoginMutation();

//   return (
//     <div className="w-full px-5 py-3.5 bg-[#00AFF5] flex justify-between items-center  sticky top-0 left-0 z-10">
//       <div className="flex items-center gap-3">
//         {/* Hamburger menu for mobile */}
//         <button className="md:hidden text-3xl" onClick={toggleSidebar}>
//           <FiMenu />
//         </button>
//       </div>

//       <div className="flex justify-between items-center gap-8"></div>
//     </div>
//   );
// };

// export default Header;

/* eslint-disable react/prop-types */

import { FaUserCircle } from "react-icons/fa"; // for placeholder user icon
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Get user info from Redux store (auth slice)
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-full px-5 py-3.5 bg-[#00AFF5] flex justify-between items-center sticky top-0 left-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button className="md:hidden text-3xl" onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>

      <div className="flex justify-between items-center gap-8">
        {/* Conditionally show user icon if user is logged in */}
        {user ? (
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 cursor-pointer"
          >
            {/* If you have user.avatar, use it here instead of icon */}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-white w-8 h-8" />
            )}
            <span className="text-white font-semibold">
              {user.username || "User"}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
