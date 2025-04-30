import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../components/UserContext';

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
      navigate('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="registration">
      <h1>Registration</h1>
      <p>Welcome to the registration page!</p>
      <p>Please fill out the form below to register.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button disabled={isLoading} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
