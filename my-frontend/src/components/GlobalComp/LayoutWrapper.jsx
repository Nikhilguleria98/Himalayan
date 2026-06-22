import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/auth-slice";
import CheckAuth from "./checkAuth";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(checkAuth(token));
    }
  }, [dispatch, token, user]);

  return (
    <CheckAuth isAuthenticated={isAuthenticated} isLoading={isLoading} user={user}>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CheckAuth>
  );
}
