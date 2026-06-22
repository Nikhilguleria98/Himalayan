import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, isLoading, user, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isDashboardPath = pathname.toLowerCase().startsWith("/dashboard");
  const isUserAreaPath = ["/user-dashboard", "/profile"].some((path) =>
    pathname.toLowerCase().startsWith(path)
  );
  const isAuthPath = ["/login", "/adminlogin", "/signup"].includes(
    pathname.toLowerCase()
  );

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated && isDashboardPath) {
      navigate("/Login", { replace: true });
      return;
    }

    if (!isAuthenticated && isUserAreaPath) {
      navigate("/Login", { replace: true });
      return;
    }

    if (isAuthenticated && isAuthPath) {
      if (user?.role === "admin") {
        navigate("/Dashboard/users", { replace: true });
      } else {
        navigate("/user-dashboard", { replace: true });
      }
      return;
    }

    if (isAuthenticated && pathname === "/") {
      if (user?.role === "admin") {
        navigate("/Dashboard/users", { replace: true });
      }
    }

    if (
      isAuthenticated &&
      user?.role !== "admin" &&
      isDashboardPath
    ) {
      navigate("/", { replace: true });
    }

    if (isAuthenticated && user?.role === "admin" && isUserAreaPath) {
      navigate("/Dashboard/users", { replace: true });
    }
  }, [isAuthenticated, isAuthPath, isDashboardPath, isLoading, isUserAreaPath, pathname, user, navigate]);

  if (
    !isLoading &&
    isDashboardPath &&
    (!isAuthenticated || user?.role !== "admin")
  ) {
    return null;
  }

  if (
    !isLoading &&
    isUserAreaPath &&
    (!isAuthenticated || user?.role === "admin")
  ) {
    return null;
  }

  return <>{children}</>;
}

export default CheckAuth;
