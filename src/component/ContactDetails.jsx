import React, { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const ContactDetails = () => {
  const [message, setMessage] = useState('');
  const [phoneValue, setPhoneValue] = useState(''); // value from phone input (may include country code)
  const [phoneNormalized, setPhoneNormalized] = useState(''); // E.164 normalized
  const [phoneError, setPhoneError] = useState('');
  const [currentCountry, setCurrentCountry] = useState('ng');
  const [currentDial, setCurrentDial] = useState('234');
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePhoneChange = (value, data) => {
    // value: string from react-phone-input-2 (usually without +),
    // data: { countryCode, dialCode }
    const dial = data && data.dialCode ? data.dialCode : '';
    const country = data && data.countryCode ? data.countryCode : currentCountry;
    if (country) setCurrentCountry(country);
    if (dial) setCurrentDial(dial);
    const digits = (value || '').replace(/\D/g, '');

    // extract national part (digits after dial code)
    let national = digits.startsWith(dial) ? digits.slice(dial.length) : digits;

    // enforce per-country limits: Nigeria -> max 10 digits after country code
    if (data && data.countryCode === 'ng') {
      if (national.length > 10) {
        national = national.slice(0, 10);
        setPhoneError('Number is already complete');
      } else {
        setPhoneError('');
      }
    } else {
      // generic: cap at 15 digits
      if (national.length > 15) national = national.slice(0, 15);
      setPhoneError('');
    }

    const composed = dial + national; // e.g. '2348012345678'
    const withPlus = composed ? `+${composed}` : '';
    setPhoneValue(withPlus);

    const parsed = parsePhoneNumberFromString(withPlus);
    if (parsed && parsed.isValid()) {
      setPhoneNormalized(parsed.number); // E.164
    } else {
      setPhoneNormalized('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const phoneToSend = phoneNormalized || phoneValue || '';
    alert('Message Sent: ' + message + '\nPhone: ' + phoneToSend);
    // Add further logic for API or data submission once available
  };

  const getNationalLength = (value = phoneValue) => {
    const raw = (value || '').replace(/^\+/, '');
    const dial = currentDial || '';
    const national = raw.startsWith(dial) ? raw.slice(dial.length) : raw;
    return national.replace(/\D/g, '').length;
  };

  const handleKeyDown = (e) => {
    // allow control keys
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const isDigit = /[0-9]/.test(e.key);
    if (!isDigit) return;

    const max = currentCountry === 'ng' ? 10 : 15;
    const len = getNationalLength();
    if (len >= max) {
      e.preventDefault();
      setPhoneError('Number is already complete');
    }
  };

  const handlePaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
    const digits = paste.replace(/\D/g, '');
    if (!digits) return;
    const max = currentCountry === 'ng' ? 10 : 15;
    const len = getNationalLength();
    if (len + digits.length > max) {
      e.preventDefault();
      setPhoneError('Number is already complete');
      // optionally, we could programmatically insert allowed portion, but keeping simple
    }
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
                <div className="flex flex-col gap-y-3 w-full md:w-3/4">
                  <label htmlFor="phone" className="block text-gray-700">Phone number:</label>

                  <PhoneInput
                    country={'ng'}
                    value={phoneValue.replace(/^\+/, '')}
                    onChange={handlePhoneChange}
                    containerClass="w-full react-phone-container"
                    inputClass="w-full p-2 md:p-3 border bg-[#F8F8F8] border-gray-400 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#A1C249]"
                    buttonClass="react-phone-flag-button"
                    dropdownClass="react-phone-dropdown"
                    inputProps={{ name: 'phone', required: true, autoFocus: false, onKeyDown: handleKeyDown, onPaste: handlePaste }}
                    specialLabel={''}
                    countryCodeEditable={false}
                  />

                  {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}

                  {currentCountry === 'ng' && (
                    <p className="text-sm text-gray-500 mt-2">
                      {(() => {
                        const raw = phoneValue.replace(/^\+/, '');
                        const national = raw.startsWith(currentDial) ? raw.slice(currentDial.length) : raw;
                        const remaining = Math.max(0, 10 - national.length);
                        return `${remaining} digits remaining`;
                      })()}
                    </p>
                  )}
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
