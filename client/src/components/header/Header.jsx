import React, { useState, useEffect } from 'react';
import process from 'process';
import hm from '../../assets/hm.jpg';
import dr from '../../assets/dr.png';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function Header() {
  const [currentUserName, setCurrentUserName] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

        if (data !== null) {
          setCurrentUserName(data.username);
          console.log(data);
        } else {
          alert('Unable to fetch previous details');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setCurrentUserName]);

  return (
    <div
      style={{
        backgroundImage: `url(${hm})`,
        backgroundSize: 'cover',
      }}
      className="relative isolate px-6 pt-2 lg:px-8"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Left side - Text/Button content */}
        <div>
          <div className="text-4xl text-slate-100 text-bold pr-32 mt-24 text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Welcome! {currentUserName}
          </div>

          <div className="mx-auto max-w-2xl py-2 sm:py-48 lg:py-2">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            </div>
            <div className="text-">
              <h1 className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-6xl">
                Healthcare System <br /> Based On Blockchain
              </h1>
              <p className="mt-6    text-lg leading-8 text-gray-600">
                Announcing our next round of funding. Explore more about our 
                innovative Healthcare System based on Blockchain, revolutionizing the way we manage and secure healthcare data. 🚀
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/department"
                  className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>

                <a href="https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/blockchain-hospitality" 
                className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div>
          <div className="ml-auto">
            <img src={dr} alt='Doctor' className="w-140 h-340 ml-auto object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
}
