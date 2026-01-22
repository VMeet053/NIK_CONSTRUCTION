import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="bg-black py-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-white">Kirti Construction Admin</h1>
          <p className="text-sm text-gray-400">Restricted Access</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter username"
            />
          </div>
          
          <div className="mb-8">
            <label className="mb-2 block text-sm font-bold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-4 font-bold text-white transition-colors hover:bg-indigo-600"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
