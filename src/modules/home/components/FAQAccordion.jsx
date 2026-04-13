import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null); // Tracks the index of the open question

  // FAQs Data
  const faqs = [
    { question: 'Is there a free trial available?', answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' },
    { question: 'Can I change my plan later?', answer: 'Yes, you can change your plan anytime based on your requirements.' },
    { question: 'What is your cancellation policy?', answer: 'You can cancel at any time, and you will not be charged for the next billing cycle.' },
    { question: 'Can other info be added to an invoice?', answer: 'Yes, you can add custom information to your invoice as per your business requirements.' },
    { question: 'How does billing work?', answer: 'Billing is done on a monthly or annual subscription model, depending on your chosen plan.' },
    { question: 'How do I change my account email?', answer: 'To change your account email, go to your profile settings and update the email address.' }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the current section
  };

  return (
    <section className="bg-[#F8F8F8] pb-16">
        <div className="w-[90%] md:w-[60%] m-auto flex flex-col gap-y-10 pt-16">
            <div className="flex flex-col gap-y-2 text-center">
                <h2 className="text-2xl font-bold items-center">Frequently Asked Questions</h2>
                <p className="text-[1.25rem] text-[#667085] leading-7.5">Everything you need to know about the product and billing.</p>
            </div>
            <div className='flex flex-col gap-y-4'>
                {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg shadow">
                    <div
                    className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleAccordion(index)}
                    >
                    <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                    <span className="text-[.8rem] border p-1 rounded-full border-[#A1C249] text-[#A1C249]">
                        {openIndex === index ? <FaMinus /> : <FaPlus />} {/* Toggle icon */}
                    </span>
                    </div>
                    {openIndex === index && (
                    <div className="p-4 ">
                        <p className="text-[1.15rem] text-[#667085] leading-7.5">{faq.answer}</p>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default FAQAccordion;
