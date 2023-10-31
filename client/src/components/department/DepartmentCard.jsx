

const products = [

  {
    id: 1,
    name: 'Surgery',
    href: '/doctorlist',
    imageSrc: 'https://th.bing.com/th/id/OIP.IVwf85npYYUcwRp4EIhqDgHaJm?w=143&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Pediatrics',
    href: '#',
    imageSrc: 'https://th.bing.com/th/id/OIP.7uCPgyjm2X1Kc-PXm3nxmwHaLP?w=120&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7',
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
  return (
<div className="bg-slate-300">
  <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-4xl font-bold tracking-tight text-green-900">Department</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`group relative rounded-lg bg-white p-6 border border-white shadow-md lg:col-span-2`}
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 lg:w-40">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-xl text-gray-700">
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
