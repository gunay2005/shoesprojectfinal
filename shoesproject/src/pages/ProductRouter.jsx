import { useParams } from 'react-router-dom';
import gallery from '../data/gallery.json';
import shoes from '../data/products.json';
import ProductDetailPage from './ProductDetailPage.jsx';
import ShoesDetailPage from './ShoesDetailPage.jsx';

const ProductRouter = () => {
  const { id } = useParams();

  const inGallery = gallery.find(p => p.id === id || String(p.id) === String(id));
  if (inGallery) return <ProductDetailPage />;

  const inShoes = shoes.find(p => p.id === id || String(p.id) === String(id));
  if (inShoes) return <ShoesDetailPage />;

  // Если не найдено ни в сумках, ни в обуви — выводим понятное сообщение или 404
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 text-lg mb-4">Məhsul tapılmadı.</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
        >
          Geri qayıt
        </button>
      </div>
    </div>
  );
};

export default ProductRouter;