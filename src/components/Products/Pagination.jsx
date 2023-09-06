const Pagination = ({ setPage, page, prodLen }) => {
  prodLen = Math.floor(prodLen / 5);

  const btnArray = Array.from({ length: prodLen }, (_, i) => i + 1);

  return (
    <div className="w-full flex flex-row justify-center gap-2 items-center mt-3">
      {btnArray.map((item, i) => (
        <button
          className={
            page === i + 1 ? 'button bg-violet-950 w-[4rem]' : 'button w-[4rem]'
          }
          onClick={() => setPage(item)}
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
