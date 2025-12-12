import './category.css';

export default function CategoryCard({ data, deleteCategory, editCategory, onSelectCategory }) {
  if (!data) return null;
  const { cat_name } = data;

  return (
    <div 
      className="category-card"
      onClick={() => onSelectCategory && onSelectCategory(data.id)} // ✅ kategoriya bosilganda Home.jsx ga signal yuboradi
    >
      <h3 style={{"color":"#F2C300","paddingBottom":"5px"}}>{cat_name}</h3>
      <div className="admin-controller-btns">
        {editCategory && (
          <button onClick={(e) => { e.stopPropagation(); editCategory(); }} className="">
            Tahrirlash
          </button>
        )}
        {deleteCategory && (
          <button onClick={(e) => { e.stopPropagation(); deleteCategory(); }} className="admin-btns">
            O'chirish
          </button>
        )}
      </div>
    </div>
  );
}
