import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom"; // Replaces useRouter

export function DashboardHeader({ heading, text, children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router version of useRouter

  function handleLogout() {
    dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/"); // Redirect after logout
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="gap-2 flex items-center justify-end">
        {children}
        <button
          className="bg-gray-300 rounded-sm px-2 py-1 hover:bg-gray-400 cursor-pointer"
          onClick={handleLogout}
        >
          Log-Out
        </button>
      </div>
    </div>
  );
}
