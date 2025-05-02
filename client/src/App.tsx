import './App.css';
import { Welcome } from './pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { Registration } from './pages/Registration';
import { SignInForm } from './pages/SignInForm';
import { UserProvider } from './components/UserContext';
import { EditPlayerProfile } from './pages/EditPlayerProfile';
import { PlayerProfile } from './pages/PlayerProfile';
import { SearchPage } from './pages/SearchPage';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route
          path="/player/editprofile/:userId"
          element={<EditPlayerProfile />}
        />
        <Route path="/player/profile/:userId" element={<PlayerProfile />} />
        <Route path="/player/search" element={<SearchPage />} />
      </Routes>
    </UserProvider>
  );
}
