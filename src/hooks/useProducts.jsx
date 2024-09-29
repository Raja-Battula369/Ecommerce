import React, { useState } from 'react';

const ProductsHook = () => {
  const [products, setProducts] = useState([]);

  const fetchProductsData = async () => {
    const data = await fetch('https://dummyjson.com/products?limit=150', {
      cache: 'force-cache',
    });
    const respone = await data.json();
    // console.log(respone.products);
    setProducts(respone.products);
  };

  return { products, fetchProductsData };
};

export default ProductsHook;
