import { useState } from 'react';
import { loginAdmin, MOCK_ADMIN_CREDENTIALS } from '../mock-backend/admin-auth';

type Props = {
  onLoggedIn: () => void;
};

export default function AdminLogin({ onLoggedIn }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      setError(null);
      onLoggedIn();
      return;
    }
    setError('Invalid username or password');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 mb-6">
          Mock / dev-only admin — not production authentication
        </p>
        <h1 className="text-2xl font-semibold text-[#004B87] mb-1">Status Mock Admin</h1>
        <p className="text-gray-600 text-sm mb-6">
          Local prototype login. Credentials are stored in this page only for testing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B3E3]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B3E3]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#00B3E3] text-white rounded-lg hover:bg-[#008BB1] font-medium"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-500 border-t pt-4">
          Test credentials: <strong>{MOCK_ADMIN_CREDENTIALS.username}</strong> /{' '}
          <strong>{MOCK_ADMIN_CREDENTIALS.password}</strong>
        </p>
        <a
          href={import.meta.env.BASE_URL}
          className="mt-4 inline-block text-sm text-[#008BB1] hover:underline"
        >
          ← Back to store
        </a>
      </div>
    </div>
  );
}
