import Link from 'next/link';
import Cookie from 'js-cookie';
import Marquee from 'react-fast-marquee';
import { CategoryType } from '@/types';

const fetchCategories = async (): Promise<CategoryType[]> => {
  const token = Cookie.get('AUTH_TOKEN');
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}product-category/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching categories.');
  }
};

const CategoryList = async () => {
  let categories: CategoryType[] = [];
  try {
    categories = await fetchCategories();
  } catch (error) {
    // Error handling
    return (
      <div className="hidden items-center px-[3%] pb-5 md:flex">
        <p className="text-red-500">Failed to load categories. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="hidden items-center px-[3%] pb-5 md:flex">
      <p className="pr-2 text-sm font-clashmd">Categories:</p>
      <ul className="flex overflow-hidden">
        <Marquee pauseOnHover autoFill>
          {categories.map((category) => (
            <li
              key={category._id}
              className="p-3 text-sm text-myGray font-clash"
            >
              <Link
                href={`/category/${category.name}?categoryId=${category._id}`}
                key={category._id}
              >
                My {category.name}
              </Link>
            </li>
          ))}
        </Marquee>
      </ul>
    </div>
  );
};

export default CategoryList;