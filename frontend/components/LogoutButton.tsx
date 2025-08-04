// components/LogoutButton.tsx
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl border border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-150 hover:from-red-600 hover:to-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
