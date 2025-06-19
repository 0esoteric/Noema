import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return <Navigate to="/journal" replace />;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/journal");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8
                      transition-transform transform hover:scale-[1.02] duration-300 ease-in-out">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center tracking-wide">
          Create Your Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Choose a strong password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold
                       rounded-md shadow-md hover:bg-indigo-700
                       transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
