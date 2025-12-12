import toast from 'react-hot-toast'
import './Home.css'
import { api, BASE_URL_IMG } from '../../service/api'
import { useEffect, useState } from 'react'
import Card from '../card/Card'
import { Swiper, SwiperSlide } from 'swiper/react'

// Swiper uslublari
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// kerakli modullarni import qilamiz
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const Home = () => {
  const [card, setCard] = useState([])
  const [categoryName, setCategoryName] = useState([])
  const [swipper, setSwipper] = useState([]) // ✅ xato shu yerda edi
  const [selectedCategory, setSelectedCategory] = useState(null)

  const getProducts = async () => {
    try {
      const res = await api.get('/get-all-products')
      if (res.status === 200 && Array.isArray(res.data.cards)) {
        setCard(res.data.cards)
        console.log(res.data);
        
      } else {
        setCard([])
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }
  

  const getCategories = async () => {
    try {
      const res = await api.get('/get-all-category')
      if (res.status === 200 && Array.isArray(res.data)) {
        setCategoryName(res.data)
      } else {
        setCategoryName([])
      }
    } catch (error) {
      console.error(error)
      setCategoryName([])
    }
  }

  const getSwipper = async () => {
    try {
      const res = await api.get('/swipper')
      if (res.status === 200) {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : []
        setSwipper(data)
      } else {
        setSwipper([])
      }
    } catch (error) {
      console.error(error)
      setSwipper([])
    }
  }

  useEffect(() => {
    getProducts()
    getCategories()
    getSwipper()
    
  }, [])

  const filteredCards = selectedCategory
    ? card.filter((p) => String(p.category_id) === String(selectedCategory))
    : card

  return (
    <div className="home">
      {/* ===== SWIPER (karusel) ===== */}
      {Array.isArray(swipper) && swipper.length > 0 && (
        <section className="mySwiper">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="my-swiper"
          >
            {swipper.map((s) => (
              <SwiperSlide key={s.id}>
                <div className="info-card">
                  <img
                    src={s.img ? BASE_URL_IMG + s.img : '/no-image.png'}
                    alt={s.desc || 'swipper'}
                    style={{ width: '100%', display: 'block' }}
                  />
                  {s.desc && <p className="swipper-desc">{s.desc}</p>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* Categories */}
      <section className="categories">
        <button
          className={selectedCategory === null ? 'active' : ''}
          onClick={() => setSelectedCategory(null)}
        >
          Barchasi
        </button>
        {categoryName.map((cat) => (
          <button
            key={cat.id}
            className={selectedCategory === cat.id ? 'active' : ''}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.cat_name}
          </button>
        ))}
      </section>

      {/* Products */}
      <section className="cards">
        {filteredCards.length > 0 ? (
          filteredCards.map((i, index) => (
            <Card key={index} data={i} categoryName={categoryName} />
          ))
        ) : (
          <p style={{ color: '#fff', textAlign: 'center', marginTop: '20px' }}>
            Bu kategoriyada mahsulot yo‘q
          </p>
        )}
      </section>
    </div>
  )
}

export default Home
