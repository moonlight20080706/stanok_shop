import { useState, useContext } from "react";
import { Context } from "../../context/useContext";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./login.css";

const Login = () => {
  const { setToken, setAdmin, superAdminExists, setSuperAdminExists } =
    useContext(Context);

  const [ad_name, setAd_name] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (superAdminExists === null) return <h2>Yuklanmoqda...</h2>;

  // --- SuperAdmin yaratish (faqat bir marta ishlaydi)
  const handleCreateSuper = async (e) => {
    e.preventDefault();
    if (!ad_name || !phone || !password) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }
    setLoading(true);
    try {
      const { data, status } = await api.post("/first-super-admin", {
        ad_name,
        phone,
        password,
        role: "super_admin",
      });
      if (status === 201 || status === 200) {
        toast.success("Super admin yaratildi");
        if (data?.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        }
        const adminObj = data.admin ?? data;
        if (adminObj) {
          setAdmin(adminObj);
          localStorage.setItem("admin", JSON.stringify(adminObj));
        }
        setSuperAdminExists(true);
        navigate("/");
        window.location.reload()
      }
    } catch (err) {
      console.error("createSuper error:", err);
      toast.error(err.response?.data?.message || "Xatolik");
    } finally {
      setLoading(false);
    }
  };

  // --- Oddiy login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!ad_name || !phone || !password) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }
    setLoading(true);
    try {
      const { data, status } = await api.post("/login", {
        ad_name,
        phone,
        password,
        role: "admin",
      });
      if (status === 200 && data?.token) {
        toast.success("Kirish muvaffaqiyatli");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        const adminObj = data.admin ?? data.user ?? data;
        setAdmin(adminObj);
        localStorage.setItem("admin", JSON.stringify(adminObj));
        navigate("/");
      } else {
        toast.error(data?.message || "Login muvaffaqiyatsiz");
      }
    } catch (err) {
      console.error("login error:", err);
      toast.error(err.response?.data?.message || "Xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {!superAdminExists ? (
          <>
            <h1>Super admin yaratish</h1>
            <form onSubmit={handleCreateSuper}>
              <input
                value={ad_name}
                onChange={(e) => setAd_name(e.target.value)}
                placeholder="Ism"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                type="password"
              />
              <button disabled={loading} type="submit">
                {loading ? "Yaratilmoqda..." : "Super admin yaratish"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>Admin kirish</h1>
            <form onSubmit={handleLogin}>
              <input
                value={ad_name}
                onChange={(e) => setAd_name(e.target.value)}
                placeholder="Ism"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                type="password"
              />
              <button disabled={loading} type="submit">
                {loading ? "Kirish..." : "Kirish"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
