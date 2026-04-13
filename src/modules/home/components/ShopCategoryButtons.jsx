const CategoryButtons = ({ categories = [], selected, setSelected }) => {

  // const categoryData = categories?.map(category => category.name)
  // console.log(categoryData)
  return (
    <div className="w-full flex flex-col lg:flex-col gap-2 md:flex-row md:items-center md:justify-between lg:w-55">
    {/* <div className="flex flex-col w-full gap-2 "> */}
      {categories?.map((cat) => (
        <button
          key={cat?._id}
          className={`w-full text-left lg:text-left py-1 md:py-2.25 font-medium 
            ${selected === cat?._id ? "text-[#A1C249]" : "text-[#A1A1A1]"}
          `}
          onClick={() => setSelected(cat?._id)}
        >
          {cat?.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
