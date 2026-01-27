import { createContext, useEffect, useState } from "react";
import { api } from "../service/api";
import { jwtDecode } from "jwt-decode";

export const Context = createContext();

export default function Provider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [decoded, setDecoded] = useState(null);
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("admin");
    try {
      return saved && saved !== "undefined" ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("likes");
    try {
      return savedLikes ? JSON.parse(savedLikes) : [];
    } catch {
      return [];
    }
  });

  const [superAdminExists, setSuperAdminExists] = useState(null);

  const checkSuperAdmin = async () => {
    try {
      const { data } = await api.get("/get-super-admin");
      setSuperAdminExists(Boolean(data.exists));
    } catch (err) {
      console.error("checkSuperAdmin error:", err);
      setSuperAdminExists(false);
    }
  };

  const getProfile = async () => {
    if (!token) return;
    try {
      let response;

      // ✅ decoded allaqachon state da bor yoki tokendan olamiz
      const currentDecoded = decoded || (token ? jwtDecode(token) : null);

      // 🔹 super_admin bo'lsa — barcha mahsulotlarni olib keladi
      if (currentDecoded?.role === "super_admin") {
        response = await api.get("/get-all-products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          // ✅ Backend {cards: [...]} yoki {success: true, cards: [...]} formatida qaytarishi mumkin
          const cardsData = response.data.cards || response.data;

          if (Array.isArray(cardsData)) {
            const updatedAdmin = {
              ...admin,
              cards: cardsData,
              role: currentDecoded.role,
              id: currentDecoded.id,
            };
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
      if (!decoded) {
        setDecoded(currentDecoded);
      }
    } catch (error) {
      console.error("getProfile error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        setAdmin({});
        setToken("");
        setDecoded(null);
      }
      if (error.response?.status === 401 || error.response?.status === 404) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        setAdmin({});
        setToken("");
        setDecoded(null);
        return;
      }
    }
  };

  useEffect(() => {
    checkSuperAdmin();
  }, []);

  // ✅ Sahifa yangilanganda yoki token o'zgarganda ham decoded qayta tiklanadi
  useEffect(() => {
    const savedToken = token || localStorage.getItem("token");
    if (savedToken) {
      try {
        const dec = jwtDecode(savedToken);
        setDecoded(dec);
        localStorage.setItem("token", savedToken);
        getProfile();
      } catch (err) {
        console.error("Invalid token:", err);
        setDecoded(null);
      }
    } else {
      setDecoded(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // const addToCart = (product) => {
  //   setCartItems((prev) => {
  //     const exists = prev.find((item) => item.id === product.id);
  //     const updatedCart = exists
  //       ? prev.map((item) =>
  //           item.id === product.id
  //             ? { ...item, quantity: item.quantity + 1 }
  //             : item
  //         )
  //       : [...prev, { ...product, quantity: 1 }];
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });
  // };
// const addToCart = (product) => {
//   setCartItems((prev) => {
//     const exists = prev.find((item) => item.id === product.id);

//     let updatedCart;

//     if (exists) {
//       updatedCart = prev.map((item) =>
//         item.id === product.id
//           ? { ...item, cartQuantity: item.cartQuantity + 1 }
//           : item
//       );
//     } else {
//       updatedCart = [
//         ...prev,
//         {
//           ...product,
//           cartQuantity: 1, // ❗ cart uchun YANGI quantity
//         },
//       ];
//     }

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     return updatedCart;
//   });
// };



const addToCart = (product) => {
  setCartItems((prev) => {
    const exists = prev.find((item) => item.id === product.id);

    let updatedCart;

    if (exists) {
      updatedCart = prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              cartQuantity: (item.cartQuantity ?? 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...prev,
        {
          ...product,
          cartQuantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });
};

// const increaseCartQuantity = (id) => {
//   setCartItems((prev) => {
//     const updatedCart = prev.map((item) =>
//       item.id === id
//         ? { ...item, cartQuantity: item.cartQuantity + 1 }
//         : item
//     );

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     return updatedCart;
//   });
// };





const decreaseCartQuantity = (id) => {
  setCartItems((prev) => {
    const updatedCart = prev
      .map((item) =>
        item.id === id
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      )
      .filter((item) => item.cartQuantity > 0); // 0 bo‘lsa — o‘chadi

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });
};


  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const toggleLike = (product) => {
    setLikes((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      const updatedLikes = exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const removeLike = (id) => {
    setLikes((prev) => {
      const updatedLikes = prev.filter((item) => item.id !== id);
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        admin,
        setAdmin,
        superAdminExists,
        setSuperAdminExists,
        cartItems,
        addToCart,
        removeFromCart,
        likes,
        toggleLike,
        removeLike,
        decoded,
        setDecoded,
        increaseCartQuantity,
        decreaseCartQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
}
