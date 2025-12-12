


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../service/api";
import "./footer.css";

export default function Footer() {
  const { pathname } = useLocation();
  const [footerData, setFooterData] = useState([]);

  const getFooterData = async () => {
    try {
      const { data } = await api.get("/footer");
      setFooterData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Footer ma'lumotini olishda xato:", err);
      setFooterData([]); // ❗ xatoda ham footer chiqishi uchun
    }
  };

  useEffect(() => {
    getFooterData();
  }, [pathname]); // sahifa o'zgarsa -> footer refresh bo'ladi

  // ❗ Qaysi sahifalarda footer ko'rinmaydi
  if (
    pathname.includes("/admin") ||
    pathname.includes("/login") ||
    pathname.includes("/product") ||
    pathname.includes("/cart") ||
    pathname.includes("/likes") ||
    pathname.includes("/info")
  ) {
    return null;
  }

  return (
    <footer className="footer">
      <div>
        <h1>📍 Bizning manzil</h1>
      </div>

      <div className="footer-content">
        <h1>📞 Biz bilan bog‘lanish uchun:</h1>

        {/* ❗ footerData bo‘sh bo‘lsa ham, ul chiqadi lekin ichida li bo‘lmaydi */}
        <ul>
          {footerData.length > 0 ? (
            footerData.map((item, index) => (
              <li key={index} className="footer-item">
                <p>Telefon: <span>{item.phone}</span></p>
                <p>
                  Telegram:{" "}
                  <a
                    href={`https://t.me/${item.telegram_email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.telegram_email}
                  </a>
                </p>
                <p>Ism: <span>{item.name}</span></p>
              </li>
            ))
          ) : (
            <p className="empty">Ma’lumot mavjud emas</p>  // ❗ bo‘sh bo‘lsa shu chiqadi
          )}
        </ul>
      </div>

      <div>
        <h1>
          ℹ️ Batafsil ma'lumot:{" "}
          <a href="/info">Ustiga bosing</a>
        </h1>
      </div>
    </footer>
  );
}
