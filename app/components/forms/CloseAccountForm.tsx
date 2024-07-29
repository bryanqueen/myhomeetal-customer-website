'use client';
import Input from '@/app/components/Input';
import { Trash } from 'iconsax-react';
import Button from '../Button';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import productService from '@/app/services/productService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { constants } from '@/app/utils/constants';

export default function CloseAccountForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteUser = async (password: string) => {
    setLoading(true);
    try {
      const payload = { password: password };
      const res = await productService.deleteUser(payload);
      if (res.status === 200) {
        deleteCookie(constants.AUTH_TOKEN);
        deleteCookie(constants.USER_INFO);
        toast.success('Account deleted');
        router.push('/');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteUser(password);
  };

  return (
    <div className='min-w-full'>
      <form onSubmit={handleSubmit} className='grid min-w-full gap-5'>
        <div className='relative'>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
            labelKey='Password'
            labelClassName='text-[#989898] hidden lg:block text-base'
            required
            inputClassName='lg:rounded-2xl text-sm min-w-full lg:h-[56px] placeholder:text-xs rounded-[10px] h-[60px] bg-[#f4f4f4] placeholder:text-[#989898] lg:placeholder:text-base'
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute bottom-[18px] right-5 cursor-pointer text-[#717171]'
          >
            {showPassword ? (
              <EyeSlashIcon width={20} />
            ) : (
              <EyeIcon width={20} />
            )}
          </span>
        </div>

        <Button
          loading={loading}
          disabled={loading}
          type='submit'
          className='mt-8 h-[50px] w-full rounded-[10px] border-0 px-6 py-3 font-clashmd text-base text-white shadow-none lg:mt-0 lg:rounded-[8px] lg:font-clash'
        >
          <span className='flex items-center gap-3 lg:gap-1'>
            <Trash variant='Bold' size={20} />
            Delete Account
          </span>
        </Button>
      </form>
    </div>
  );
}
