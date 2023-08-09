import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "@/utils/cookies";

export default function AuthLayout() {
  const router = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // if (getCookie("token")) {
    //   navigate("/tenants");
    // }
  }, [router.pathname]);

  return <Outlet />;
}
