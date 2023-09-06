import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../lib/store/features';
import toast, { Toaster } from 'react-hot-toast';
const Product = ({ products }) => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const productLen = products.length;
  useEffect(() => {
    setPage(1);
  }, [products]);
  return (
    <>
      <motion.section
        variants={{
          hidden: { opacity: 0, y: 200 },
          visible: { opacity: 1, y: 0 },
        }}
        animate="visible"
        initial="hidden"
        transition={{ type: 'tween', duration: 2 }}
        className=""
      >
        <h1 className="text-left text-xl font-bold underline ml-2 text-violet-600">
          Products
        </h1>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 place-items-center">
          {products?.slice(page * 5 - 5, page * 5).map((product, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-[400px] border-[4px] rounded-md border-violet-600"
            >
              <Link to={`product/${product.id}`}>
                <img
                  className="w-full h-[200px] object-cover"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </Link>
              <div className="flex justify-between items-center font-bold px-3">
                <p>{product.title}</p>

                <h1>₹ {product.price}</h1>
              </div>
              {cart.some((prod) => prod.id === product.id) ? (
                <button
                  className="button w-full bg-red-500 hover:bg-red-700"
                  onClick={() => {
                    dispatch(removeFromCart({ id: product.id }));

                    toast.error('Product was successfully removed');
                  }}
                >
                  remove
                </button>
              ) : (
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.title,
                        qty: 1,
                        thumbnail: product.thumbnail,
                        price: product.price,
                      })
                    );
                    toast.success('product has been added');
                  }}
                  className="button w-full "
                >
                  Add to cart
                </button>
              )}
            </motion.section>
          ))}
        </motion.div>
        <Toaster />
      </motion.section>
      <div>
        <Pagination page={page} prodLen={productLen} setPage={setPage} />
      </div>
    </>
  );
};

export default Product;
