import { message } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { loggedUser } from "../../../redux/features/auth/authSlice";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Start with 3 empty shop fields initially
  const [shops, setShops] = useState(["", "", ""]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { data, error, isLoading, isSuccess, isError }] =
    useRegisterMutation();

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
      navigate("/auth");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const handleShopChange = (index, value) => {
    const newShops = [...shops];
    newShops[index] = value;
    setShops(newShops);
  };

  const addShopField = () => {
    setShops([...shops, ""]);
  };

  const removeShopField = (index) => {
    if (shops.length <= 3) {
      message.warning("You must have at least 3 shop names.");
      return;
    }
    const newShops = shops.filter((_, i) => i !== index);
    setShops(newShops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledShops = shops.filter((shop) => shop.trim() !== "");
    if (filledShops.length < 3) {
      message.error("Please enter at least 3 shop names.");
      return;
    }
    if (!/^(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
      message.error(
        "Password must be at least 8 characters and contain at least one special character (!@#$%^&*)."
      );
      return;
    }

    register({
      username,
      password,
      shops: filledShops,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Icon and Heading */}
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
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              pattern="^(?=.*[!@#$%^&*]).{8,}$"
              title="Password must be at least 8 characters and contain at least one special character (!@#$%^&*)."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {/* Shop Names */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Names (Enter at least 3)
            </label>

            {shops.map((shop, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="flex-grow p-3 border border-gray-300 rounded-md"
                  placeholder={`Shop Name ${index + 1}`}
                  value={shop}
                  onChange={(e) => handleShopChange(index, e.target.value)}
                  disabled={isLoading}
                  required={index < 3} // Require first 3 inputs
                />
                {/* Show remove button for fields beyond 3 */}
                {shops.length > 3 && (
                  <button
                    type="button"
                    className="ml-2 px-3 py-1 text-red-600 font-semibold hover:text-red-800"
                    onClick={() => removeShopField(index)}
                    disabled={isLoading}
                    aria-label={`Remove shop name ${index + 1}`}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}

            {/* Add new shop button */}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={addShopField}
              disabled={isLoading}
            >
              + Add Shop
            </button>
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
