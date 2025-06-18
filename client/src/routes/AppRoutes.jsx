import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Journal from '../pages/Journal';
import Tasks from "./pages/Tasks";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  </Router>
);

export default AppRoutes;
