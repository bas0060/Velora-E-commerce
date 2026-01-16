// import React, { useState } from 'react';
// // import './App.css';

// const RoadMap = () => {
//   const [activeNode, setActiveNode] = useState(null);

//   const handleNodeClick = (id) => {
//     setActiveNode(id);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800 py-10">
//       <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
//         {/* Milestone 1 */}
//         <div
//           className={`timeline-node ${activeNode === 'M1' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
//           onClick={() => handleNodeClick('M1')}
//         >
//           <span className="font-bold">M1</span>
//           <p className="text-xs">Intro to Programming & JavaScript</p>
//         </div>
//         <div className="timeline-line"></div>

//         {/* Milestone 2 */}
//         <div
//           className={`timeline-node ${activeNode === 'M2' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
//           onClick={() => handleNodeClick('M2')}
//         >
//           <span className="font-bold">M2</span>
//           <p className="text-xs">Setting up your environment (VS Code, Git)</p>
//         </div>
//         <div className="timeline-line"></div>

//         {/* Milestone 3 */}
//         <div
//           className={`timeline-node ${activeNode === 'M3' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
//           onClick={() => handleNodeClick('M3')}
//         >
//           <span className="font-bold">M3</span>
//           <p className="text-xs">JavaScript syntax basics (variables, data types)</p>
//         </div>
//         <div className="timeline-line"></div>

//         {/* Milestone 4 */}
//         <div
//           className={`timeline-node ${activeNode === 'M4' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
//           onClick={() => handleNodeClick('M4')}
//         >
//           <span className="font-bold">M4</span>
//           <p className="text-xs">Intro project: Display a greeting message</p>
//         </div>
//         <div className="timeline-line"></div>

//         {/* Milestone 5 */}
//         <div
//           className={`timeline-node ${activeNode === 'M5' ? 'bg-purple-700 text-white' : 'bg-white text-black'}`}
//           onClick={() => handleNodeClick('M5')}
//         >
//           <span className="font-bold">M5</span>
//           <p className="text-xs">Intro project: Display a greeting message</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoadMap;


import React, { useRef, useState, useEffect } from "react";
import productData from "../data/productData";
import ProductCard from "./ProductCard";
import chevLeft from "../assets/icons/chevronLeft.svg";
import chevRight from "../assets/icons/chevronRight.svg";

const ShopTopProduct = ({ category, selected, products = [] }) => {
  if (!category) return null;
  if (selected !== category) return null;

  const items = products && products.length ? products : productData;
  const topProducts = items.filter((p) => p.isTopProduct === true);
  const displayProducts = topProducts.length ? topProducts : items;
  if (!displayProducts || displayProducts.length === 0) return null;

  const scrollRef = useRef(null);

  // State to track window width and control carousel behavior
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect to update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine the number of products to show based on screen width
  const getDisplayedProducts = () => {
    if (windowWidth >= 1024) {
      // Desktop: More than 8 products, show 8 by default
      return displayProducts.slice(0, 8);
    } else if (windowWidth >= 768) {
      // iPad: More than 4 products, show 4 by default
      return displayProducts.slice(0, 4);
    } else {
      // Mobile: More than 2 products, show 2 by default
      return displayProducts.slice(0, 2);
    }
  };

  const displayedProducts = getDisplayedProducts();

  // Pair products into columns (each column holds 2 products: top & bottom)
  const pairs = [];
  for (let i = 0; i < displayedProducts.length; i += 2) {
    pairs.push([displayedProducts[i], displayedProducts[i + 1]]);
  }

  // Scroll by one column (one pair) so both top/bottom move together
  const scrollNext = () => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth + 20;
    container.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth + 20;
    container.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  // Calculate whether we should enable chevron functionality
  const isChevronActive = () => {
    if (windowWidth >= 1024 && displayProducts.length > 2) return true; // Desktop: More than 8 products
    if (windowWidth >= 768 && displayProducts.length > 2) return true;  // iPad: More than 4 products
    if (windowWidth < 768 && displayProducts.length > 2) return true;   // Mobile: More than 2 products
    return false;
  };

  return (
    <section className="bg-[#F8F8F8] py-8">
      <div className="w-full flex flex-col gap-y-8">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-3">
              <div className="bg-[#A1C249] w-4 h-8"></div>
              <p className="text-[1.125rem] font-medium text-[#1A1A1A]">{category}</p>
            </div>
            <h3 className="font-medium text-4xl leading-6 text-[#1A1A1A]">{`Top ${category} Products`}</h3>
          </div>

          {/* Chevron buttons should always be there, but only work when chevron functionality is enabled */}
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className={`px-3 h-10 md:h-full md:p-4 my-auto rounded-full bg-white shadow ${!isChevronActive() ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isChevronActive()}
            >
              <img
                src={chevLeft}
                alt="left"
                className="w-4 aspect-square md:w-6 md:py-1"
              />
            </button>
            <button
              onClick={scrollNext}
              className={`px-3 h-10 md:h-full md:p-4 my-auto rounded-full bg-white shadow ${!isChevronActive() ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isChevronActive()}
            >
              <img
                src={chevRight}
                alt="right"
                className="w-4 aspect-square md:w-6 md:py-1"
              />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-hide w-full"
          style={{ padding: 0 }}
        >
          {pairs.map((pair, index) => (
            <div key={index} className="snap-start w-full md:w-[50%] lg:min-w-[23%] flex flex-col gap-12">
              {pair[0] && <ProductCard product={pair[0]} />}
              {pair[1] && <ProductCard product={pair[1]} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopTopProduct;



"use client"
import { useState } from "react"; // Import useState to manage the email state
import { Button } from "@/components/ui/button/button";
import { getFullYear } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ContactService } from "@/services/contact.service";
import { AxiosError } from "axios";

export const Footer = () => {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (email) {

      try {
        // Attempt to subscribe the user
        const subscribeResponse = await ContactService.subscribeToNewsletter(email);

        if (subscribeResponse.data) {
          alert("Successfully subscribed!"); // Show success message
        }
      } catch (error: unknown) {

        if (error instanceof AxiosError) {
          const message =
            error.response?.data?.message || 'Something went wrong. Please try again.';

          console.error('API error:', message);
        console.log("Error subscribing to newsletter:", error.response);
      }
          else {
          alert("Error subscribing to newsletter"); 
        }
      }
    }
  };

  return (
    <footer className="bg-[#00010C] min-[1000px]:p-[120px] md:p-14 sm:p-10 p-5 text-white space-y-20 border-t border-gray-100">
      <div className="flex justify-between gap-10 flex-wrap">
        <div className="flex flex-col gap-2 w-[23rem]">
          <Image
            src="/images/kinel-logo.webp"
            alt="Kinel Logo"
            width={172}
            height={30}
            className="md:w-40 w-20 sm:h-9 h-5"
          />
          <p className="text-[#959698] font-reddit sm:text-base text-sm">
            Kinel is a modern learning platform helping you build real-world
            tech skills. Learn with structure, mentorship, and community.
          </p>
        </div>
        {/* Newsletter section */}
        <div className="flex gap-5 flex-col">
          <h2 className="sm:text-2xl text-xl font-bold font-reddit">
            Join Our Newsletter
          </h2>
          <p className="text-[#959698] font-reddit sm:text-base text-sm">
            Stay updated on new programs, discounts, and community events.
          </p>
          <form className="flex gap-3 min-[500px]:flex-row flex-col" onSubmit={handleSubscribe}>
            <input
              placeholder="Your email address"
              className="rounded-[32px] pl-4 bg-[#E0E0E1] w-full outline-none border-none h-10 text-black"
              value={email}
              required
              onChange={handleEmailChange}
              type="email"
            />
            <div>
              <Button
                onClick={handleSubscribe}
                type="submit"
                className="gradient-border relative rounded-[32px] text-[#0B0900] px-7 shadow-fancy"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-between gap-10 font-reddit flex-wrap">
        <div className="space-y-3">
          <h5 className="font-semibold sm:text-lg text-base">Quicklinks</h5>
          <ul className="space-y-3 sm:text-base text-sm">
            <li>
              <Link href="/" className="text-[#959698]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/programs" className="text-[#959698]">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="text-[#959698]">
                About us
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="text-[#959698]">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-semibold sm:text-lg text-base">Legal</h5>
          <ul className="space-y-3 sm:text-base text-sm">
            <li>
              <Link href="/privacy-policy" className="text-[#959698]">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="text-[#959698]">
                Terms of service
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="text-[#959698]">
                Cookie policy
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="text-[#959698]">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-semibold sm:text-lg text-base">Socials</h5>
          <ul className="space-y-3 sm:text-base text-sm">
            <li>
              <Link 
                href="https://www.linkedin.com/company/kinel/?viewAsMember=true" 
                // target="_blank" 
                className="text-[#959698]">
                Linkedin
              </Link>
            </li>
            <li>
              <Link 
                href="https://www.instagram.com/heykinel"  
                // target="_blank" 
                className="text-[#959698]">
                Instagram
              </Link>
            </li>
            <li>
              <Link 
                href="https://www.facebook.com/share/1BuXKtBhKH/?mibextid=wwXIfr" 
                // target="_blank" 
                className="text-[#959698]">
                Facebook
              </Link>
            </li>
            <li>
              <Link 
                href="https://x.com/heykinel"  
                // target="_blank" 
                className="text-[#959698]">
                X (twitter)
              </Link>
            </li>
            <li>
              <Link 
                href="https://www.tiktok.com/@heykinel1?_r=1&_t=ZS-934HpURfaMx"
                // target="_blank"
                className="text-[#959698]"
              >
                TikTok
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-semibold sm:text-lg text-base">Contact</h5>
          <ul className="space-y-3 sm:text-base text-sm">
            <li>hello@kinelacademy.com</li>
            <li>+2348066441262</li>
            <li>Ikeja GRA, Lagos, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#959698] pt-5 text-[#959698] font-reddit sm:text-base text-sm">
        <p>© {getFullYear()}. All rights reserved</p>
      </div>
    </footer>
  );
};


const PrivacyPolicy = () => {
  return (
    <div className="min-[1000px]:p-[120px] md:p-14 sm:p-10 p-5 min-[1000px]:py-[120px] py-20 bg-background-1">
      <section>
        <div className="space-y-5 text-center">
          <h1 className="font-bold md:text-7xl sm:text-4xl text-3xl text-gray-100 font-reddit">
            Privacy Policy
          </h1>
          <p className="text-gray-1 font-reddit sm:text-xl text-sm">
            Kinel Academy (“Kinel”, “we”, “our”, or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website, student portal, mentor portal, and services. <br />

          </p>
        </div>
        <div className="bg-gray-100 rounded md:p-20 sm:p-10 p-5 space-y-8 mt-20">
          <p className="text-gray-1 font-reddit">
            Last updated: January 14th, 2026
          </p>
          <p className="font-reddit sm:text-xl text-sm">
            By using Kinel Academy, you agree to the practices described in this policy.
          </p>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              1. Information We Collect
            </h4>
            <p className="font-reddit sm:text-xl text-sm">
              We collect information to provide you with a better learning experience.
            </p>
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              a. Information You Provide Directly
            </h4>

            <p className="font-reddit sm:text-xl text-sm">
              When you sign up or interact with Kinel, we may collect:
            </p>
            <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
              <li>
                Full name
              </li>
              <li>
                Email address
              </li>
              <li>Phone number</li>
              <li>Password (encrypted) </li>
              <li>Profile information (photo, bio, learning interests)</li>
              <li>Payment information (processed securely via third-party providers)</li>
              <li>Messages, assignments, and feedback submitted on the platform</li>
            </ul>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              b. Information Collected Automatically
            </h4>
            <p className="font-reddit sm:text-xl text-sm">
              We may collect:
            </p>
            <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
              <li>
                Device information (browser type, operating system)
              </li>
              <li>
                IP address
              </li>
              <li>
                Pages visited and actions taken on the platform
              </li>
              <li>
                Login activity and usage data
              </li>
            </ul>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              2. How We Use Your Information
            </h4>
            <p className="sm:text-xl text-sm">
              We use your information to:
            </p>
            <div className="flex flex-col gap-y-6">
              <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
                <li>Create and manage your Kinel account</li>
                <li>Enroll you in programs and cohorts</li>
                <li>Assign mentors and track learning progress</li>
                <li>Communicate with you (emails, updates, support)</li>
                <li>Process payments and issue certificates</li>
                <li>Improve our courses, platform, and user experience</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
              <p className="text-gray-1 sm:text-xl text-sm mt-2">
                We do <span className="font-bold text-black">not</span> sell your personal data.
              </p>
            </div>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              3. Mentors and Program Interaction
            </h4>
            <p className="sm:text-xl text-sm">
              To deliver our services:
            </p>
            <div className="flex flex-col gap-y-6">
              <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
                <li>
                  Mentors may access student profiles, assignments, and progress
                </li>
                <li>Students may interact with mentors and cohort members</li>
                <li>
                  All interactions are monitored to ensure safety and professionalism
                </li>
              </ul>
              <p className="text-gray-1 sm:text-xl text-sm">
                Mentors are bound by confidentiality obligations.
              </p>
            </div>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              4. Cookies and Tracking
            </h4>
            <p className="sm:text-xl text-sm">
              We use cookies and similar technologies to:
            </p>
            <div className="flex flex-col gap-y-6">
              <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
                <li>Remember your login session</li>
                <li>
                  Understand how users interact with our platform
                </li>
                <li>Improve performance and usability</li>
              </ul>
              <p className="text-gray-1 sm:text-xl text-sm">
                Mentors are bound by confidentiality obligations.
              </p>
            </div>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              5. Payments and Third-Party Services
            </h4>
            <div className="flex flex-col">
              <p className="sm:text-xl text-sm leading-[100%]">
                Payments are processed through trusted third-party providers.
              </p>
              <p className="sm:text-xl text-sm leading-[100%]">
                We do not store your card or banking details on our servers.
              </p>
              <p className="sm:text-xl text-sm mt-2">
                We may also use third-party tools for:
              </p>
            </div>
            <div className="flex flex-col gap-y-6">
              <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
                <li>Email communication</li>
                <li>
                  Analytics
                </li>
                <li>Hosting and infrastructure</li>
              </ul>
              <p className="text-gray-1 sm:text-xl text-sm">
                These providers only access data necessary to perform their services and are required to protect your information.
              </p>
            </div>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              6. Data Storage and Security
            </h4>
            <p className="sm:text-xl text-sm">
              We take security seriously and use:
            </p>
            <div className="flex flex-col gap-y-6">
              <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
                <li>Encrypted connections (SSL)</li>
                <li>
                  Secure servers
                </li>
                <li>Access controls and monitoring</li>
              </ul>
              <p className="text-gray-1 sm:text-xl text-sm">
                While no system is 100% secure, we take reasonable steps to protect your data from unauthorized access, loss, or misuse.
              </p>
            </div>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              7. Your Rights
            </h4>
            <p className="sm:text-xl text-sm">
              You have the right to:
            </p>
            <div className="flex flex-col gap-y-6">
              <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
                <li>Access your personal data</li>
                <li>
                  Update or correct your information
                </li>
                <li>Request deletion of your account</li>
                <li>Opt out of non-essential communications</li>
              </ul>
              <p className="text-gray-1 sm:text-xl text-sm">
               To exercise these rights, contact us at <a className="text-black" href="mailto:hello@kinelacademy.com">hello@kinelacademy.com</a>.
              </p>
            </div>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              8. Data Retention
            </h4>
            <p className="sm:text-xl text-sm">
              We retain your information only as long as necessary to:
            </p>
            <div className="flex flex-col gap-y-6">
              <ul className="space-y-3 text-gray-1 list-inside list-disc sm:text-xl text-sm">
                <li>Provide our services</li>
                <li>
                  Comply with legal obligations
                </li>
                <li>Resolve disputes</li>
                <li>Enforce agreements</li>
              </ul>
              <p className="text-gray-1 sm:text-xl text-sm">
                When no longer needed, data is securely deleted or anonymized.
              </p>
            </div>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              9. Children’s Privacy
            </h4>
            <p className="text-gray-1 sm:text-xl text-sm">
              Kinel Academy is not intended for children under the age of 16. <br />
              We do not knowingly collect personal data from minors.
            </p>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              10. Changes to This Policy
            </h4>
            <div className="text-gray-1 flex flex-col gap-y-2">
              <p className="sm:text-xl text-sm">
              We may update this Privacy Policy from time to time. <br />
              Any changes will be posted on this page with an updated “Last updated” date.
              </p>
              <p className="sm:text-xl text-sm">Continued use of Kinel after changes means you accept the updated policy.</p>
            </div>
          </div>
          <div className="space-y-3 font-reddit">
            <h4 className="font-reddit font-semibold sm:text-xl text-lg text-[#353738]">
              11. Contact Us
            </h4>
            <p className="text-gray-1 sm:text-xl text-sm">
              If you have questions or concerns about this Privacy Policy or your data, please contact us:
            </p>
            <div className=" flex flex-col">
              <h5 className="font-semibold sm:text-xl text-[.55rem]">Kinel Academy</h5>
              <p className="text-gray-1 sm:text-xl text-sm">📧 Email: <a href="mailto:hello@kinelacademy.com">hello@kinelacademy.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
