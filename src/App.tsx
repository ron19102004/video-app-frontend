import { Fragment } from "react/jsx-runtime";
import { RouterProvider } from "react-router-dom";
import router from "./roots/router";
import { AuthContext } from "./contexts/auth.context";
import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  const { checkLoginStart } = useContext(AuthContext);
  useEffect(() => {
    checkLoginStart();

    const handleOnline = () => {};
    const handleOffline = () => {};

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <ChakraProvider>
      <Fragment>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          closeButton={false}
        />
        <RouterProvider router={router} />
      </Fragment>
    </ChakraProvider>
  );
}

export default App;
