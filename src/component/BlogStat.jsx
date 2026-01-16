// BlogStat.jsx
import React from 'react';
import { FaStore, FaDollarSign, FaShoppingBag, FaRegMoneyBillAlt } from 'react-icons/fa';

const BlogStat = () => {
  // Hardcoded statistics with icons
  const stats = [
    {
      label: 'Sellers active on our site',
      value: '10.5k',
      imgSrc: <FaStore size={30}/>,
    },
    {
      label: 'Monthly Product Sale',
      value: '33k',
      imgSrc: <FaDollarSign size={30}/>,
    },
    {
      label: 'Customers active on our site',
      value: '45.5k',
      imgSrc: <FaShoppingBag size={30}/>,
    },
    {
      label: 'Annual gross sale in our site',
      value: '25k',
      imgSrc: <FaRegMoneyBillAlt size={30}/>,
    }
  ];

  return (
    <div className="bg-[#F8F8F8] pb-16">
        <div className="w-[90%] flex flex-col m-auto gap-y-5 md:gap-y-8">
            <div className="flex items-center gap-x-3">
                <div className="bg-[#A1C249] w-4 h-11" />
                <p className="text-[25px] md:text-[2.125rem] font-medium text-[#1A1A1A]">Site Statistics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-10">
                {stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-y-8 items-center text-center rounded-2xl p-6 hover:text-white border-3 hover:bg-[#A1C249] border-gray-200">
                    <div className="bg-[#def5a0] hover:bg-[#A1C249] p-2 rounded-full hover:text-white ">
                     {stat.imgSrc} 
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <p className='text-[25px] md:text-[35px] font-bold leading-8'>{stat.value}</p>
                        <h3 className="font-normal text-[1.15rem]">{stat.label}</h3>
                    </div>    
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default BlogStat;
