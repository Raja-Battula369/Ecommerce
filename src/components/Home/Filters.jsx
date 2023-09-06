import React, { useEffect, useState } from 'react';
import Product from '../Products/Products';

const Filters = () => {
  const categorys = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
  ];

  const [categoryFilter, setCategoryFilter] = useState({
    smartphones: false,
    laptops: false,
    fragrances: false,
    skincare: false,
    'home-decoration': false,
  });
  const [products, setProducts] = useState([]);

  const [filteredData, setFilteRedData] = useState([]);

  const fetchProductsData = async () => {
    const data = await fetch('https://dummyjson.com/products', {
      cache: 'force-cache',
    });
    const respone = await data.json();
    // console.log(respone.products);
    setProducts(respone.products);
  };

  const handleFilter = (type) => {
    setCategoryFilter((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const filterData = () => {
    if (
      !categoryFilter.fragrances &&
      !categoryFilter['home-decoration'] &&
      !categoryFilter.laptops &&
      !categoryFilter.skincare &&
      !categoryFilter.smartphones &&
      !categoryFilter.groceries
    ) {
      return setFilteRedData(products);
    }

    const newFilteredData = products.filter(
      (item) => categoryFilter[item.category]
    );

    setFilteRedData(newFilteredData);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);
  useEffect(() => {
    products && filterData();
  }, [categoryFilter, products]);

  return (
    <div>
      <div className="flex justify-center items-center mt-2 overflow-x-scroll  md:text-xl text-xs">
        {categorys.map((btn) => (
          <button
            style={{ backgroundColor: categoryFilter[btn] === true && 'black' }}
            key={btn}
            onClick={() => handleFilter(btn)}
            className="button whitespace-nowrap"
          >
            {btn}
          </button>
        ))}
      </div>
      <Product products={filteredData} />
    </div>
  );
};

export default Filters;
