import { Home } from "./pages/Home";
import SinglePage from "./pages/SinglePage";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <SinglePage />,
  },
  {
    path: "/home/:pageNumber",
    element: <Home />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
