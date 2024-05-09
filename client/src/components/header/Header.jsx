import React, { useState, useEffect } from 'react';
import process from 'process';
import hm from '../../assets/hm.jpg';
import dr from '../../assets/dr.png';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function Header() {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

        if (data !== null) {
          setCurrentUserName(data.username);
          // console.log(data);
        } else {
   
          navigate('/auth/sign-in')
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setCurrentUserName]);

 

  useEffect(() => {

    const setupProvider = async () => { }
    let signer = null;
    let Provider;
    if (window.ethereum == null) {
      console.log("Meta mask not installed; Using read only defaults")
      Provider = ethers.getDefaultProvider;
      console.log(Provider);
    }
    else {
      Provider = new ethers.BrowserProvider(window.ethereum)
      signer = Provider.getSigner();
    }

    setupProvider();
  }, [])

  return (
    <div
    
      className="bg-gradient-to-r from-gray-200 to-cyan-900 ... pt-32 px-14 relative isolate  lg:px-8"
    >
      <div className="px-12 grid grid-cols-2 gap-2">
       
        <div>
          <div className="text-4xl text-cyan-900 font-mono text-bold pr-32 mt-24 text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Welcome! {currentUserName}
          </div>

          <div className="mx-auto max-w-2xl py-2 sm:py-48 lg:py-2">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            </div>
            <div className="text-">
              <h1 className="text-4xl font-bold font-sans  tracking-tight text-indigo-900 sm:text-6xl "
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
              >
                Healthcare System <br /> Based On Blockchain
              </h1>
              <p className="mt-6    text-lg leading-8 text-gray-600">
                Announcing our next round of funding. Explore more about our
                innovative Healthcare System based on Blockchain, revolutionizing the way we manage and secure healthcare data. 🚀
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/doctorlist"
                  className="rounded-md bg-cyan-950 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
        <div>
          <div className="ml-auto ">
            <img src={dr}  alt='Doctor' className=" ml-auto object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
}
