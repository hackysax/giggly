import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import {
  Error,
  Register,
  Landing,
  AddGig,
  AllGigs,
  Profile,
  Shared,
  Stats,
  ProtectedRoute,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Shared />
            </ProtectedRoute>
          }
        >
          <Route index="stats" element={<Stats />} />
          <Route path="all-gigs" element={<AllGigs />} />
          <Route path="add-gigs" element={<AddGig />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
