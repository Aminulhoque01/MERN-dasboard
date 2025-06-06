import { message } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // react-icons eye icons
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { loggedUser } from "../../../redux/features/auth/authSlice"; // make sure import this

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { data, error, isLoading, isSuccess, isError }] =
    useLoginMutation();

  // Effect to run on successful login
  useEffect(() => {
    if (isSuccess && data) {
      // Save token to localStorage
      localStorage.setItem("user", JSON.stringify(data.data.attributes.token));

      // Dispatch redux state
      dispatch(
        loggedUser({
          token: data.data.attributes.token,
          user: data.data.attributes.user,
        })
      );

      message.success(data.message || "Login successful");

      // Navigate to home page
      navigate("/");
    }
  }, [isSuccess, data, dispatch, navigate]);

  // Handle form submit triggers login mutation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
      message.error(
        "Password must be at least 8 characters and contain at least one special character (!@#$%^&*)."
      );
      return;
    }
    // Trigger login mutation
    login({ username, password, loginType: "nameAndPassword" });
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
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please Enter Your Details Below to Continue
        </p>

        <form onSubmit={handleSubmit}>
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
            <Link to="/auth/signup">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                SignUp
              </a>
            </Link>
          </div>
          {isError && (
            <p className="mb-4 text-red-600 text-center">
              {error?.data?.message || "Login failed"}
            </p>
          )}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
