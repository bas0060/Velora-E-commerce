import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import member1 from '../assets/images/member1.svg'
import member2 from '../assets/images/member2.svg'
import member3 from '../assets/images/member3.svg'



const BlogTeam = () => {

  const teamMembers = [
    {
      name: 'Darlene Robertson',
      role: 'Founder & Chairman',
      image: member1, 
      linkedin: 'https://www.linkedin.com/in/darlenerobertson', 
      twitter: 'https://twitter.com/darlenerobertson', 
      instagram: 'https://instagram.com/darlenerobertson', 
    },
    {
      name: 'Brooklyn Simmons',
      role: 'Managing Director',
      image: member2,
      linkedin: 'https://www.linkedin.com/in/brooklynsimmons',
      twitter: 'https://twitter.com/brooklynsimmons',
      instagram: 'https://instagram.com/brooklynsimmons',
    },
    {
      name: 'Jacob Jones',
      role: 'Product Designer',
      image: member3, 
      linkedin: 'https://www.linkedin.com/in/jacobjones',
      twitter: 'https://twitter.com/jacobjones',
      instagram: 'https://instagram.com/jacobjones',
    },
  ];

  return (
    <section className='bg-[#F8F8F8] pb-16'>
        <div className="w-[90%] flex flex-col m-auto gap-y-8">
            <div className="flex flex-col gap-y-2 md:gap-y-4">
                <div className="flex items-center gap-x-3">
                    <div className="bg-[#A1C249] w-4 h-8" />
                    <p className="text-[1.125rem] font-medium text-[#1A1A1A]">Blog</p>
                </div>
                <h3 className="font-medium text-[25px] md:text-4xl leading-6 text-[#1A1A1A]">Meet the team</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col gap-y-4">
                    <img src={member.image} alt={member.name} className="" />
                    <div className="flex flex-col gap-y-1">
                        <h3 className='text-[25px] md:text-[2.1875rem] font-medium leading-8 tracking-[4%]'>{member.name}</h3>
                        <p className='text-[#A1A1A1] leading-6'>{member.role}</p>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <Link to={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={20} />
                        </Link>
                        <Link to={member.twitter} target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={20}/>
                        </Link>
                        <Link to={member.instagram} target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={20}/>
                        </Link>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default BlogTeam;
