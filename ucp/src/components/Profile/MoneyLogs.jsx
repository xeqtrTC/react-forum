import React from 'react'

export default function MoneyLogs() {
  return (
    <div>
                            <div className='flex p-2 justify-end'>
                                <span className='mr-2  flex items-center text-sm '>Search:</span> <input type='text' className='p-1 rounded outline-0 text-black' />
                            </div>
                            <div className='flex justify-center border-y border-black py-5  mt-3'>
                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>Hand</span></button>
                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>Scrapyard</span></button>

                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>Robbery</span></button>
                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>Bank</span></button>
                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>Vehicle</span></button>
                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>House</span></button>
                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>FactionBank</span></button>
                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>Moneyvan</span></button>
                                <button className=' px-1'><span className='bg-button-color px-2 py-1 rounded'>Business</span></button>

                               

                            </div>
                            <div className='mt-8 text-sm flex flex-col'>
                                <div className='flex py-1 px-2 hover:bg-button-color rounded'>
                                    <span className='w-28'>
                                        asdasdsa
                                    </span>
                                    <span className='w-36'>hand</span>
                                    <span> paid $50000 to stranger</span>
                                </div>
                                <div className='flex py-1 px-2 hover:bg-button-color rounded'>
                                    <span className='w-28'>
                                        asdasdsa
                                    </span>
                                    <span className='w-36'>hand</span>
                                    <span> paid $50000 to stranger</span>
                                </div>
                                <div className='flex py-1 px-2 hover:bg-button-color rounded'>
                                    <span className='w-28'>
                                        asdasdsa
                                    </span>
                                    <span className='w-36'>hand</span>
                                    <span> paid $50000 to stranger</span>
                                </div>
                                
                            </div>
                            </div>
  )
}
