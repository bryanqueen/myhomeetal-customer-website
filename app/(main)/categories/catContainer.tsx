'use client';

import { FaCaretDown } from 'react-icons/fa6';
import { useState, useEffect } from 'react';

interface ApiCategory {
  _id: string;
  name: string;
  products: string[];
  subCategory: any[];
}

interface TransformedCategory {
  title: string;
  sections: {
    header: string;
    items: string[];
    subcategories?: {
      [key: string]: string[];
    };
  }[];
}

export default function CatContainer() {
  const [currentCategory, setCurrentCategory] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<TransformedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_V1_BASE_API_URL as string;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://api.myhomeetal.store/api/v1/product-category/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data: ApiCategory[] = await response.json();

        const transformed = data.map(category => ({
          title: category.name,
          sections: [{
            header: 'Products',
            items: category.products
          }]
        }));

        setCategories(transformed);
        if (transformed.length > 0) {
          setCurrentCategory(transformed[0].title);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [baseURL]);

  const currentCategoryData = categories.find(
    (category) => category.title === currentCategory
  );

  if (loading) {
    return <div className="p-6 text-center">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative min-h-screen p-6 mt-20 lg:mt-0">
      {/* Header Section */}
      <div className="bg-black text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className='font-medium'>Categories:</p>
          <button
            className="text-sm flex items-center gap-1"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {currentCategory} <FaCaretDown />
          </button>
          {dropdownOpen && (
            <div className="absolute top-20 left-4 bg-white text-black rounded-md shadow-lg p-2 w-64 z-10">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCurrentCategory(category.title);
                    setDropdownOpen(false);
                  }}
                >
                  {category.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <span className="text-lg font-bold">{currentCategory}</span>
      </div>

      {/* Content Section */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {currentCategoryData?.sections.map((section, index) => (
          <div key={index} className="space-y-3 border-r border-gray-300 pr-4">
            <p className="font-semibold text-sm relative">
              {section.header}
              <div className="w-full h-px bg-gray-300 mt-1"></div>
            </p>
            <ul className="space-y-1 text-gray-700">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 































// 'use client';

// import { FaCaretDown } from 'react-icons/fa6';
// import { categoriesData } from './categoriesData';
// import { useState } from 'react';

// export default function CatContainer() {
//   const [currentCategory, setCurrentCategory] = useState('Electronics');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const baseURL = process.env.NEXT_PUBLIC_V1_BASE_API_URL as string;

//   const currentCategoryData = categoriesData.find(
//     (category) => category.title === currentCategory
//   );

//   return (
//     <div className="relative min-h-screen p-6 mt-20 lg:mt-0">
//       {/* Header Section */}
//       <div className="bg-black text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <p className='font-medium'>Categories:</p>
//           <button
//             className="text-sm flex items-center gap-1"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             {currentCategory} <FaCaretDown />
//           </button>
//           {dropdownOpen && (
//             <div className="absolute top-20 left-4 bg-white text-black rounded-md shadow-lg p-2 w-64 z-10">
//               {categoriesData.map((category) => (
//                 <div
//                   key={category.title}
//                   className="p-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     setCurrentCategory(category.title);
//                     setDropdownOpen(false);
//                   }}
//                 >
//                   {category.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <span className="text-lg font-bold">{currentCategory}</span>
//       </div>

//       {/* Content Section */}
//       <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//         {currentCategoryData?.sections.map((section, index) => (
//           <div key={index} className="space-y-3 border-r border-gray-300 pr-4">
//             <p className="font-semibold text-sm relative">
//               {section.header}
//               <div className="w-full h-px bg-gray-300 mt-1"></div>
//             </p>
//             <ul className="space-y-1 text-gray-700">
//               {section.items.map((item, idx) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//             {section.subcategories && (
//               <div className="mt-3 space-y-2">
//                 {Object.keys(section.subcategories).map((subHeader, idx) => (
//                   <div key={idx}>
//                     <p className="font-semibold text-sm">
//                       {subHeader}
//                       <div className="w-full h-0.5 bg-gray-300 mt-1"></div>
//                     </p>
//                     <ul className="space-y-1 text-gray-500">
//                       {section.subcategories[subHeader].map((subItem, id) => (
//                         <li key={id}>{subItem}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


