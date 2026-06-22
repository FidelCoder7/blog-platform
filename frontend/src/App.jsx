import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <PostDetails />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;