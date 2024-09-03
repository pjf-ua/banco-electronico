import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Administrar from './components/Administrar';

import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();
  return user ? <Component {...rest} /> : <Login />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <SideBar />
          <div className="ml-64 p-6 w-full">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
              <Route path="/cuentas/:cuenta" element={<ProtectedRoute element={Administrar} />} />
              {/*}
              <Route path="/users" element={<ProtectedRoute element={UserList} />} />
              <Route path="/users/:userId" element={<ProtectedRoute element={UserAccounts} />} />
  */}
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
