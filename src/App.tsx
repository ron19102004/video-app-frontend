import { Fragment } from "react/jsx-runtime";
import { RouterProvider } from "react-router-dom";
import router from "./roots/router";
import { AuthContext } from "./contexts/auth.context";
import { useContext, useEffect } from "react";

function App() {
  const { checkLoginStart } = useContext(AuthContext);
  useEffect(() => {
    checkLoginStart();
  }, []);
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
