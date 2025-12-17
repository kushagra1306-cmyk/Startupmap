import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/pages/public/LandingPage';
import { ExplorePage } from './components/pages/public/ExplorePage';
import { BusinessProfilePage } from './components/pages/public/BusinessProfilePage';
import { MyBusinesses } from './components/pages/dashboard/MyBusinesses';
import { ManageBusiness } from './components/pages/dashboard/ManageBusiness';
import { CollaborationRequests } from './components/pages/dashboard/CollaborationRequests';
import { Notifications } from './components/pages/dashboard/Notifications';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/business/:id" element={<BusinessProfilePage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/businesses" replace />} />
        <Route path="/dashboard/businesses" element={<MyBusinesses />} />
        <Route path="/dashboard/businesses/:id" element={<ManageBusiness />} />
        <Route path="/dashboard/collaboration-requests" element={<CollaborationRequests />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}
