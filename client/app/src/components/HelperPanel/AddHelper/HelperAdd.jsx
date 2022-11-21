import React, { useEffect, useState } from 'react'
import { useAddHelperQueryListUsersQuery, useAddHelperUserMutation } from '../../../redux/usersApi/usersApi';
import LoadingBox from '../../LoadingBox/LoadingBox';
import HelperLeftSide from '../LeftSide/HelperLeftSide';
import HelperNavBar from '../Navbar/HelperNavBar';

import './HelperAdd.css';
export default function HelperAdd() {

    const { data, isLoading, isSuccess} = useAddHelperQueryListUsersQuery();

    let content;

    const [items, setItems] = useState({})
    const [value, setValue] = useState('');
    const [selectedUser, setSelectedUser] = useState([])
    const [errorAddHelper, setErrorAddHelper] = useState(null); 
    const [successAddHelper, setSuccessAddHelper] = useState(null);

    const [addHelperUser] = useAddHelperUserMutation();

    
    const addUserToSelected = (username) => {
        const itemACAB = items.filter((item) => item.username === username);

        setSelectedUser(itemACAB[0].username)

    }

    console.log( selectedUser);
    const updateHelperValue = (e) => {
        setValue(e.target.value)
    }

    const filterItems = (e) => {
        const filteredProducts = data?.filter((item) => {
            return item.username.toLowerCase().includes(value.toLowerCase());
        })
        setItems(filteredProducts);
        
    }

    const addHelperFunction = async(e) => {
        e.preventDefault();

        if(selectedUser) {
            try {

                await addHelperUser({selectedUser}).unwrap()
                
                setSuccessAddHelper(`You made ${selectedUser} a Helper!`)
                setSelectedUser('');
                setValue('');

            } catch (error) {
                const { data } = error
                
                setErrorAddHelper('Something went wrong, contact our support');
            }
        } else {
            setErrorAddHelper("You didn't select any user")
        }


        
    }
    useEffect(() => {
        filterItems()
    },  [value])

    useEffect(() => {
        if(value.length === 0) {
            setSelectedUser('')
        }
    },[value, selectedUser])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessAddHelper('')
        }, 4000)

        return () => clearTimeout(timer);
    }, [successAddHelper])

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorAddHelper('')
        }, 4000);

        return () => clearTimeout(timer);
    }, [errorAddHelper])

    console.log(items);


    if(isLoading) {
        content = <LoadingBox />
    } 

    if(isSuccess) {
        
        content = (
            <div className='admin-wrapper'>
                <HelperLeftSide />
                <div className='admin-navbar-wrapper'>
                    <HelperNavBar />
                    <div className='addhelper-container '>
                        <div className='addhelper-second-container'>
                            <div className='addhelper-input'>
                                <input type='text' placeholder='Add helper...' value={value} onChange={updateHelperValue} />
                            </div>
                            {
                                value?.length > 0 && (
                                    <>
                                    <div className='addhelper-userlist'>
                                        {
                                            items?.map((item) => {
                                                const { uid, username } = item;
                                                return (
                                                    <span key={uid} onClick={() => addUserToSelected(username)}>{item.username}</span>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                    <form onSubmit={addHelperFunction}>

                                            <div className='addhelper-state'>
                                                <div className='addhelper-current'>
                                                    <span>Current selected user: {selectedUser}</span>
                                                </div>
                                                <div className='addhelper-button'>
                                                    <button>Add helper</button>
                                                </div>
                                            </div>
                                        </form>

                                        </>
                                )
                            }
                            {errorAddHelper && (
                                <div className='addhelper-error'>
                                    <span>{errorAddHelper}</span>

                                </div>
                            )}
                            {
                                successAddHelper && (
                                    <div className='addhelper-success'>
                                        <span>{successAddHelper}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }


    return content
}
