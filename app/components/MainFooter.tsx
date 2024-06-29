const contents = [
  {
    title: 'Information',
    items: [
      'Information',
      'About Us',
      'About Zip',
      'Privacy Policy',
      'Search',
      'Terms',
      'Orders and Returns',
      'Contact Us',
      'Advanced Search',
      'Newsletter Subscription',
    ],
  },
  {
    title: 'Information',
    items: [
      'Information',
      'About Us',
      'About Zip',
      'Privacy Policy',
      'Search',
      'Terms',
      'Orders and Returns',
      'Contact Us',
      'Advanced Search',
      'Newsletter Subscription',
    ],
  },
  {
    title: 'PC Parts',
    items: [
      'PC Parts',
      'CPUS',
      'Add On Cards',
      'Hard Drives (Internal)',
      'Graphic Cards',
      'Keyboards / Mice',
      'Cases / Power Supplies / Cooling',
      'RAM (Memory)',
      'Software',
      'Speakers / Headsets',
      'Motherboards',
    ],
  },
  {
    title: 'Desktop PCs',
    items: [
      'Desktop PCs',
      'Custom PCs',
      'Servers',
      'MSI All-In-One PCs',
      'HP/Compaq PCs',
      'ASUS PCs',
      'Tecs PCs',
    ],
  },
  {
    title: 'Laptops',
    items: [
      'Laptops',
      'Evryday Use Notebooks',
      'MSI Workstation Series',
      'MSI Prestige Series',
      'Tablets and Pads',
      'Netbooks',
      'Infinity Gaming Notebooks',
    ],
  },
  {
    title: 'Laptops',
    items: [
      'Laptops',
      'Evryday Use Notebooks',
      'MSI Workstation Series',
      'MSI Prestige Series',
      'Tablets and Pads',
      'Netbooks',
      'Infinity Gaming Notebooks',
    ],
  },
];

const MainFooter = () => {
  return (
    <div className='bg-black p-3'>
      <footer className='flex flex-wrap bg-white py-10 md:justify-center md:gap-4 md:py-16'>
        {contents.map((content, index) => (
          <div key={index} className='p-4'>
            <p className='mb-8 font-medium text-gray-500'>{content.title}</p>
            <ul>
              {content.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default MainFooter;
