import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { loggedUser } from "../../../redux/features/auth/authSlice"; // Import this correctly

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Array of 4 shop name inputs
  const [shops, setShops] = useState(["", "", "", ""]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { data, error, isLoading, isSuccess, isError }] =
    useRegisterMutation();

  // Effect to run on successful signup
  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("user", JSON.stringify(data.data.attributes.token));

      dispatch(
        loggedUser({
          token: data.data.attributes.token,
          user: data.data.attributes.user,
        })
      );

      message.success(data.message || "Signup successful");
      navigate("/");
    }
  }, [isSuccess, data, dispatch, navigate]);

  // Handle change for shop names
  const handleShopChange = (index, value) => {
    const newShops = [...shops];
    newShops[index] = value;
    setShops(newShops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate at least 3 shops filled (non-empty)
    const filledShops = shops.filter((shop) => shop.trim() !== "");
    if (filledShops.length < 3) {
      message.error("Please enter at least 3 shop names.");
      return;
    }

    // Trigger register mutation
    register({
      username,
      password,
      shops: filledShops,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span role="img" aria-label="thumbs-up" className="text-3xl">
              👍
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <p className="text-center text-gray-600 mb-6">
          Please Enter Your Details Below to Continue
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Shop Names */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Names (Enter at least 3)
            </label>
            {shops.map((shop, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-3 mb-2 border border-gray-300 rounded-md"
                placeholder={`Shop Name ${index + 1}`}
                value={shop}
                onChange={(e) => handleShopChange(index, e.target.value)}
                disabled={isLoading}
                required={index < 3} // first 3 are required, 4th optional
              />
            ))}
          </div>

          {/* Show error message */}
          {isError && (
            <p className="mb-4 text-red-600 text-center">
              {error?.data?.message || "Signup failed"}
            </p>
          )}

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
