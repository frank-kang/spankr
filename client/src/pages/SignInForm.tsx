import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, useUser } from '../components/useUser';
import tennisPicture from '../public/images/smallTennisBall.jpg';

type AuthData = {
  user: User;
  token: string;
};

/**
 * Form that signs in a user.
 */
export function SignInForm() {
  const { handleSignIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
      navigate(`/player/profile/${user.userId}`);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuestSignIn() {
    try {
      setIsLoading(true);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await fetch('/api/auth/guest-sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
      navigate(`/player/profile/${user.userId}`);
    } catch (err) {
      alert(`Error signing in as guest: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="image-container w-[300px]">
        <img src={tennisPicture} alt="picture of tennis ball" />
      </div>
      <div className="container">
        <h2 className="text-xl font-bold">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-1">
            <div className="w-full">
              <label className="mb-1 block">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
                />
              </label>
              <label className="mb-1 block">
                Password
                <input
                  required
                  name="password"
                  type="password"
                  className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
                />
              </label>
            </div>
          </div>
          <div className="flex content-between gap-8">
            <button
              disabled={isLoading}
              className="text-center border rounded py-1 px-3 bg-blue-600 text-white">
              Sign In
            </button>
            <button
              onClick={handleGuestSignIn}
              className="text-center border rounded py-1 px-3 bg-blue-600 text-white gap-4">
              As Guest
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
