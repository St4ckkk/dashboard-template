import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faGlobe,
  faLaptop,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';

const Login = ({
  logoSrc = null,
  brandName = 'Dashboard',
  accentColor = 'bg-brand',
  primaryBtnColor = 'bg-brand',
  showSocialLogin = true,
  showForgotPassword = true,
  showSignUp = true,
  signUpUrl = '/signup',
  redirectTo = '/dashboard',
  loginEndpoint = '/api/login',
  onLoginSuccess = null,
  customBackground = null,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // For demo/template purposes, we'll simulate a successful login
      setTimeout(() => {
        setLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess({ email: formData.email });
        }
        navigate(redirectTo);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      {/* Compact login card */}
      <div className="w-full max-w-md shadow-lg rounded-xl overflow-hidden">
        {/* Header with brand */}
        <div
          className={`${customBackground || 'bg-brand'} px-6 py-4 text-white`}
        >
          <div className="flex items-center gap-3">
            {logoSrc ? (
              <img src={logoSrc} alt={brandName} className="h-8 w-auto" />
            ) : (
              <div className="h-8 w-8 rounded-md bg-white/20"></div>
            )}
            <h2 className="text-xl font-bold">{brandName}</h2>
          </div>
        </div>

        {/* Login form */}
        <div className="bg-white px-6 py-5 sm:px-8 sm:py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600 mb-5">Sign in to continue</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400"
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-brand/20 focus:border-brand"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                {showForgotPassword && (
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-brand hover:text-brand/80"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-brand/20 focus:border-brand"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-xs text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`${primaryBtnColor} w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand`}
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                Sign In
              </button>
            </div>
          </form>

          {showSocialLogin && (
            <div className="mt-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500 text-xs">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-3">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="inline-flex justify-center items-center p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-10 h-10"
                >
                  <FontAwesomeIcon icon={faGlobe} />
                </button>
                <button
                  onClick={() => handleSocialLogin('apple')}
                  className="inline-flex justify-center items-center p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-10 h-10"
                >
                  <FontAwesomeIcon icon={faLaptop} />
                </button>
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="inline-flex justify-center items-center p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-10 h-10"
                >
                  <FontAwesomeIcon icon={faUserFriends} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with signup link */}
        {showSignUp && (
          <div className="bg-gray-50 px-6 py-3 sm:px-8">
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link
                to={signUpUrl}
                className="font-medium text-brand hover:text-brand/80"
              >
                Sign up
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
