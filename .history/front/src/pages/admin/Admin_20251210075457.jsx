import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/useContext";
import { api, BASE_URL_IMG } from "../../service/api";
import Card from "../card/Card";
import CategoryCard from "../card/Category";
import SwipperCard from "../card/Swipper";
import Swal from "sweetalert2";
import "./admin.css";
import { FaX } from "react-icons/fa6";

const Admin = () => {
  // ========================= STATES =========================
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Mahsulot
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_id, setCategory_id] = useState("");

  // Kategoriya
  const [cat_name, setCat_name] = useState("");

  // Swipper
  const [swipperImg, setSwipperImg] = useState(null);
  const [swipperPreview, setSwipperPreview] = useState("");
  const [swipperDesc, setSwipperDesc] = useState("");
  const [swippers, setSwippers] = useState([]);

  // Boshqalar
  const [categoryName, setCategoryName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [showSwipper, setShowSwipper] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [phone, setPhone] = useState("");
  const [telegram_email, setTelegramEmail] = useState("");
  const [name, setName] = useState("");
  const [footerInfo, setFooterInfo] = useState([]);

  // INFO
  const [showInfo, setShowInfo] = useState(false);
  const [infos, setInfos] = useState([]);
  const [infoImg, setInfoImg] = useState(null);
  const [infoPreview, setInfoPreview] = useState("");
  const [infoDesc, setInfoDesc] = useState("");

  const { setDecoded, decoded, admin, token, setAdmin, setToken } =
    useContext(Context);
  const inputRef = useRef(null);
  const swipperInputRef = useRef(null);

  // Admin yaratish uchun alohida state
  const [newAdmin, setNewAdmin] = useState({
    ad_name: "",
    phone: "",
    password: "",
    role: "admin",
  });

  // ========================= EFFECTS =========================
  // Image preview Mahsulot
  useEffect(() => {
    if (!img) return setPreview("");
    const url = URL.createObjectURL(img);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [img]);

  // Image preview Swipper
  useEffect(() => {
    if (!swipperImg) return setSwipperPreview("");
    const url = URL.createObjectURL(swipperImg);
    setSwipperPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [swipperImg]);

  // Image preview Info
  useEffect(() => {
    if (!infoImg) return setInfoPreview("");
    const url = URL.createObjectURL(infoImg);
    setInfoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [infoImg]);

  // Ma'lumotlarni yuklash
  useEffect(() => {
    getCategories();
    getSwipper();
    getAdmins();
    getProfile();
    getFooterInfo();
    getInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ========================= HELPERS (Swal shortcuts) =========================
  const swalSuccess = (title = "Muvaffaqiyat", text = "") =>
    Swal.fire({
      title,
      text,
      icon: "success",
      timer: 1400,
      showConfirmButton: false,
      background: "#ffffff",
    });

  const swalError = (title = "Xatolik", text = "") =>
    Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonText: "Tushunarli",
      confirmButtonColor: "#6c63ff",
      background: "#ffffff",
    });

  const swalWarn = (title = "Diqqat", text = "") =>
    Swal.fire({
      title,
      text,
      icon: "warning",
      confirmButtonText: "Tushunarli",
      confirmButtonColor: "#6c63ff",
      background: "#ffffff",
    });

  const confirmDialog = async ({
    title = "Tasdiqlang",
    text = "Davom etilsinmi?",
    confirmButtonText = "Ha, davom et",
  } = {}) => {
    const res = await Swal.fire({
      title,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "Bekor qilish",
      confirmButtonColor: "#6c63ff",
      cancelButtonColor: "#a1a1a1",
      background: "#ffffff",
    });
    return res.isConfirmed;
  };

  // ========================= FUNCTIONS =========================
  const infoInputRef = useRef(null);

  const onInfoFileChange = (e) => {
    setInfoImg(e.target.files?.[0] || null);
    e.target.value = "";
  };


  const getProfile = async () => {
    if (!token) return;
    try {
      let response;

      // ✅ decoded allaqachon state da bor, uni ishlatamiz
      // 🔹 super_admin bo'lsa — barcha mahsulotlarni olib keladi
      if (decoded?.role === "super_admin") {
        response = await api.get("/get-all-products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            const updatedAdmin = { cards: response.data, role: decoded.role };
            setAdmin(updatedAdmin);
            localStorage.setItem("admin", JSON.stringify(updatedAdmin));
          } else {
            const adminObj =
              response.data.admin ?? response.data.user ?? response.data;
            setAdmin(adminObj);
            localStorage.setItem("admin", JSON.stringify(adminObj));
          }
        }
      }
      // 🔹 oddiy admin bo'lsa — o'z profilini olib keladi
      else {
        response = await api.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const adminObj =
            response.data.admin ?? response.data.user ?? response.data;
          setAdmin(adminObj);
          localStorage.setItem("admin", JSON.stringify(adminObj));
        }
      }

      // ✅ decodedga role qo'shib qo'yamiz
      setDecoded((prev) => ({
        ...prev,
        role: response?.data?.role || decoded?.role || prev?.role,
      }));
    } catch (error) {
      console.error("getProfile error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        setAdmin({});
        setToken("");
        setDecoded(null);
      }
    }
  };

  const getCategories = async () => {
    try {
      const { data, status } = await api.get("/get-all-category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 200) setCategoryName(data);
    } catch (error) {
      console.error(error);
      // silently fail or show a small warning
    }
  };

  const getSwipper = async () => {
    try {
      const { data } = await api.get("/swipper", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSwippers(data);
    } catch (err) {
      console.error(err);
    }
  };
  //agar admin rolesini ishlatsam royxat chiqmay qolitti sabab nima?
  const getAdmins = async () => {
    if (admin && token)
      try {
        if (decoded?.role !== "super_admin" && admin.role !== "super_admin") return;
        const { data, status } = await api.get("/getAll", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (status === 200) {
          if (Array.isArray(data.data)) {
            setAdmins(data.data);
          } else if (Array.isArray(data)) {
            setAdmins(data);
          } else {
            setAdmins([]);
          }
        }
      } catch (error) {
        console.error(error);
        setAdmins([]);
      }
  };

  const getFooterInfo = async () => {
    try {
      const { data, status } = await api.get("/footer");
      if (status === 200) {
        setFooterInfo(data);
      }
    } catch (error) {
      console.error("Footer ma'lumotini olishda xato:", error);
    }
  };

  const getInfos = async () => {
    try {
      const { data, status } = await api.get("/info", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 200) setInfos(data);
    } catch (error) {
      console.error("Info olishda xato:", error);
      setInfos([]);
    }
  };

  if (!admin) return null;

  // ========================= HANDLERS =========================
  const openPicker = () => inputRef.current.click();
  const openSwipperPicker = () => swipperInputRef.current.click();

  const onFileChange = (e) => {
    setImg(e.target.files?.[0] || null);
    e.target.value = "";
  };

  const onSwipperFileChange = (e) => {
    setSwipperImg(e.target.files?.[0] || null);
    e.target.value = "";
  };

  // ======= MAHSULOT CRUD =======
  const onSubmitProduct = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !desc.trim() || (!img && !isEdit)) {
      await swalWarn("Toʻldirish kerak", "Mahsulotni to‘liq kiriting");
      return;
    }

    setLoading(true);

    try {
      if (isEdit && editId) {
        // === UPDATE ===
        const updatePayload = {
          title,
          desc,
          price,
          quantity,
          category_id,
        };
        await api.put(`/update-card/${editId}`, updatePayload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Agar rasm ham yangilansa
        if (img) {
          const imgForm = new FormData();
          imgForm.append("img", img);
          await api.put(`/update-card-img/${editId}`, imgForm, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        // Lokal state'da ham yangilab qo'yamiz (agar admin.card bo'lsa)
        setAdmin((prev) => {
          if (!prev || !Array.isArray(prev.card)) return prev;
          return {
            ...prev,
            card: prev.card.map((c) =>
              c.id === editId
                ? { ...c, title, desc, price, quantity, category_id }
                : c
            ),
          };
        });

        swalSuccess("Mahsulot yangilandi", "");
      } else {
        // === CREATE ===
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("category_id", category_id);
        if (img) formData.append("img", img);

        const { data, status } = await api.post(`/createCard`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Har xil backend response strukturasiga moslashish:
        const created = data?.data ?? data?.card ?? data;

        // Agar prev.admin.card mavjud bo'lsa, yangi mahsulotni unga qo'shamiz
        setAdmin((prev) => {
          if (!prev) return { card: [created] };
          const prevCards = Array.isArray(prev.card) ? prev.card : [];
          return { ...prev, card: [created,...prevCards] };
        });

        swalSuccess("Mahsulot qo‘shildi", "");
        getProfile();
      }

      // inputlarni tozalash
      setTitle("");
      setDesc("");
      setPrice("");
      setQuantity("");
      setCategory_id("");
      setImg(null);
      setPreview("");
      setIsEdit(false);
      setEditId(null);

      // serverdagi eng so'nggi holatni olish (ixtiyoriy qo'shimcha — kerak bo'lsa)
    } catch (err) {
      console.error(err);
      swalError(
        "Xatolik",
        err.response?.data?.message ||
          "Mahsulot bilan bog‘liq xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const ok = await confirmDialog({
      title: "Mahsulot o‘chirilsinmi?",
      text: "Mahsulot doimiy o‘chiriladi. Davom etmoqchimisiz?",
      confirmButtonText: "Ha, o‘chirish",
    });
    if (!ok) return;

    try {
      await api.delete(`/delete-card/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      swalSuccess("Mahsulot o‘chirildi");
      getProfile();
    } catch (err) {
      console.error(err);
      swalError("Xatolik", "Mahsulotni o‘chirishda xato yuz berdi");
    }
  };

  const editProduct = (p) => {
    setIsEdit(true);
    setEditId(p.id);
    setTitle(p.title);
    setDesc(p.desc);
    setPrice(p.price);
    setQuantity(p.quantity);
    setCategory_id(p.category_id);

    // 🔥 eski rasmni ko‘rsatish (preview uchun)
    setPreview(p.img ? `${BASE_URL_IMG}${p.img}` : "");
  };

  // ======= CATEGORY CRUD =======
  const onSubmitCategory = async (e) => {
    e.preventDefault();
    if (!cat_name.trim()) {
      await swalWarn(
        "Toʻldirish kerak",
        "Kategoriya nomi bo‘sh bo‘lishi mumkin emas"
      );
      return;
    }

    setLoading(true);
    try {
      if (isEdit && editId) {
        await api.put(
          `/update-category/${editId}`,
          { cat_name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        swalSuccess("Kategoriya yangilandi");
      } else {
        await api.post(
          "/create-category",
          { cat_name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        swalSuccess("Kategoriya qo‘shildi");
      }
      setCat_name("");
      setIsEdit(false);
      setEditId(null);
      getCategories();
    } catch (err) {
      console.error(err);
      swalError(
        "Xatolik",
        err.response?.data?.message ||
          "Kategoriya bilan bog‘liq xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    const ok = await confirmDialog({
      title: "Kategoriya o‘chirilsinmi?",
      text: "Avval mahsulotlar bo‘lsa, ularni o‘chirish kerak bo‘ladi.",
      confirmButtonText: "Ha, o‘chirish",
    });

    if (!ok) return;

    try {
      await api.delete(`/delete-category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      swalSuccess("Kategoriya o‘chirildi");
      getCategories();
    } catch (err) {
      console.error(err);
      // Agar server kategoriyani o'chirishni rad etsa, foydalanuvchiga yengil eslatma
      await Swal.fire({
        title: "Eslatma",
        text: "Bu kategoriya ostida mahsulotlar mavjud bo‘lishi mumkin. Avval ularni o‘chiring.",
        icon: "info",
        confirmButtonText: "Tushunarli",
        confirmButtonColor: "#6c63ff",
        background: "#ffffff",
      });
    }
  };

  const editCategory = (cat) => {
    setIsEdit(true);
    setEditId(cat.id);
    setCat_name(cat.cat_name);
  };

  // ======= SWIPPER CRUD =======
  const onSubmitSwipper = async (e) => {
    e.preventDefault();
    if (!swipperDesc.trim() || (!swipperImg && !isEdit)) {
      await swalWarn("Toʻldirish kerak", "Swipperni to‘liq kiriting");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("desc", swipperDesc);
    if (swipperImg) formData.append("img", swipperImg);

    try {
      if (isEdit && editId) {
        await api.put(`/swipper/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        swalSuccess("Swipper yangilandi");
      } else {
        await api.post("/swipper", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        swalSuccess("Swipper qo‘shildi");
      }
      setSwipperDesc("");
      setSwipperImg(null);
      setSwipperPreview("");
      setIsEdit(false);
      setEditId(null);
      getSwipper();
    } catch (err) {
      console.error(err);
      swalError(
        "Xatolik",
        err.response?.data?.message || "Swipper bilan bog‘liq xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteSwipper = async (id) => {
    const ok = await confirmDialog({
      title: "Swipper o‘chirilsinmi?",
      text: "Swipper yozuvi o‘chadi. Davom etilsinmi?",
      confirmButtonText: "Ha, o‘chirish",
    });
    if (!ok) return;

    try {
      await api.delete(`/swipper/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      swalSuccess("Swipper o‘chirildi");
      getSwipper();
    } catch (err) {
      console.error(err);
      swalError("Xatolik", "Swipperni o‘chirishda xato yuz berdi");
    }
  };

  const editSwipper = (sw) => {
    setIsEdit(true);
    setEditId(sw.id);
    setSwipperDesc(sw.desc);
    setSwipperPreview(BASE_URL_IMG + sw.img); // ✅ to‘g‘rilandi
  };

  // ======= ADMIN CRUD =======
  const onSubmitAdmin = async (e) => {
    e.preventDefault();
    if (
      !newAdmin.ad_name.trim() ||
      !newAdmin.phone.trim() ||
      !newAdmin.password.trim()
    ) {
      await swalWarn("Toʻldirish kerak", "Ma'lumotlarni to‘liq kiriting");
      return;
    }

    setLoading(true);
    try {
      await api.post("/create-admin-by-super-admin", newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      swalSuccess("Admin yaratildi");
      setNewAdmin({ ad_name: "", phone: "", password: "", role: "admin" });
      getAdmins();
    } catch (err) {
      console.error(err);
      swalError(
        "Xatolik",
        err.response?.data?.message || "Admin yaratishda xato"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteAdmin = async (id) => {
    const ok = await confirmDialog({
      title: "Admin o‘chirilsinmi?",
      text: "Bu admin butunlay o‘chiriladi.",
      confirmButtonText: "Ha, o‘chirish",
    });
    if (!ok) return;

    try {
      await api.delete(`/deleteId/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      swalSuccess("Admin o‘chirildi");
      getAdmins();
    } catch (err) {
      console.error(err);
      swalError("Xatolik", "Adminni o‘chirishda xato yuz berdi");
    }
  };

  // Footer ma'lumotini yaratish
  const createFooter = async (e) => {
    e.preventDefault();
    const newFooter = { phone, telegram_email, name };

    try {
      const { status } = await api.post("/footer", newFooter);
      if (status === 201) {
        Swal.fire({
          icon: "success",
          title: "Footer qo‘shildi ✅",
          confirmButtonColor: "#6c63ff",
        });
        setPhone("");
        setTelegramEmail("");
        setName("");
        getFooterInfo();
      }
    } catch (error) {
      console.error("Footer yaratishda xato:", error);
      Swal.fire({
        icon: "error",
        title: "Xatolik!",
        text: "Footer yaratishda muammo yuz berdi ❌",
        confirmButtonColor: "#6c63ff",
      });
    }
  };

  // Footer yangilash
  const updateFooter = async (id) => {
    const updatedFooter = { phone, telegram_email, name };

    try {
      const { status } = await api.put(`/footer/${id}`, updatedFooter);
      if (status === 200) {
        swalSuccess("Footer yangilandi");
        setPhone("");
        setTelegramEmail("");
        setName("");
        setIsEdit(false);
        setEditId(null);
        getFooterInfo();
      }
    } catch (error) {
      console.error("Footer yangilashda xato:", error);
      swalError("Xatolik", "Footer yangilashda xato");
    }
  };

  // Footer o'chirish
  const deleteFooter = async (id) => {
    const ok = await confirmDialog({
      title: "Footer yozuvi o‘chirilsinmi?",
      text: "Aloqa ma'lumotlari o‘chadi.",
      confirmButtonText: "Ha, o‘chirish",
    });
    if (!ok) return;

    try {
      const { status } = await api.delete(`/footer/${id}`);
      if (status === 200) {
        swalSuccess("Footer o‘chirildi");
        getFooterInfo();
      }
    } catch (error) {
      console.error("Footer o‘chirishda xato:", error);
      swalError("Xatolik", "Footer o‘chirishda xato");
    }
  };

  // Footer edit tugmasi bosilganda inputlarga qiymatlarni berish
  const editFooter = (f) => {
    setIsEdit(true);
    setEditId(f.id);
    setPhone(f.phone);
    setTelegramEmail(f.telegram_email);
    setName(f.name);
  };

  // ========== Info CRUD ==========
  const createInfo = async (e) => {
    e.preventDefault();
    if (!infoImg || !infoDesc.trim()) {
      await swalWarn("Toʻldirish kerak", "Info to‘liq emas");
      return;
    }

    const formData = new FormData();
    formData.append("desc", infoDesc);
    formData.append("img", infoImg);

    try {
      const { status } = await api.post("/info", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 201) {
        swalSuccess("Info qo‘shildi");
        setInfoImg(null);
        setInfoDesc("");
        setInfoPreview("");
        getInfos();
        getProfile();
      }
    } catch (error) {
      console.error("Info yaratishda xato:", error);
      swalError("Xatolik", "Info yaratishda xato");
    }
  };

  const updateInfo = async (id) => {
    if (!infoDesc.trim()) {
      await swalWarn("Toʻldirish kerak", "Desc bo‘sh bo‘lishi mumkin emas");
      return;
    }

    const formData = new FormData();
    formData.append("desc", infoDesc);
    if (infoImg) formData.append("img", infoImg);

    try {
      const { status } = await api.put(`/info/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 200) {
        swalSuccess("Info yangilandi");
        setInfoImg(null);
        setInfoDesc("");
        setInfoPreview("");
        setIsEdit(false);
        setEditId(null);
        getInfos();
        getProfile();
      }
    } catch (error) {
      console.error("Info yangilashda xato:", error);
      swalError("Xatolik", "Info yangilashda xato");
    }
  };

  const deleteInfo = async (id) => {
    const ok = await confirmDialog({
      title: "Info o‘chirilsinmi?",
      text: "Info yozuvi o‘chadi. Davom etilsinmi?",
      confirmButtonText: "Ha, o‘chirish",
    });
    if (!ok) return;

    try {
      const { status } = await api.delete(`/info/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 200) {
        swalSuccess("Info o‘chirildi");
        getInfos();
      }
    } catch (error) {
      console.error("Info o‘chirishda xato:", error);
      swalError("Xatolik", "Info o‘chirishda xato");
    }
  };

  const editInfo = (info) => {
    setIsEdit(true);
    setEditId(info.id);
    setInfoDesc(info.desc);
    setInfoPreview(BASE_URL_IMG + info.img);
  };
  console.log(decoded);

  // ========================= JSX =========================
  return (
    <main className="adminproduct">
      <h1>Admin panel</h1>

      <div className="admin-control-buttons">
        <button
          className={showProduct ? "active-btn" : "inactive-btn"}
          onClick={() => setShowProduct(!showProduct)}
        >
          Mahsulot {showProduct ? "yashirish <" : "yaratish >"}
        </button>

        <button
          className={showCategory ? "active-btn" : "inactive-btn"}
          onClick={() => setShowCategory(!showCategory)}
        >
          Kategoriya {showCategory ? "yashirish <" : "yaratish >"}
        </button>

        <button
          className={showSwipper ? "active-btn" : "inactive-btn"}
          onClick={() => setShowSwipper(!showSwipper)}
        >
          Swipper {showSwipper ? "yashirish <" : "yaratish >"}
        </button>

        {decoded?.role === "super_admin" && (
          <button
            className={showAdmin ? "active-btn" : "inactive-btn"}
            onClick={() => setShowAdmin(!showAdmin)}
          >
            Admin {showAdmin ? "yashirish <" : "yaratish >"}
          </button>
        )}

        <button
          className={showFooter ? "active-btn" : "inactive-btn"}
          onClick={() => {
            setShowFooter(!showFooter);
            getFooterInfo();
          }}
        >
          Aloqa ma'lumotlari {showFooter ? "yashirish <" : "yaratish >"}
        </button>

        <button
          className={showInfo ? "active-btn" : "inactive-btn"}
          onClick={() => {
            setShowInfo(!showInfo);
            if (!showInfo) getInfos();
          }}
        >
          Info {showInfo ? "yashirish <" : "yaratish >"}
        </button>
      </div>

      {/* ======= MAHSULOT ======= */}
      {showProduct && (
        <div className="products-controller">
          <section className="add_pro_container">
            <h1>Mahsulot qo‘shish</h1>
            <form onSubmit={onSubmitProduct}>
              <FaX
                onClick={() => setShowProduct(false)}
                className="close-icon"
              />

              <div>
                <label>Rasm</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={onFileChange}
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Selected"
                    onClick={openPicker}
                    style={{ cursor: "pointer", width: "150px" }}
                  />
                ) : (
                  <button
                    type="button"
                    className="admin-btns"
                    onClick={openPicker}
                  >
                    Rasm tanlash
                  </button>
                )}
                {img && (
                  <button
                    type="button"
                    onClick={() => setImg(null)}
                    disabled={loading}
                  >
                    Rasmni olib tashlash
                  </button>
                )}
              </div>
              <label>Mahsulot nomi</label>
              <input
                type="text"
                placeholder="Mahsulot nomi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
              <label>Mahsulot haqida malumot</label>
              <textarea
                type="text"
                placeholder="Mahsulot desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                disabled={loading}
              />
              <label>Narxi</label>
              <input
                type="text"
                placeholder="Narxi"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={loading}
              />
              <label>Soni</label>
              <input
                type="text"
                placeholder="Soni"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={loading}
              />
              <label>Turi</label>
              <select
                value={category_id}
                onChange={(e) => setCategory_id(e.target.value)}
              >
                <option value="">Tanlang</option>
                {categoryName.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.cat_name}
                  </option>
                ))}
              </select>

              <button type="submit" disabled={loading} className="admin-btns">
                {isEdit ? "Yangilash" : "Qo‘shish"}
              </button>
            </form>
            <section className="product-list">
              {(decoded?.role === "super_admin"
                ? admin.cards // super_admin bo‘lsa — hamma cardlar
                : admin.card?.filter((c) => c.admin_id === decoded.id)
              ) // oddiy admin bo‘lsa — faqat o‘zininglari
                ?.map((p) => (
                  <Card
                    key={p.id}
                    data={p}
                    categoryName={categoryName}
                    deleteProduct={() => deleteProduct(p.id)}
                    updateProduct={() => editProduct(p)}
                  />
                ))}
              {console.log(admin)}
            </section>
          </section>
        </div>
      )}


      {/* ======= KATEGORIYA ======= */}
      {showCategory && (
        <div className="category-controller">
          <section className="add_cat_container">
            <h1>Kategoriya qo‘shish</h1>
            <form onSubmit={onSubmitCategory}>
              <FaX
                onClick={() => setShowProduct(false)}
                className="close-icon"
              />
              <label>Kategoriya nomi</label>
              <input
                type="text"
                placeholder="Kategoriya nomi"
                value={cat_name}
                onChange={(e) => setCat_name(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {isEdit ? "Yangilash" : "Qo‘shish"}
              </button>
            </form>
          </section>

          <section className="category_list">
            {categoryName.map((cat) => (
              <CategoryCard
                key={cat.id}
                data={cat}
                deleteCategory={() => deleteCategory(cat.id)}
                editCategory={() => editCategory(cat)}
              />
            ))}
          </section>
        </div>
      )}

      {/* ======= SWIPPER ======= */}
      {showSwipper && (
        <div className="products-controller">
          <section className="add_pro_container">
            <h1>Swipper qo‘shish</h1>
            <form onSubmit={onSubmitSwipper}>
              <FaX
                onClick={() => setShowProduct(false)}
                className="close-icon"
              />
              <div>
                <label>Rasm tanlang</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={swipperInputRef}
                  style={{ display: "none" }}
                  onChange={onSwipperFileChange}
                />
                {swipperPreview ? (
                  <img
                    src={swipperPreview}
                    alt="Selected"
                    onClick={openSwipperPicker}
                    style={{ cursor: "pointer", width: "150px" }}
                  />
                ) : (
                  <button type="button" onClick={openSwipperPicker}>
                    Rasm tanlash
                  </button>
                )}
                {swipperImg && (
                  <button
                    type="button"
                    onClick={() => setSwipperImg(null)}
                    disabled={loading}
                  >
                    Rasmni olib tashlash
                  </button>
                )}
              </div>
              <label>Malumot</label>
              <input
                type="text"
                placeholder="Desc"
                value={swipperDesc}
                onChange={(e) => setSwipperDesc(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {isEdit ? "Yangilash" : "Qo‘shish"}
              </button>
            </form>

            <section className="swipper-list">
              {swippers.map((sw) => (
                <SwipperCard
                  key={sw.id}
                  data={sw}
                  deleteSwipper={() => deleteSwipper(sw.id)}
                  editSwipper={() => editSwipper(sw)}
                />
              ))}
            </section>
          </section>
        </div>
      )}

      {/* ======= ADMIN ======= */}
      {showAdmin && (
        <div className="admin-controller">
          <h1>Admin yaratish</h1>
          <form onSubmit={onSubmitAdmin}>
            <FaX onClick={() => setShowProduct(false)} className="close-icon" />

            <label>Ism</label>
            <input
              type="text"
              value={newAdmin.ad_name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, ad_name: e.target.value })
              }
              disabled={loading}
            />
            <label>Telefon</label>
            <input
              type="text"
              value={newAdmin.phone}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, phone: e.target.value })
              }
              disabled={loading}
            />
            <label>Parol</label>
            <input
              type="text"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              Yaratish
            </button>
          </form>
          <h2 className="admin-title">Adminlar ro‘yxati</h2>
          <ul className="admin-list">
            {admins && admins.length > 0 ? (
              admins.map((a) => (
                <li key={a.id} className="admin-item">
                  <span>
                    <p>
                      Ism: <strong>{a.ad_name}</strong>
                    </p>
                    <p>
                      Telefon raqam: <strong>{a.phone}</strong>
                    </p>
                    <p>
                      Holati:
                      <strong
                        style={{ color: a.is_used ? "#4CAF50" : "#F44336" }}
                      >
                        {a.is_used ? " faol" : " faol emas"}
                      </strong>
                    </p>
                    {a.is_used && decoded.role === "super_admin" ? (
                      ""
                    ) : (
                      <p>
                        Parol: <strong>{a.password}</strong>
                      </p>
                      
                    )}
                    <p>Role: <strong>{a.role}</strong></p>
                  </span>

                  <button onClick={() => deleteAdmin(a.id)}>O‘chirish</button>
                </li>
              ))
            ) : (
              <li>Adminlar mavjud emas</li>
            )}
          </ul>
        </div>
      )}

      {/* ======= FOOTER ======= */}
      {showFooter && (
        <div className="footer-info-controller">
          <section>
            <h1>Aloqa ma{"'"}lumotlari</h1>
            <form
              onSubmit={(e) => {
                isEdit
                  ? (e.preventDefault(), updateFooter(editId))
                  : createFooter(e);
              }}
            >
              <FaX
                onClick={() => setShowProduct(false)}
                className="close-icon"
              />

              <label>Telefon raqam</label>
              <input
                type="text"
                value={phone}
                disabled={loading}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>Telegram link</label>
              <input
                type="text"
                value={telegram_email}
                onChange={(e) => setTelegramEmail(e.target.value)}
              />
              <label>Ism</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {isEdit ? "Yangilash" : "Qo‘shish"}
              </button>
            </form>
          </section>

          <section className="footer-list">
            {footerInfo.length > 0 ? (
              footerInfo.map((info) => (
                <div key={info.id} className="footer-item">
                  <p>Telefon: {info.phone}</p>
                  <p>Telegram: {info.telegram_email}</p>
                  <p>Ism: {info.name}</p>
                  <button onClick={() => editFooter(info)}>✏️ Edit</button>
                  <button onClick={() => deleteFooter(info.id)}>
                    🗑️ Delete
                  </button>
                </div>
              ))
            ) : (
              <p>Aloqa ma'lumotlari mavjud emas</p>
            )}
          </section>
        </div>
      )}

      {/* ======= INFO ======= */}
      {showInfo && (
        <div className="info-controller">
          <section>
            <h1>Info qo‘shish</h1>
            <form
              onSubmit={(e) => {
                isEdit
                  ? (e.preventDefault(), updateInfo(editId))
                  : createInfo(e);
              }}
            >
              <FaX onClick={() => setShowInfo(false)} className="close-icon" />

              <div>
                <label>Rasm</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={infoInputRef}
                  style={{ display: "none" }}
                  onChange={onInfoFileChange}
                />
                {infoPreview ? (
                  <img
                    src={infoPreview}
                    alt={infoDesc}
                    onClick={() => infoInputRef.current.click()}
                    style={{ cursor: "pointer", width: "150px" }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => infoInputRef.current.click()}
                  >
                    Rasm tanlash
                  </button>
                )}
                {infoImg && (
                  <button
                    type="button"
                    onClick={() => setInfoImg(null)}
                    disabled={loading}
                  >
                    Rasmni olib tashlash
                  </button>
                )}
              </div>

              <label>Malumot</label>
              <textarea
                type="text"
                placeholder="Desc"
                value={infoDesc}
                onChange={(e) => setInfoDesc(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {isEdit ? "Yangilash" : "Qo‘shish"}
              </button>
            </form>
          </section>

          <section className="admin-page-info-list">
            {infos.length > 0 ? (
              infos.map((i) => (
                <div key={i.id} className="admin-info-item">
                  {i.img && (
                    <img
                      src={BASE_URL_IMG + i.img}
                      alt={i.desc}
                      className="admin-info-img"
                      style={{
                        width: "150px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <p className="admin-info-desc">{i.desc}</p>
                  <div className="info-actions">
                    <button onClick={() => editInfo(i)}>✏️ Edit</button>
                    <button onClick={() => deleteInfo(i.id)}>🗑️ Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Info mavjud emas</p>
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default Admin;
