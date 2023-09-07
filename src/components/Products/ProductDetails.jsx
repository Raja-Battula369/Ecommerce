import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Cart from '../Cart';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {
  addToCart,
  addToWishList,
  removeFromCart,
  removeFromWishList,
} from '../../../lib/store/features';
import WishList from '../WishList';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ProductDetails = () => {
  const [productDetailsData, setProductDetailsData] = useState({});
  const [productsData, setProductsData] = useState([]);
  const [image, setImage] = useState('');

  const { productid } = useParams();

  const reduxDispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.isCartOpen);
  const iswishListOpen = useSelector((state) => state.iswishListOpen);

  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);

  const FetchProductDetails = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${productid}`,
      { cache: 'force-cache' }
    );
    const result = await response.json();
    // console.log(result);
    setProductDetailsData(result);
    setImage(result.thumbnail);
  };

  const fetchProductsData = async () => {
    const data = await fetch('https://dummyjson.com/products', {
      cache: 'force-cache',
    });
    const respone = await data.json();
    // console.log(respone.products);
    setProductsData(respone.products);
  };

  useEffect(() => {
    FetchProductDetails();
    fetchProductsData();
  }, [productid]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className="w-full dark:bg-black dark:text-white"
    >
      <h2 className="text-violet-600 underline text-xl font-bold">
        brand:{' '}
        <span className="dark:text-white text-black">
          {productDetailsData.brand}
        </span>
      </h2>

      <div className=" flex flex-col  md:flex-row justify-center items-center w-full gap-3">
        <div className="flex-1 w-[90%] md:w-[60%] h-[500px] border-[4px] border-violet-600 rounded-md ml-1">
          {image ? (
            <img
              className="w-full h-[70%] object-fill"
              src={image}
              alt="product"
            />
          ) : (
            <Skeleton height={'70%'} highlightColor="black" />
          )}

          <div className="mt-4 mx-2 flex gap-2">
            {productDetailsData?.images?.slice(0, 3).map((prod, index) => (
              <div
                key={index}
                className="w-[150px] h-fit overflow-hidden border-[5px] border-violet-600 rounded-md"
                onClick={() => setImage(prod)}
              >
                {prod ? (
                  <img src={prod} className="w-full h-[90px] object-cover" />
                ) : (
                  <Skeleton height={'90px'} highlightColor="black" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className=" flex-1 w-[90%] md:w-[35%] text-violet-600 md:self-start text-xl font-bold">
          <h3>
            Title:{' '}
            <span className="dark:text-white text-black">
              {productDetailsData.title || <Skeleton highlightColor="black" />}
            </span>
          </h3>
          <p className="max-w-full">
            description:
            <span className="dark:text-white text-black">
              {productDetailsData.description || (
                <Skeleton highlightColor="black" />
              )}
            </span>
          </p>
          <p>
            rating:
            <span className="dark:text-white text-black">
              ⭐
              {productDetailsData.rating || <Skeleton highlightColor="black" />}
            </span>
          </p>
          <h3>
            Price: Rs{' '}
            <span className="dark:text-white text-black">
              {productDetailsData.price || <Skeleton highlightColor="black" />}{' '}
              /-
            </span>
          </h3>
          <div className="flex">
            {' '}
            <p className="text-xl font-semibold">wishList:</p>
            {wishList.some((prod) => prod.id === productDetailsData.id) ? (
              <AiFillHeart
                onClick={() => {
                  reduxDispatch(
                    removeFromWishList({ id: productDetailsData.id })
                  );
                  toast.error('product remove from wish list');
                }}
                className="text-red-600 cursor-pointer"
                size={28}
              />
            ) : (
              <AiOutlineHeart
                onClick={() => {
                  reduxDispatch(
                    addToWishList({
                      id: productDetailsData.id,
                      thumbnail: productDetailsData.thumbnail,
                      name: productDetailsData.title,
                      price: productDetailsData.price,
                    })
                  );
                  toast.success('product added to wish list');
                }}
                size={28}
                className="cursor-pointer"
              />
            )}
          </div>

          {cart?.some((prod) => prod.id === productDetailsData.id) ? (
            <motion.button
              variants={{
                hidden: { opacity: 0, scale: 1.2 },
                visible: { opacity: 1, scale: 1 },
              }}
              animate="visible"
              initial="hidden"
              transition={{ type: 'spring', duration: 1.5 }}
              onClick={() => {
                reduxDispatch(removeFromCart({ id: productDetailsData.id }));
                toast.error('product removed from cart');
              }}
              className="button text-red-500 hover:text-red-700 w-full"
            >
              remove from cart
            </motion.button>
          ) : (
            <button
              onClick={() => {
                reduxDispatch(
                  addToCart({
                    name: productDetailsData.title,
                    thumbnail: productDetailsData.thumbnail,
                    price: productDetailsData.price,
                    id: productDetailsData.id,
                    qty: 1,
                  })
                );
                toast.success('product added to cart');
              }}
              className="button w-full"
            >
              add to cart
            </button>
          )}

          <p>
            Category:{' '}
            <span className="dark:text-white text-black">
              {productDetailsData.category || (
                <Skeleton highlightColor="black" />
              )}
            </span>
          </p>
        </div>
      </div>
      {isCartOpen && <Cart />}
      {iswishListOpen && <WishList />}
      <div>
        <h1 className="text-black p-2 text-xl font-bold underline">
          Related products
        </h1>
        <div className="grid grid-flow-col-1 md:grid-cols-3 w-full gap-3 place-items-center">
          {productsData.map(
            (product, i) =>
              product.category === productDetailsData.category && (
                <Link key={i + product.category} to={`/product/${product.id}`}>
                  <section className=" w-[300px] border-[3px] border-violet-600 rounded-md">
                    <img
                      className="w-full h-[200px] object-cover"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <section className="flex justify-between items-center text-xl font-semibold">
                      <p>{product.title}</p>
                      <h1>Rs {product.price}</h1>
                      {/* {console.log(reduxCart)} */}
                    </section>
                  </section>
                </Link>
              )
          )}
        </div>
        <Toaster />
      </div>
    </motion.div>
  );
};

export default ProductDetails;
