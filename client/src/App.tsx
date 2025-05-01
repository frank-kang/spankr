import './App.css';
import { Welcome } from './pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { Registration } from './pages/Registration';
import { SignInForm } from './pages/SignInForm';
import { UserProvider } from './components/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </UserProvider>
  );
}
