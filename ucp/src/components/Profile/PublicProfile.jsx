import React from 'react'

export default function PublicProfile() {
  return (
    <>
    <div className='py-4 border-b border-black flex justify-end'>
                            <input type='text' className='py-1.5 text-black text-sm outline-0 border-0 placeholder: px-3' placeholder='First_Lastname'/>
                            <button className='bg-button-color w-16 rounded-r text-sm'>Search</button>
                        </div>
                        <div className='mt-6 flex'>
                            <div className='flex-1'>
                                <span className='text-lg'>Raffaele Barbieri</span>
                                    <div className='text-xs font-medium'>
                                        <div className='flex  '>
                                            <div className='w-1/4 font-medium'>Status</div>
                                            <div>Regular Player</div>
                                        </div>
                                        <div className='flex  '>
                                            <div className='w-1/4  font-medium'>Level</div>
                                            <div>52 (58 R-Points)</div>

                                        </div>
                                        <div className='flex  '>
                                            <div className='w-1/4  font-medium'>Time played</div>
                                            <div>2262</div>

                                        </div>
                                        <div className='flex  '>
                                            <div className='w-1/4  font-medium'>Last seen</div>
                                            <div>144.11.2022 13:43</div>

                                        </div>

                                        <div className='mt-5'>
                                            <span className='text-lg'>Stats</span>

                                            <div className='flex  '>
                                                <div className='w-1/4  font-medium'>Job</div>
                                                <div>Thief</div>
                                            </div>
                                            <div className='flex  '>
                                                <div className='w-1/4  font-medium'>Faction member</div>
                                                <div>Yes(Corleone)</div>
                                            </div>
                                            <div className='flex  '>
                                                <div className='w-1/4  font-medium'>Team member</div>
                                                <div>Yes(The Balkan Syndicate)</div>
                                            </div>
                                            <div className='flex  '>
                                                <div className='w-1/4  font-medium'>Group member</div>
                                                <div>Yes</div>
                                            </div>
                                            <div className='flex  '>
                                                <div className='w-1/4  font-medium'>Friends</div>
                                                <div>84</div>
                                            </div>
                                            <div className='flex  '>
                                                <div className='w-1/4  font-medium'>Adminlog entries</div>
                                                <div>9</div>
                                            </div>
                                            <div className='flex  '>
                                                <div className='w-1/4  font-medium'>Criminal offenses</div>
                                                <div>80</div>
                                            </div>
                                        </div>

                                    </div>
                            </div>
                            <div className='px-2'>
                                <img src='https://sa-mp.im/assets/images/skins/206.png' alt='photo' />
                            </div>
                            
                        </div>
                        </>
  )
}
