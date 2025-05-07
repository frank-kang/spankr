import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../components/UserContext';
import tennisPicture from '../public/images/smallTennisBall.jpg';

export function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    try {
      const url = '/api/auth/sign-up';
      const req = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, req);
      if (!response.ok) throw new Error(`Response status ${response.status}`);
      const user = (await response.json()) as User;
      alert(`Successfully registered ${user.email}`);
      navigate(`/player/profile/${user.userId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="image-container w-[300px]">
        <img src={tennisPicture} alt="picture of tennis ball" />
      </div>
      <div className="registration">
        <h2 className="text-xl font-bold">Register</h2>
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
          <button
            disabled={isLoading}
            className="align-middle text-center border rounded py-1 px-3 bg-blue-600 text-white">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
