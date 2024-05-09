import React, { useState, useEffect } from "react";
import PersonDataStorage from "../../artifacts/contracts/PersonDataStorage.sol/PersonalDataStorage.json";
import { ethers } from "ethers"

const products = [

  {
    id: 1,
    name: 'Surgery',
    href: '/doctorlist',
    imageSrc: 'https://th.bing.com/th/id/OIP.jgKpOP87VfUqHirbVZxH7wHaH6?w=154&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Pediatrics',
    href: '#',
    imageSrc: 'https://th.bing.com/th/id/OIP.Tz7CjltsRDs9ho0B2C9LXgAAAA?w=217&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Obstetrics and Gynecology',
    href: '#',
    imageSrc: 'https://th.bing.com/th?q=Doctor+Kids&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Dermatology',
    href: '#',
    imageSrc: 'https://th.bing.com/th/id/OIP.JJxXAqkEgzy-r70pFyvJ1QHaE7?w=264&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Neurology',
    href: '#',
    imageSrc: 'https://th.bing.com/th?q=Doctor+Standing&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },

  // More products...
]
export default function DepartmentList() {
  const [persondata, setPersondata] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {

      let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
      const url = "http://localhost:8545";
      console.log("Contract Address:", contractAddress);
      console.log("JSON-RPC URL:", url);

      const provider = new ethers.JsonRpcProvider(url);

      console.log("Provider:", provider);

      const contract = new ethers.Contract(
        contractAddress,
        PersonDataStorage.abi,
        provider
      );
      console.log("Contract:", contract);

      setContract(contract);
      setProvider(provider);

      console.log("Contract Address (after setting state):", contract.getAddress());
      console.log("////////////////////////////////////////////////////////////////")
   


    };

    loadProvider();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        if (contract) {
          const pdata = await contract.getPersonalData();
          console.log("Personal data", pdata);
        }  
      } catch (error) {
        console.error("Error fetching personal data:", error);
      }
    })();
  }, [contract]);
  
  
  useEffect(() => {
    const fetchBlockNumber = async () => {
      if (provider) {
        try {
          const blockNumber = await provider.getBlockNumber();
          console.log("Block Number:", blockNumber);
        } catch (error) {
          console.error("Error fetching block number:", error);
        }
      }
    };

    fetchBlockNumber();
  }, [provider]);


  return (
    <div className="bg-slate-300  mx-auto justify-cneter ">
      <div className="mx-auto   max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-6xl font-serif pb-10 font-bold tracking-tight text-green-900 hover:text-blue-500 transition-colors duration-300">
          Department
        </h2>


        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`
              group relative rounded-lg bg-white  py-20 mr-8 p-6 border border-green-500 shadow-md lg:col-span-2
              group bg-cover bg-center bg-no-repeat
              transition-transform duration-300 transform hover:scale-105
            `}



              style={{
                backgroundImage: `url(${product.imageSrc})`, borderRadius: '21px',
                background: '#e0e0e0',
                boxShadow: '32px 32px 65px #7b7b7b, -32px -32px 65px #ffffff',
              }}
            >
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-4xl text-gray-700 font-bold  text-shadow: 4px 3px 9px rgba(0,0,0,0.43);">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
