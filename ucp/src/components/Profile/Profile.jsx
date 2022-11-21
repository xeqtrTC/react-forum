import React, { useReducer } from 'react'
import Header from '../Header/Header'
import CriminalLogs from './CriminalLogs'
import Faction from './Faction'
import Houses from './Houses'
import MoneyLogs from './MoneyLogs'
import MyCharacter from './MyCharacter'
import PublicProfile from './PublicProfile'
import Settings from './Settings'
import Vehicles from './Vehicles'
import AdminLogs from './AdminLogs'

const reducer = (state, action) => {
    switch(action.type) {
        case 'character_state':
            return { character_state: true};
        case 'public_profile_state':
            return { public_profile_state: true};
        case 'vehicle_state':
            return { vehicle_state: true};
        case 'houses_state':
            return { houses_state: true};
        case 'criminal_state':
            return { criminal_state: true};
        case 'admin_state':
            return { admin_state: true };
        case 'faction_state':
            return { faction_state: true};
        case 'settings_state':
            return { settings_state: true}
        default: return state;
    }
}
const first_flip = () => ({
    type: 'character_state'

})
const second_flip = () => ({
    type:  'public_profile_state'
})
const third_flip = () => ({
    type: 'vehicle_state'
})

const fourth_flip = () => ({
    type: 'houses_state'
})

const fifth_flip = () => ({
    type: 'criminal_state'
})

const sixth_flip = () => ({
    type: 'admin_state'
})

const seventh_flip = () => ({
    type: 'faction_state'
})

const eighth_flip = () => ({
    type: 'settings_state'
})
const initialState = {
    character_state: true,
    public_profile_state: false,
    vehicle_state: false,
    houses_state: false,
    criminal_state: false,
    admin_state: false,
    faction_state: false,
    settings_state: false
}
export default function Profile() {
    const [state, dispatch] = useReducer(reducer, {initialState})
    console.log(state);

    let character_stateButton = null;
    if(state?.character_state || state?.initialState?.character_state) {
        character_stateButton = (
            <MyCharacter />
        )
    }
    let public_profile_stateButton = null;

    if(state.public_profile_state) {
        public_profile_stateButton = (
            <PublicProfile />
        )
    }

    let vehicle_stateButton = null;

    if(state.vehicle_state) {
        vehicle_stateButton = (
            <Vehicles />
        )
    }

    let houses_stateButton = null;

    if(state.houses_state) {
        houses_stateButton = (
            <Houses />
        )
    }

    let criminal_stateButton = null;

    if(state.criminal_state) {
        criminal_stateButton = (
            <CriminalLogs />
        )
    }

    let admin_stateButton = null;

    if(state.admin_state) {
        admin_stateButton = (
            <AdminLogs />
        )
    }

    let faction_stateButton = null;

    if(state.faction_state) {
        faction_stateButton = (
            <Faction />
        )
    }

    let settings_stateButton = null;

    if(state.settings_state) {
        settings_stateButton = (
            <Settings />
        )
    }

    const buttonsCombined = (
        <>
            {character_stateButton}
            {public_profile_stateButton}
            {vehicle_stateButton}
            {houses_stateButton}
            {criminal_stateButton}
            {admin_stateButton}
            {faction_stateButton}
            {settings_stateButton}
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
                            <li className={`px-5 py-3 ${state?.character_state || state?.initialState?.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} rounded-t-md hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(first_flip())}>My Character</li>
                            <li className={`px-5 py-3 ${state.public_profile_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(second_flip())}>Public Profile</li>
                            <li className={`px-5 py-3 ${state.vehicle_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(third_flip())}>Vehicles</li>
                            <li className={`px-5 py-3 ${state.houses_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(fourth_flip())}>Houses</li>
                            {/* <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Businesses</li> */}
                            <li className={`px-5 py-3 ${state.criminal_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(fifth_flip())}>Criminal entries</li>
                            <li className={`px-5 py-3 ${state.admin_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(sixth_flip())}>Admin entries</li>
                            {/* <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Money logs</li>
                            <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Give & receive logs</li>
                            <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Login history</li>
                            <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Friends</li> */}
                            <li className={`px-5 py-3 ${state.faction_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(seventh_flip())}>Faction</li>
                            {/* <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Faction Chat</li>
                            <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Faction logs</li> */}
                            <li className={`px-5 py-3 ${state.settings_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(eighth_flip())}>Settings</li>
                            {/* <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Premium</li>
                            <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 hover:bg-grey-hovered cursor-pointer`}>Sell name-/numberchanges</li>
                            <li className={`px-5 py-3 ${state.character_state ? 'bg-grey-hovered' : 'bg-grey-some'} mt-0.5 rounded-b-md hover:bg-grey-hovered cursor-pointer`}>Logout</li> */}
                        </ul>
                    </div>
                    <div className='w-full h-full ml-12 p-3 bg-grey-some leading-none rounded text-white	'>
                        {buttonsCombined}
                            
                       
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
    </>
  )
}
