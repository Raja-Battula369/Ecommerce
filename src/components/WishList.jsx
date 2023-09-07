import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromWishList,
  wishListCloseOrOpen,
} from '../../lib/store/features';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WishList = () => {
  const reduxDispatch = useDispatch();

  const wishList = useSelector((state) => state.wishList);

  return (
    <>
      <div
        className="w-full h-full absolute top-0 left-0 bg-black opacity-90"
        onClick={() => reduxDispatch(wishListCloseOrOpen())}
      ></div>
      <motion.div
        variants={{
          hidden: { x: 400 },
          visible: { x: 0 },
        }}
        animate="visible"
        initial="hidden"
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-[90%] md:w-[500px] min-h-screen bg-slate-700 absolute top-0 right-0"
      >
        <div className="flex justify-between items-center px-[2rem] ">
          <h1 className="text-center font-bold text-3xl">wishList</h1>
          <button
            onClick={() => reduxDispatch(wishListCloseOrOpen())}
            className="button mt-1 px-4"
          >
            X
          </button>
        </div>

        <motion.section
          variants={{
            hidden: { opacity: 0, y: 200 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: 'spring', duration: 0.5 }}
          animate="visible"
          initial="hidden"
          className="flex flex-col justify-center items-center"
        >
          {wishList?.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={() => reduxDispatch(wishListCloseOrOpen())}
              className="w-[90%]"
            >
              <motion.section
                whileInView={{ scale: 1.1 }}
                className="bg-white w-[90%] border-[3px] border-violet-600 mt-10 rounded-md relative"
              >
                <div className="flex gap-5 items-center">
                  <img
                    className="w-[40%] object-cover rounded-md"
                    src={product.thumbnail}
                    alt={product.name}
                  />
                  <div className="flex flex-col">
                    <p className="text-neutral-950 font-bold md:text-xl text-[15px] overflow-hidden">
                      {product.name}
                    </p>
                    <button className="button bg-transparent text-black">
                      RS {product.price}
                    </button>
                  </div>

                  <div>
                    <button
                      className="button p-2 absolute top-2 right-2"
                      onClick={() =>
                        reduxDispatch(removeFromWishList({ id: product.id }))
                      }
                    >
                      X
                    </button>
                  </div>
                </div>
              </motion.section>
            </Link>
          ))}
        </motion.section>
      </motion.div>
    </>
  );
};

export default WishList;
