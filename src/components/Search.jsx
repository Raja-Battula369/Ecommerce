/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { memo, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import useDeboune from '../hooks/useDebounce';
import useProducts from '../hooks/useProducts';
import { Link } from 'react-router-dom';

const Search = () => {
  const [value, setValue] = useState('');
  const [searchedProducts, setSeachedProducts] = useState([]);

  const deboundeValue = useDeboune(value, 1000);
  const { products, fetchProductsData } = useProducts();
  console.log('1');
  const handleSearchedProducts = () => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(deboundeValue)
    );
    setSeachedProducts(filteredProducts);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);
  useEffect(() => {
    handleSearchedProducts();
  }, [deboundeValue]);

  return (
    <div className="relative max-md:hidden">
      <input
        value={value}
        className="input w-[400px] px-2 dark:bg-black "
        placeholder="search here"
        onChange={(e) => setValue(e.target.value)}
      />
      <FiSearch className="button absolute top-0 right-0 py-3 border-violet-600" />
      <div className=" absolute  top-12 left-0 z-10 w-full h-fit bg-slate-300 dark:bg-black rounded-md px-2">
        {deboundeValue
          ? searchedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => setValue('')}
              >
                <p className="hover:text-violet-600">
                  {deboundeValue}
                  <strong>
                    {product.title.toLowerCase().split(deboundeValue)[1]}
                  </strong>
                </p>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default memo(Search);
