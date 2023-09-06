import CarouselCard from './Carousel';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Product from '../Products/Products';
import Cart from '../Cart';
import { useSelector } from 'react-redux';
import WishList from '../WishList';
import Filters from './Filters';

const Home = () => {
  const isCartOpen = useSelector((state) => state.isCartOpen);
  const isWishListOpen = useSelector((state) => state.iswishListOpen);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="w-full overflow-scroll  dark:bg-black dark:text-white"
    >
      <CarouselCard />
      <section className="Products">
        <Filters />
        {isCartOpen && <Cart />}
        {isWishListOpen && <WishList />}
      </section>
    </motion.div>
  );
};

export default Home;
