import './swipper.css'
import { BASE_URL_IMG } from "../../service/api";

export default function SwipperCard({ data, deleteSwipper, editSwipper }) {
  if (!data) return null;
  const { desc, img } = data;

  // agar img bor bo‘lsa BASE_URL_IMG bilan to‘liq qilib qo‘shamiz
  const imageUrl = img ? `${BASE_URL_IMG}${img}` : "/no-image.png";

  return (
    <div className="swipper-card">
      <img src={imageUrl} alt={desc} />
      <div>
        <p className='swipper-desc'>{desc}</p>
      </div>
      <div className="admin-controller-btns">
        <button onClick={editSwipper} className="admin-btns">Tahrirlash</button>
        <button onClick={deleteSwipper} className="admin-btns">🗑️ O'chirish</button>
      </div>
    </div>
  );
}
