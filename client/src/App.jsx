// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Journal from "./pages/Journal";
// import Tasks from "./pages/Tasks";
// import Insights from "./pages/Insights";
// import CompletedPage from "./pages/Completed";

// import Layout from "./components/layout/Layout";

// const App = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   return (
//     <Router>
//       <Routes>
//         {/* Login/Signup (outside layout) */}
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Layout (Layout + subpages) */}
//         <Route
//           path="/"
//           element={<Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
//         >
//           <Route path="journal" element={<Journal />} />
//           <Route path="tasks" element={<Tasks />} />
//           <Route path="completed" element={<CompletedPage />} />
//           <Route path="insights" element={<Insights />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Journal from "./pages/Journal";
import Tasks from "./pages/Tasks";
import Insights from "./pages/Insights";
import CompletedPage from "./pages/Completed";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import this

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Layout Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </ProtectedRoute>
          }
        >
          <Route path="journal" element={<Journal />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="completed" element={<CompletedPage />} />
          <Route path="insights" element={<Insights />} />
          <Route index element={<Navigate to="/journal" />} /> {/* default redirect */}
        </Route>

        {/* ✅ Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

