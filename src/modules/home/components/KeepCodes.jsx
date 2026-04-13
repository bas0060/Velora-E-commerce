import React, { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';

const ContactDetails = () => {
  const [message, setMessage] = useState('');
  const [phoneRaw, setPhoneRaw] = useState(''); // digits only
  const [phoneCountry, setPhoneCountry] = useState('+234'); // default Nigeria
  const [phoneError, setPhoneError] = useState('');
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setPhoneRaw(raw);

    if (phoneCountry === '+234') {
      if (raw.length > 11) {
        setPhoneError('Number is already complete');
        return;
      }

      if (raw.length === 11 && !/^0\d{10}$/.test(raw)) {
        setPhoneError('Please enter a valid Nigerian phone number (11 digits, e.g. 08012345678).');
      } else {
        setPhoneError('');
      }
    } else {
      // Basic generic validation for other countries (min 6 digits)
      if (raw.length > 0 && raw.length < 6) setPhoneError('Please enter a valid phone number.');
      else setPhoneError('');
    }
  };

  const handleCountryChange = (e) => {
    setPhoneCountry(e.target.value);
    setPhoneError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Message Sent: ' + message + '\nPhone: ' + phone);
    // Add further logic for API or data submission once available
  };

  return (
    <section className="bg-[#F8F8F8] pb-16">
      <div className="w-[90%] m-auto flex flex-col gap-y-6 md:gap-y-12">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-3">
            <div className="bg-[#A1C249] w-4 h-8" />
            <p className="text-[1.125rem] font-medium text-[#1A1A1A]">Contact</p>
          </div>
          <h3 className="font-medium text-2xl md:text-4xl leading-6 text-[#1A1A1A]">Reach out to us anytime anyday</h3>
        </div>
        <div className="flex flex-col gap-y-10 md:flex-row md:items-center justify-between">
          {/* Contact Form Section */}
          <div className="w-full lg:w-5/8 px-5 py-8 md:py-16 md:pl-10 md:pr-30 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
              <div className="flex flex-col md:flex-row items-center gap-x-6">
                {/* Name Field */}
                <div className="flex flex-col gap-y-3 w-full md:w-3/5">
                  <label htmlFor="name" className="block text-gray-500">Name:</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full p-2 md:p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C249]"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-y-3 w-full">
                  <label htmlFor="email" className="block text-gray-500">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full p-2 md:p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C249]"
                  />
                </div>
              </div>

              {/* Phone Number Field with Country Code and Flag */}
              <div className="flex flex-col gap-y-3 w-full md:w-2/3">
                <label htmlFor="phone" className="block text-gray-700">Phone number:</label>

                <div className="flex gap-x-">
                  <select
                    value={phoneCountry}
                    onChange={handleCountryChange}
                    className="p-2 md:p-3 border border-gray-400 rounded-l-md bg-white"
                    aria-label="Country code"
                  >
                    <option value="+234">NG +234</option>
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                  </select>

                  <input
                    type="tel"
                    inputMode="tel"
                    value={phoneRaw}
                    onChange={handlePhoneChange}
                    placeholder={phoneCountry === '+234' ? 'e.g., 08012345678' : 'Phone number'}
                    className="w-full p-2 md:p-3 border border-gray-400 rounded-r-md focus:outline-none"
                  />
                </div>

                {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-y-3">
                <label htmlFor="message" className="block text-gray-700">Your Message:</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={message} 
                  onChange={handleMessageChange} 
                  required 
                  className="w-full max-h-20 min-h-16 p-2 md:p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C249]"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full md:w-2/3 py-3 bg-[#A1C249] cursor-pointer text-white rounded-[30px] hover:bg-[#7f9812]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="w-full lg:w-1/3 flex flex-col gap-y-6 px-5 md:px-8 py-8 md:py-14 rounded-lg shadow-md">
            <div className="flex flex-col gap-y-4 pb-4">
              <div className="flex items-center gap-x-4">
                <div className="text-white bg-[#A1C249] p-3 rounded-full">
                  <FaDollarSign size={20}/>   
                </div>
                <h3 className="text-xl font-semibold ">Call To Us</h3>  
              </div> 
              <p className="">We are available 24/7, 7 days a week.</p>
              <p className=" ">Phone: +8801611112222</p>
            </div>
            
            <div className="flex flex-col gap-y-4 pt-8 border-t-2 border-gray-400">
              <div className="flex items-center gap-x-4">
                <div className="text-white bg-[#A1C249] p-3 rounded-full">
                  <FaDollarSign size={20}/>   
                </div>
                <h3 className="text-xl font-semibold ">Write to Us</h3>  
              </div>
              <p className="">Fill out our form, and we will contact you within 24 hours.</p>
              <div className="flex items-center gap-x-1">
                <p className="">Emails:</p>
                <a href="mailto:makindeabdulbasit@gmail.com" className="text-black hover:underline">makindeabdulbasit@gmail.com</a>
              </div>
              <div className="flex items-center gap-x-1">
                <p className="">Emails:</p>
                <a href="mailto:makindeabdulbasit@gmail.com" className="text-black hover:underline">makindeabdulbasit@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
