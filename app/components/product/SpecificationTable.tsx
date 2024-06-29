interface Props {
  title: string;
}

const SpecificationTable = ({ title }: Props) => {
  return (
    <div>
      <p className='text-sm font-medium uppercase md:text-lg'>{title}</p>
      <div className='my-4 text-gray-500 md:rounded-3xl md:border md:border-gray-300 md:p-5'>
        <div className='border-b border-gray-300 py-5 last-of-type:border-0 md:mx-5 md:flex'>
          <p className='pb-3 font-medium md:flex-1'>Adjustable Back Height</p>
          <p className='md:flex-1'>Adjustable Back Height</p>
        </div>
        <div className='border-b border-gray-300 py-5 last-of-type:border-0 md:mx-5 md:flex'>
          <p className='pb-3 font-medium md:flex-1'>Adjustable Back Height</p>
          <p className='md:flex-1'>Adjustable Back Height</p>
        </div>
        <div className='border-b border-gray-300 py-5 last-of-type:border-0 md:mx-5 md:flex'>
          <p className='pb-3 font-medium md:flex-1'>Adjustable Back Height</p>
          <p className='md:flex-1'>Adjustable Back Height</p>
        </div>
      </div>
    </div>
  );
};

export default SpecificationTable;
