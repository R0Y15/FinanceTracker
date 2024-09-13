"use client"

import { TransactionHistory } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const Transactions = () => {

    const router = useRouter();

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="w-[500px] h-52 border rounded-xl px-8 py-6 dark:border-none bg-white dark:bg-gray-900 text-black dark:text-white">
            <div className="flex flex-col items-start justify-between h-full">
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className='text-2xl font-bold'>History Transactions</h1>
                    <p className='text-[#00B3FF] cursor-pointer' onClick={() => router.push('/transaction')}>View more</p>
                </div>

                <div className="flex flex-col items-start justify-between overflow-y-auto w-full custom-scrollbar">
                    {TransactionHistory.map((item, idx) => (
                        <div key={idx} className="flex flex-row justify-between items-center w-full my-2">
                            <div className="flex justify-center items-center gap-3">
                                <div className='w-14 h-14 border flex items-center justify-center rounded-xl bg-[#E3F6FE] dark:bg-gray-600 dark:border-none'>
                                    <div className='w-10 h-10 border flex items-center justify-center rounded-xl bg-[#00B3FF] dark:bg-[#1A2B3C] dark:border-none'>
                                        {item.transactionType === 'order revenue' ? (
                                            <Image
                                                src={'/assets/receive.svg'}
                                                width={18}
                                                height={18}
                                                alt='img'
                                            />
                                        ) : (
                                            <Image
                                                src={'/assets/send.svg'}
                                                width={18}
                                                height={18}
                                                alt='img'
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div>
                                        <p className='font-medium text-lg'>
                                            {item.transactionType}
                                        </p>
                                    </div>
                                    <div>{formatDate(item.date)}</div>
                                </div>
                            </div>
                            <div>
                                <p className={`font-medium text-lg ${item.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.amount > 0 ? '+ $' : '- $'} {Math.abs(item.amount)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Transactions