import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { loggedUser } from "../../../redux/features/auth/authSlice"; // make sure import this

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </a>
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
