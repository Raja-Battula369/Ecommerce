import { useEffect, useState } from 'react';
import { RxMoon, RxSun } from 'react-icons/rx';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  cartCloseOrOpen,
  logout,
  wishListCloseOrOpen,
} from '../../lib/store/features';
import { useNavigate } from 'react-router-dom';
import useOnScroll from '../hooks/useonScroll';
import toast, { Toaster } from 'react-hot-toast';
import Search from './Search';

const Header = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const cartLength = useSelector((state) => state.cart?.length);
  const wishListLength = useSelector((state) => state.wishList?.length);
  const name = useSelector((state) => state.name);
  const token = useSelector((state) => state.Token);

  const onScroll = useOnScroll();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav
      className={`dark:bg-black dark:text-white flex justify-between items-center py-[0.5rem] px-[1rem] sticky top-0 bg-white  hover:shadow-xl transition ${
        onScroll > 20 && 'shadow-xl'
      }`}
    >
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate('/')}
      >
        Eco😉
      </h1>
      {token ? <Search /> : null}

      <div className="flex items-center gap-2 ">
        {token ? (
          <select
            className="py-2 w-[100px] rounded-md text-violet-600 bg-slate-200  dark:bg-white"
            onChange={(e) =>
              e.target.value === 'logout' ? dispatch(logout()) : null
            }
          >
            <option value={name}>{name}</option>
            <option value="logout">Logout</option>
          </select>
        ) : null}
        {theme === 'light' ? (
          <button
            onClick={() => {
              handleTheme();
              toast('dark mode!', {
                icon: '🌙',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              });
            }}
            className="button"
          >
            <RxMoon size={24} />
          </button>
        ) : (
          <button
            onClick={() => {
              handleTheme();
              toast('light mode!', {
                icon: '🌞',
                style: {
                  borderRadius: '10px',
                  background: '#fff',
                  color: '#333',
                },
              });
            }}
            className="button"
          >
            <RxSun size={24} />
          </button>
        )}
        {token ? (
          <>
            <div className="relative">
              <button
                onClick={() => dispatch(wishListCloseOrOpen())}
                className="button"
              >
                <FiHeart size={24} />
              </button>
              <span className="bg-red-500 font-semibold text-md rounded-[50%] absolute top-0 right-0 h-[20px] w-[20px] justify-center flex items-center">
                {wishListLength}
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => dispatch(cartCloseOrOpen())}
                className="button"
              >
                <FiShoppingCart size={24} />
              </button>
              <span className="bg-red-500 font-semibold text-md rounded-[50%] absolute top-0 right-0 h-[20px] w-[20px]  flex justify-center items-center">
                {cartLength}
              </span>
            </div>
          </>
        ) : null}
      </div>
      <Toaster />
    </nav>
  );
};

export default Header;
