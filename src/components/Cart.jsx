import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';
import { cartCloseOrOpen, changeQty } from '../../lib/store/features';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const controlMethod = useAnimation();
  const reduxDispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  useEffect(() => {
    setTotalPrice(
      cart.reduce((pre, curr) => pre + Number(curr.price) * curr.qty, 0)
    );
    controlMethod.start({
      opacity: [0, 1],
      transition: { type: 'spring', duration: 0.9 },
    });
  }, [cart]);
  return (
    <>
      <div
        className="w-full h-full absolute top-0 left-0 bg-black opacity-90"
        onClick={() => reduxDispatch(cartCloseOrOpen())}
      ></div>
      <motion.div
        variants={{
          hidden: { x: 400 },
          visible: { x: 0 },
        }}
        animate="visible"
        initial="hidden"
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-[500px] min-h-screen bg-slate-700 absolute top-0 right-0"
      >
        <div className="flex justify-between items-center px-[2rem] ">
          <h1 className="text-center font-bold text-3xl">Cart</h1>
          <button
            onClick={() => reduxDispatch(cartCloseOrOpen())}
            className="button mt-1 px-4"
          >
            X
          </button>
        </div>

        <h1 className="text-center font-bold text-2xl">
          Total Price: Rs{' '}
          <motion.span animate={controlMethod}>{totalPrice}</motion.span> /-
        </h1>
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
          {cart?.map((product) => (
            <motion.section
              key={product.id}
              whileInView={{ scale: 1.1 }}
              className="bg-white w-[90%] border-[3px] border-violet-600 mt-10 rounded-md"
            >
              <div className="flex gap-5 items-center">
                <img
                  className="w-[40%] object-cover rounded-md"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="flex flex-col">
                  <p className="text-neutral-950 font-bold text-xl">
                    {product.name}
                  </p>
                  <div className="flex">
                    <div className="flex">
                      <button
                        onClick={() => {
                          reduxDispatch(
                            changeQty({
                              qty: product.qty - 1,
                              id: product.id,
                            })
                          );
                        }}
                        className="button"
                      >
                        -
                      </button>
                      <motion.button className="button">
                        {product.qty}
                      </motion.button>
                      <button
                        onClick={() => {
                          reduxDispatch(
                            changeQty({
                              qty: product.qty + 1,
                              id: product.id,
                            })
                          );
                        }}
                        className="button"
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <button className="button bg-transparent text-black">
                        RS {product.price * product.qty}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.section>
      </motion.div>
    </>
  );
};

export default Cart;
