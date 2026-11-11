import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin, logoutAdmin } from '../../firebase/services/authService';
import { isAdmin } from '../../utils/isAdmin';



const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const user = await loginAdmin(email.trim(), password);

    
      const tokenResult = await user.getIdTokenResult(true);

      if (!isAdmin(user)) {
        await logoutAdmin();

        setError(
          'This account does not have administrator privileges.'
        );

        return;
      }

      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error('Admin login error:', err);
     console.log('Firebase error message:', err.message);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-extrabold text-[#102B46]"
          >
            QUICKVIEW<span className="text-[#F4B928]">.</span>
          </Link>

          <h1 className="text-2xl font-bold text-[#17212B] mt-8">
            Admin Login
          </h1>

          <p className="text-[#64748B] mt-2">
            Sign in to manage your company projects.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-7 sm:p-9"
        >
          {error && (
            <div
              role="alert"
              className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-5"
            >
              {error}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#17212B] mb-2"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 outline-none focus:border-[#102B46] focus:ring-2 focus:ring-[#102B46]/10"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#17212B] mb-2"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 pr-20 outline-none focus:border-[#102B46] focus:ring-2 focus:ring-[#102B46]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B] hover:text-[#102B46]"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#102B46] text-white font-semibold py-3 rounded-lg hover:bg-[#193d60] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-[#64748B] mt-6">
          <Link to="/" className="hover:text-[#102B46]">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  );
};

export default AdminLogin;
