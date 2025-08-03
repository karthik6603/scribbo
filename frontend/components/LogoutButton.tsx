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
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
