import React, { useReducer } from 'react'
import Header from '../Header/Header'
import Administrators from './Administrators'
import AdminJails from './AdminJails'
import AppealBan from './AppealBan'
import BanList from './BanList'
import CasinoDealers from './CasinoDealers'
import FactionLeaders from './FactionLeaders'
import FactionWars from './FactionWars'
import FunStats from './FunStats'
import Helpers from './Helpers'
import PlayersOnline from './PlayersOnline/PlayersOnline'
import ReportPlayer from './ReportPlayer'

const reducer = (state, action) => {
    switch(action.type) {
        case 'playersonline_state':
            return { playersonline_state: true};
        case 'administrators_state':
            return { administrators_state: true};
        case 'helpers_state':
            return { helpers_state: true};
        case 'factionleaders_state':
            return { factionleaders_state: true};
        case 'casinodealers_state':
            return { casinodealers_state: true};
        case 'banlist_state':
            return { banlist_state: true };
        case 'adminjail_state':
            return { adminjail_state: true};
        case 'factionwars_state':
            return { factionwars_state: true}
        case 'funstats_state':
            return { funstats_state: true}
        case 'appealban_state':
            return { appealban_state: true}
        case 'reportplayer_state':
            return { reportplayer_state: true }
        default: return { playersonline_state: true };
    }
}
const first_flip = () => ({
    type: 'playersonline_state'

})
const second_flip = () => ({
    type:  'administrators_state'
})
const third_flip = () => ({
    type: 'helpers_state'
})

const fourth_flip = () => ({
    type: 'factionleaders_state'
})

const fifth_flip = () => ({
    type: 'casinodealers_state'
})

const sixth_flip = () => ({
    type: 'banlist_state'
})

const seventh_flip = () => ({
    type: 'adminjail_state'
})

const eighth_flip = () => ({
    type: 'factionwars_state'
})

const tenth_flip = () => ({
    type: 'funstats_state'
})
const eleventh_flip = () => ({
    type: 'appealban_state'
})
const twelfth_flip = () => ({
    type: 'reportplayer_state'
})
const initialState = {
    playersonline_state: true,
    administrators_state: false,
    helpers_state: false,
    factionleaders_state: false,
    casinodealers_state: false,
    banlist_state: false,
    adminjail_state: false,
    factionwars_state: false,
    funstats_state: false,
    appealban_state: false,
    reportplayer_state: false
}

export default function Server() {
    const [state, dispatch] = useReducer(reducer, { initialState })
    console.log(state);

    let playersonline_stateButton = null;

    if(state?.playersonline_state || state?.initialState?.playersonline_state ) {
        playersonline_stateButton = (
            <PlayersOnline />
        )
    }

    let administrators_stateButton = null;
    if(state.administrators_state) {
        administrators_stateButton = (
            <Administrators />
        )
    }
    let helpers_stateButton = null;

    if(state.helpers_state) {
        helpers_stateButton = (
            <Helpers />
        )
    }

    let factionleaders_stateButton = null;

    if(state.factionleaders_state) {
        factionleaders_stateButton = (
            <FactionLeaders />
        )
    }

    let casinodealers_stateButton = null;
    if(state.casinodealers_state) {
        casinodealers_stateButton = (
            <CasinoDealers />
        )
    }

    let banlist_stateButton = null;
    if(state.banlist_state) {
        banlist_stateButton = (
            <BanList />
        )
    }

    let adminjail_stateButton = null;

    if(state.adminjail_state) {
        adminjail_stateButton = (
            <AdminJails />
        )
    }

    let factionwars_stateButton = null;

    if(state.factionwars_state) {
        factionwars_stateButton = (
            <FactionWars />
        )
    }

    let funstats_stateButton = null;

    if(state.funstats_state) {
        funstats_stateButton = (
            <FunStats />
        )
    }

    let appealban_stateButton = null;

    if(state.appealban_state) {
        appealban_stateButton = (
            <AppealBan />
        )
    }

    let reportplayer_stateButton = null;

    if(state.reportplayer_state) {
        reportplayer_stateButton = (
            <ReportPlayer />
        )
    }

    const buttonsCombined = (
        <>
        {playersonline_stateButton}
        {reportplayer_stateButton}
        {appealban_stateButton}
        {funstats_stateButton}
        {factionwars_stateButton}
        {adminjail_stateButton}
        {banlist_stateButton}
        {casinodealers_stateButton}
        {factionleaders_stateButton}
        {helpers_stateButton}
        {administrators_stateButton}
        {playersonline_stateButton}
        </>
    )


  return (
    <>
    <Header />
    <div className='h-screen bg-neutral-900'>
        <div className='pt-7'>
            <div className='w-3/5 my-0 mx-auto '>
                <div className='flex'>
                    <div className='w-1/4 text-white  rounded-t-md text-sm'>
                        <ul className='flex flex-col'>
                            <li className={`px-5 py-3  ${state?.playersonline_state || state?.initialState?.playersonline_state ? 'bg-grey-hovered' : 'bg-grey-some'}  rounded-t-md hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(first_flip())}>Players online</li>
                            <li className={`px-5 py-3  ${state.administrators_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(second_flip())}>Administrators</li>
                            <li className={`px-5 py-3 ${state.helpers_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(third_flip())}>Helprs</li>

                            <li className={`px-5 py-3 ${state.factionleaders_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(fourth_flip())}>Faction leaders</li>

                            {/* <li className={`px-5 py-3 ${state.administrators_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Teams</li> */}

                            <li className={`px-5 py-3 ${state.casinodealers_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(fifth_flip())}>Casino Dealers</li>

                            <li className={`px-5 py-3 ${state.banlist_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(sixth_flip())}>Banlist</li>
                            <li className={`px-5 py-3 ${state.adminjail_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(seventh_flip())}>Admin Jails</li>
                            <li className={`px-5 py-3 ${state.factionwars_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(eighth_flip())}>Faction Wars</li>
                            <li className={`px-5 py-3 ${state.funstats_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(tenth_flip())}>Fun Stats</li>

                            {/* <li className={`px-5 py-3 ${state.administrators_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Property Auctions</li>

                            <li className={`px-5 py-3 ${state.administrators_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Real Estate (Houses)</li>
                            <li className={`px-5 py-3 ${state.administrators_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Businesses for sale</li>
                            <li className={`px-5 py-3 ${state.administrators_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Vehicle Market</li>
                            <li className={`px-5 py-3 ${state.administrators_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Stock Market</li> */}
                            <li className={`px-5 py-3 ${state.reportplayer_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(twelfth_flip())}>Report a player</li>
                            <li className={`px-5 py-3 ${state.appealban_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(eleventh_flip())}>Appeal a ban</li>
                            {/* <li className={`px-5 py-3 ${state.administrators_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 rounded-b-md hover:bg-grey-hovered cursor-pointer` }>View player report</li> */}









                            




                        </ul>
                    </div>
                    <div className='w-full h-full ml-12 p-3 bg-grey-some leading-none rounded text-white	'>
                        {/* <PlayersOnline /> */}
                        {/* <Administrators /> */}
                        {/* <Helpers />                         */}
                        {/* <FactionLeaders /> */}
                        {/* <CasinoDealers /> */}
                        {/* <BanList /> */}
                        {/* <AdminJails /> */}
                        {/* <FactionWars /> */}
                        {/* <FunStats /> */}
                        {/* <AppealBan /> */}
                        {/* <ReportPlayer /> */}
                        {buttonsCombined}
                    </div>
                </div>
            </div>
        </div>

    </div>

    </>
  )
}
