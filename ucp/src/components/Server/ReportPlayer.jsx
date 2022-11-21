import React, { useState } from 'react'
import { useReducer } from 'react'

const reducer = (state, action) => {
    switch(action.type) {
        case 'firstpage_discussTest':
            return { firstpage_discuss: true}
        case 'solveConflict':
            return { solveConflict: true}
        case 'evidenceBroken':
            return { evidenceBroken: true}
        case 'notEnoughEvidence':
            return { notEnoughEvidence: true}
        case 'creatingReports':
            return { creatingReports: true}
        case 'report_player':
            return { report_player: true}
        // default: return state;
    }
}
const initialState = {
    firstpage_discuss: true,
    solveConflict: false,
    evidenceBroken: false,
    notEnoughEvidence: false,
    creatingReports: false,
    report_player: false
}

const first_flip = () => ({
    type: 'solveConflict'
})
const second_flip = () => ({
    type: 'evidenceBroken'
})
const third_flip = () => ({
    type: 'notEnoughEvidence'
})
const fourth_flip = () => ({
    type: 'creatingReports'
})
const fifth_flip = () => ({
    type: 'report_player'
})

export default function ReportPlayer() {
    const [state, dispatch] = useReducer(reducer, {initialState} )
    // const [firstPageDiscuss, setFirstPageDiscuss] = useState(true);
    // const [solveConflict, setSolveConflict] = useState(false);
    // const [evidenceBroken, setEvidenceBroken] = useState(false);
    // const [notEnoughEvidence, setNotEnoughEvidence] = useState(false);
    // const [creatingReports, setCreatingReports] = useState(false);
    // const [reportPlayer, setReportPlayer] = useState(false);
    console.log(state);
    let firstpageDiscussButton = null;
    if(state?.initialState?.firstpage_discuss) {
        firstpageDiscussButton = (
            <div className='border-4 mt-2 flex flex-col border-[#064780] py-2 px-3 bg-[#064780] bg-opacity-5	'>
                <span className='text-xs font-bold'>Have you attempted to discuss the situation with the player(s) you are going to report and were you unable to solve this conflict amicably?</span>
                            <div className='py-2'>
                                <button className='bg-[#0E426F] hover:bg-[#064780] text-sm mr-2 px-3 p-1.5 rounded' onClick={() => dispatch(first_flip())}>No</button>
                                <button className='bg-[#0E426F] hover:bg-[#064780]  text-sm  px-3 p-1.5 rounded' onClick={() => dispatch(second_flip())}>Yes</button>
                            </div>
            </div>
        )
    }

    let solveConflictButton = null;
    if(state.solveConflict) {
        solveConflictButton = (
            <div className='border-4 mt-2 flex flex-col border-[#064780] py-2 px-3 bg-[#064780] bg-opacity-5	'>
                <div className='text-sm'>
                                <span>Before creating a player report, please try to solve the conflict amiciably</span>
                            </div>
            </div>
        )
    }

    let evidenceBrokenButton = null;
    if(state.evidenceBroken) {
        evidenceBrokenButton = (
            <div className='border-4 mt-2 flex flex-col border-[#064780] py-2 px-3 bg-[#064780] bg-opacity-5	'>
            <div>
                <span>You may only report a player if you possess indisputable evidecne that one or more server rules were broken.</span>
                <div className='py-2'>
                <button className='bg-[#0E426F] hover:bg-[#064780] text-sm mr-2 px-3 p-1.5 rounded' onClick={() => dispatch(third_flip())}>Nevermind, I don't have enough evidence</button>
                <button className='bg-[#0E426F] hover:bg-[#064780]  text-sm  px-3 p-1.5 rounded' onClick={() => dispatch(fourth_flip())}>Yes, I have proper evidence</button>

                </div> 
            </div>
            </div>
        )    
    }

    let notEnoughEvidenceButton = null;

    if(state.notEnoughEvidence) {
        notEnoughEvidenceButton = (
            <div className='border-4 mt-2 flex flex-col border-[#064780] py-2 px-3 bg-[#064780] bg-opacity-5	'>
                <div className='text-sm'>
                    <span>You may only use the player report function if you have 100% safe evidence that the server rules were not respected.</span>
                </div>
            </div>
            
        )
    }

    let creatingReportsButton = null;

    if(state.creatingReports) {
        creatingReportsButton = (
            <div className='border-4 mt-2 flex flex-col border-[#064780] py-2 px-3 bg-[#064780] bg-opacity-5	'>
                <div>
                    <span className='text-sm'>Creating reports that are false or deemed invalid will possibily result in a permanent suspension / exclusion from the community.</span>
                    <button className='bg-[#0E426F] mt-2 hover:bg-[#064780]  text-sm  px-3 p-1.5 rounded' onClick={() => dispatch(fifth_flip())}>I understand</button>

                </div>
            </div>

        )
    }

    let report_playerButton = null;

    if(state.report_player) {
        report_playerButton = (
            <div>
                <div className='border-4 mt-2 flex flex-col border-[#064780] py-2 px-3 bg-[#064780] bg-opacity-5	'>
                <div className='flex flex-col'>
                <span className='text-sm py-1.5'>By submitting this player report, you agree to the following:</span>
                <span className='text-xs text-[#cccccc]'>- I have contacted the reported player(s) and was unable to resolve it and come to a mutual understanding.</span>
                <span className='text-xs text-[#cccccc]'>- I have read the corresponding rule-set for the offense I am reporting for.</span>
                <span className='text-xs text-[#cccccc]'>- I understand by submitting this report I will not be able to retract it and that the final decision will be made by an administrator.</span>
                <span className='text-xs text-[#cccccc]'>- I understand by creating a report for the purpose of getting another player punished for a false reason or by editing the contents of the evidence I risk facing the punishment of an IP and/or account suspension. This also applies to creating multiple reports that were marked as invalid.</span>
                
                <span className='text-xs text-[#cccccc] mt-3'>NOTE:</span>
                <span className='text-xs text-[#cccccc]'>If you have not attempted to contact the reported player(s), the forum report will be resolved with no action taken despite any evidence provided.</span>
                <span className='text-xs text-[#cccccc]'>If you don't know the name of the reported player but only his stranger ID, simply enter the 5 digit ID. (i.e. 12345)</span>

            </div>

            </div>
            <div className='flex flex-col py-1 px-10 mt-5'>

                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Your name:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Date of incident:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Time of  acident:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Reported player:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Reason:</span>
                    <select className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5 appearance-none'>
                        <option>Please select..</option>
                        <option></option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>


                    </select>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Screenshot:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>

                    {/* <input type='file' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/> */}
                </div>
                <div className='flex  py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Describe:</span>
                    <textarea placeholder='Describe what happend with as much  detail as possible.' className='ml-4 h-28  w-full p-2.5 outline-0 rounded text-black text-sm placeholder: px-5 text-xs'/>
                </div>
                <button className='bg-[#0E426F] mt-2 hover:bg-[#064780]  text-[#D0D2D3] text-sm font-bold p-2.5 rounded w-full'>Submit appeal</button>

            </div>
            </div>
        )
    }

    const buttonsCominbed = (
        <>
        {firstpageDiscussButton}
        {solveConflictButton}
        {evidenceBrokenButton}
        {notEnoughEvidenceButton}
        {creatingReportsButton}
        {report_playerButton}
        </>
    )

  return (
    <div>
        <span className='text-lg'>Report a player</span>
        {/* <div className='border-4 mt-2 flex flex-col border-[#064780] py-2 px-3 bg-[#064780] bg-opacity-5	'> */}
            {/* <span className='text-xs font-bold'>Have you attempted to discuss the situation with the player(s) you are going to report and were you unable to solve this conflict amicably?</span>
            <div className='py-2'>
                <button className='bg-[#0E426F] hover:bg-[#064780] text-sm mr-2 px-3 p-1.5 rounded'>No</button>
                <button className='bg-[#0E426F] hover:bg-[#064780]  text-sm  px-3 p-1.5 rounded'>Yes</button>

            </div> */}
            {/* <div className='text-sm'>
                <span>Before creating a player report, please try to solve the conflict amiciably</span>
            </div> */}

            {/* <div>
                <span>You may only report a player if you possess indisputable evidecne that one or more server rules were broken.</span>
                <div className='py-2'>
                <button className='bg-[#0E426F] hover:bg-[#064780] text-sm mr-2 px-3 p-1.5 rounded'>Nevermind, I don't have enough evidence</button>
                <button className='bg-[#0E426F] hover:bg-[#064780]  text-sm  px-3 p-1.5 rounded'>Yes, I have proper evidence</button>

                </div> 
            </div> */}
            {/* <div className='text-sm'>
                <span>You may only use the player report function if you have 100% safe evidence that the server rules were not respected.</span>
            </div> */}
            {/* <div>
                <span className='text-sm'>Creating reports that are false or deemed invalid will possibily result in a permanent suspension / exclusion from the community.</span>
                <button className='bg-[#0E426F] mt-2 hover:bg-[#064780]  text-sm  px-3 p-1.5 rounded'>I understand</button>

            </div> */}
            {/* <div className='flex flex-col'>
                <span className='text-sm py-1.5'>By submitting this player report, you agree to the following:</span>
                <span className='text-xs text-[#cccccc]'>- I have contacted the reported player(s) and was unable to resolve it and come to a mutual understanding.</span>
                <span className='text-xs text-[#cccccc]'>- I have read the corresponding rule-set for the offense I am reporting for.</span>
                <span className='text-xs text-[#cccccc]'>- I understand by submitting this report I will not be able to retract it and that the final decision will be made by an administrator.</span>
                <span className='text-xs text-[#cccccc]'>- I understand by creating a report for the purpose of getting another player punished for a false reason or by editing the contents of the evidence I risk facing the punishment of an IP and/or account suspension. This also applies to creating multiple reports that were marked as invalid.</span>
                
                <span className='text-xs text-[#cccccc] mt-3'>NOTE:</span>
                <span className='text-xs text-[#cccccc]'>If you have not attempted to contact the reported player(s), the forum report will be resolved with no action taken despite any evidence provided.</span>
                <span className='text-xs text-[#cccccc]'>If you don't know the name of the reported player but only his stranger ID, simply enter the 5 digit ID. (i.e. 12345)</span>

            </div> */}
            
        {/* </div> */}
        {buttonsCominbed}
        {/* <div className='flex flex-col py-1 px-10 mt-5'>

                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Your name:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Date of incident:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Time of  acident:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Reported player:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Reason:</span>
                    <select className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5 appearance-none'>
                        <option>Please select..</option>
                        <option></option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>
                        <option>Please select..</option>


                    </select>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Screenshot:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>

                    <input type='file' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex  py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Describe:</span>
                    <textarea placeholder='Describe what happend with as much  detail as possible.' className='ml-4 h-28  w-full p-2.5 outline-0 rounded text-black text-sm placeholder: px-5 text-xs'/>
                </div>
                <button className='bg-[#0E426F] mt-2 hover:bg-[#064780]  text-[#D0D2D3] text-sm font-bold p-2.5 rounded w-full'>Submit appeal</button>

            </div> */}
    </div>
  )
}
