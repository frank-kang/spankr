import './App.css';
import { Welcome } from './pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { Registration } from './pages/Registration';
import { SignInForm } from './pages/SignInForm';
import { UserProvider } from './components/UserContext';
import { EditPlayProfile } from './pages/EditPlayProfile';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/player/editprofile" element={<EditPlayProfile />} />
      </Routes>
    </UserProvider>
  );
}
