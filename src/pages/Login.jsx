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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FDFBF7] overflow-hidden">
      {/* Background Theme Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply" 
             style={{ 
               backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
               backgroundRepeat: 'repeat'
             }}>
        </div>

        {/* Heritage Background Image with Slow Pan Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1541662919830-4384a3641b9d?q=80&w=2000&auto=format&fit=crop" 
              alt="Heritage Construction" 
              className="w-full h-full object-cover opacity-[0.15] grayscale contrast-125 sepia-[0.3]"
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/50 via-[#FDFBF7]/30 to-[#FDFBF7]/80"></div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-white/90 shadow-2xl backdrop-blur-sm ring-1 ring-amber-900/10"
      >
        {/* Decorative Top Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700"></div>

        <div className="bg-[#1a1a1a] py-8 text-center relative overflow-hidden">
           {/* Header Pattern Overlay */}
           <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")`
             }}>
           </div>
           
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="font-heading text-3xl font-bold text-amber-50 tracking-wide">Kirti Construction</h1>
            </motion.div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center justify-center"
            >
              {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="mb-6">
            <label className="mb-2 block text-xs font-bold text-amber-900 uppercase tracking-wider">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 font-medium text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
              placeholder="Enter username"
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-8">
            <label className="mb-2 block text-xs font-bold text-amber-900 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 font-medium text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
              placeholder="Enter password"
            />
          </motion.div>
          
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group w-full relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-700 to-orange-700 py-4 font-bold text-white shadow-lg transition-all hover:from-amber-800 hover:to-orange-800 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Sign In to Dashboard
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.button>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Protected Area • Authorized Personnel Only
            </p>
          </motion.div>
        </form>
      </motion.div>
      
      {/* Bottom Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 text-center text-amber-900/40 text-xs font-medium tracking-widest"
      >
        &copy; {new Date().getFullYear()} KIRTI CONSTRUCTION
      </motion.div>
    </div>
  );
}
