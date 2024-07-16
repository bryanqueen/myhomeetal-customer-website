'use client';
import React, { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='mb-4'>
      <button
        className='w-full rounded-2xl bg-[#FFF1F1] p-4 px-6 text-left focus:outline-none'
        onClick={toggleOpen}
      >
        <h3 className='font-clashmd text-xl text-myGray'>{question}</h3>
        {isOpen && (
          <div className='py-4'>
            <p className='text-base text-[#525252] italic'>{answer}</p>
          </div>
        )}
      </button>
    </div>
  );
};

const Accordion: React.FC = () => {
  const items = [
    {
      question: 'How much can I earn per referral?',
      answer:
        'You earn [specific amount or percentage] for every referred friend who makes a purchase.',
    },
    {
      question: 'When will I receive my referral reward?',
      answer:
        'Referral rewards are typically issued within X days after the referred friend makes a purchase.',
    },
    {
      question: 'Is there a limit to how many friends I can refer?',
      answer:
        'There is no limit to how many friends you can refer. The more, the merrier!',
    },
    {
      question: 'Can I track the status of my referrals?',
      answer:
        'Yes, you can track the status of your referrals in your account dashboard.',
    },
  ];

  return (
    <div className='mx-auto mt-8 max-w-[752px]'>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default Accordion;
