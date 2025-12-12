import { useEffect, useState } from "react";
import { api, BASE_URL_IMG } from "../../service/api";
import toast from "react-hot-toast";
import "./info.css";

const Info = () => {
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInfos = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get("/info");
      if (status === 200) {
        setInfos(data);
      }
    } catch (err) {
      console.error("Info olishda xato:", err);
      toast.error("Info olishda xato");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>Yuklanmoqda...</p>
    );
  if (infos.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Ma’lumot mavjud emas
      </p>
    );

  return (
    <>
      <h1 className="info-h1">Biz haqimmizda ma'lumot</h1>
      <section className="info-list">
        {infos.length > 0 ? (
          <div className="all-info-card">
            {infos.map((i) => {
              console.log(i.id);

              if (i.id % 2 !== 0) {
                return (
                  <div key={i.id} className="info-item-left">
                    {i.img && (
                      <img
                        src={BASE_URL_IMG + i.img}
                        alt={i.desc}
                        className="info-img"
                      />
                    )}

                    <p className="info-desc">{i.desc}</p>
                  </div>
                );
              } else {
                return (
                  <div key={i.id} className="info-item-right">
                    {" "}
                    {/* <-- key qo‘shildi */}
                    <p className="info-desc">{i.desc}</p>
                    {i.img && (
                      <img
                        src={BASE_URL_IMG + i.img}
                        alt={i.desc}
                        className="info-img"
                      />
                    )}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <h1>Ma’lumot mavjud emas</h1>
        )}
      </section>
    </>
  );
};

export default Info;

