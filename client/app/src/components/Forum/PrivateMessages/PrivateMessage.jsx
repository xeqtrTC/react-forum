import React, { useState, useRef } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Footer from '../../Footer/Footer'
import Header from '../../header/Header'
import UseAuthHook from '../../Hooks/UseAuthHook'
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader'
import { HiSearch } from 'react-icons/hi' 
import { GoThreeBars } from 'react-icons/go'
import  { BsThreeDotsVertical, BsChatSquareText } from 'react-icons/bs'
import './PrivateMessage.css';
import { useInsertMessageIntoRoomMutation, useGetRoomIdSocketMutation, useGetMessagesPerRoomIdQuery, useAddMessageRoomMutation, useGetUsersPrivateMessagesQuery, useGetMessagesRoomsQuery } from '../../../redux/categoryApi'
import { useEffect } from 'react'
import { format,parseISO   } from 'date-fns'

export default function PrivateMessage() {
    const [color, setColor] = useState(true)
    const scrollRef = useRef();


    const { username } = UseAuthHook();

    const [chatRooms, setChatRooms] = useState(true);
    const [searchUser, setSearchUser] = useState(false);
    const [errorEmptyMessageErr, setErrorEmptyMessageErr] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [items, setItems ] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const [searchUserValue, setSearchUserValue] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const messageRef = useRef();

    const {data, isSuccess, isError, error } = useGetUsersPrivateMessagesQuery()

    const {data: messageRoomsData, isSuccess: messageRoomsSuccess, isError: messageRoomsIsError, error: messageRoomsError } = useGetMessagesRoomsQuery();
    const [selectedLeftSideUser, setSelectedLeftSideUser] = useState({
        room_receiver: '',
        roomid: ''
    });

    const { data: datamessage, isLoading: datamessageIsLoading, isError: datamessageIsError, error: errordatamessage } = useGetMessagesPerRoomIdQuery(selectedLeftSideUser.roomid);
    
    console.log(datamessage);
    console.log(datamessageIsError)
    console.log(errordatamessage)
    const [AddMessageRoom] = useAddMessageRoomMutation();
    const [GetRoomIdSocket] = useGetRoomIdSocketMutation();
    const [InsertMessageIntoRoom] = useInsertMessageIntoRoomMutation();

    
    const filterItems = (e) => {
        const filteredProducts = data?.filter((item) => {
            return item.username.toLowerCase().includes(searchUserValue.toLowerCase());
        })
        
        setItems(filteredProducts);
        
    }
    const changeInputValue = (e) => {
        setSearchUserValue(e.target.value)
    }

    const searchUserFunction = () => {
        setChatRooms(false);
        setSearchUser(true);
        setItems([])
        setErrorMsg(null);
    }
    const chatRoomsFunction = () => {
        setChatRooms(true);
        setSearchUser(false);
        setItems([])
        setErrorMsg(null)
    }


    useEffect(() => {
        filterItems()
    }, [searchUserValue])

    // useEffect(() => {
    //     selectedLeftSideUserFunction(messageRoomsData[0]?.roomid)
    // }, [messageRoomsSuccess, isSuccess])

    const addMessageRoomFunction = async (username, image) => {

        console.log('usernameee', username, image)
        
        try {
            await AddMessageRoom({username, image}).unwrap();
        } catch (error) {   
            console.log(error);
        }
    }

    const selectUserFunction = ( username) => {

        const selectUserFilter = items?.filter((item) => item.username === username)
        setSelectedUser(selectUserFilter[0]);


        const checkIfAlreadyRoomExist = messageRoomsData.some(item => item.room_receiver === username)
        const checkIfAlreadyRoomExistSecond = messageRoomsData.some(item => item.room_sender === selectUserFilter[0].username)

        const checkBoolean = [checkIfAlreadyRoomExist, checkIfAlreadyRoomExistSecond].every(Boolean);
        console.log('drugiiiiiiiiiiiiiii', checkIfAlreadyRoomExistSecond)
        console.log('cheeeeeeeeeeeeeeck', checkBoolean)

        if(checkIfAlreadyRoomExist || checkIfAlreadyRoomExistSecond) {
                setErrorMsg(`You already have conversation with ${username}`)
            } else {
                addMessageRoomFunction(selectUserFilter[0].username, selectUserFilter[0].image);
                setSearchUser(false);
                setChatRooms(true);
                setErrorMsg(null);
                setItems([])
            }
        

        
    }     


    const selectedLeftSideUserFunction = async ({roomid, room_receiver}) => {
        console.log(roomid)
        setSelectedLeftSideUser({roomid: roomid, room_receiver: room_receiver});

        try { 
            await GetRoomIdSocket(roomid).unwrap();
        } catch (error) {
            console.log(error)
        }


    }
    const handleMessageEvent = (e) => {
        setMessageContent(e.target.value)
    }
    console.log(selectedLeftSideUser);
    const insertMessageIntoRoomFunction = async (e) => {
        e.preventDefault();
        const roomIdValue = selectedLeftSideUser.roomid
        const messageReceiver = selectedLeftSideUser.room_receiver
        const messageNotEmp = !messageContent
        if(!messageNotEmp) {

   
            try {
                InsertMessageIntoRoom({messageContent, roomIdValue, messageReceiver}); 
                setMessageContent('');
            } catch (error) {
                console.log(error);
            }
        }
            
    }
   
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }, [datamessage])
    let content;

    if(isError) {
        content = <p>{error?.data?.message}</p>
    }

    if(isSuccess && messageRoomsSuccess) {
        content  = (
            <>
        <Header children={color} />
        <div className='forum-screen-container'>
            <PhotoAfterHeader />
            <div className='forum-page-first'>
                <div className='forum-page-full'>
                    <span>User control panel</span> <AiOutlineArrowRight /> <span className='spantitle'>Private messages</span>
                </div>
            </div>
            <div className='forum-private-messages-container'>
                <div className='forum-private-messages-color-container'>
                    <div className='forum-private-messages-left-side'>
                        <div className='forum-private-messages-left-side-icons'>
                            <div className='forum-private-messages-left-side-icons-left'>
                                <GoThreeBars />
                            </div>
                            <div className='forum-private-messages-left-side-icons-right'>
                                {
                                    chatRooms ? <HiSearch className='rotatedsvg' onClick={searchUserFunction}/> : <BsChatSquareText onClick={chatRoomsFunction} />

                                }
                                <BsThreeDotsVertical />
                            </div>
                        </div>
                        {
                            searchUser && (
                                
                                <div className='forum-private-messages-leftside-chat-component'>
                                    {
                                        errorMsg && (
                                                <div className='search-user-private-error'>
                                                <span>{errorMsg}</span>
                                            </div> 
                                        )
                                    }
                                    
                                    <div className='search-user-input'>

                                    <input type='text' placeholder='Search user...' onChange={changeInputValue} />
                                    </div>
                                    {
                                        searchUserValue?.length > 0 && (
                                            items?.map((item, index) => {
                                                const { username, image } = item;
                                                return (    
                                                    <div className='forum-private-messages-leftside-chat-component-user  ' key={index} onClick={() => selectUserFunction(username)}>
                                                    <div className='forum-private-messages-leftside-chat-component-user-width'>
                                                        <div className='img-radius-private-messages'>
                                                            <img  src={image.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${image}` : 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png' } />
                                                        </div>
                                                        <div className='name-of-user-private-messages-search-user'>
                                                            <div className='name-of-user-and-date-private-messages'>
                                                                <div className='name-of-user-private'>
                                                                    <span>{username}</span>
                                                                </div>
                                                               
                                                            </div>
                                                           
                                                           
                                                        </div>
                                                    </div>
                                                    </div>

                                                )
                                            })
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            chatRooms && (
                                <div className='forum-private-messages-leftside-chat-component'>
                            {
                                messageRoomsData?.map((item) => {
                                    const { roomid, room_sender, room_receiver, room_receiverimage, room_senderimage, room_date } = item;
                                    return (
                                        <div className={selectedLeftSideUser.roomid === roomid ? 'forum-private-messages-leftside-chat-component-user active-private' : 'forum-private-messages-leftside-chat-component-user'}  onClick={() => selectedLeftSideUserFunction({roomid, room_receiver})} key={roomid}>
                                            <div className='forum-private-messages-leftside-chat-component-user-width'>
                                                <div className='img-radius-private-messages'>
                                                    {
                                                        room_receiver === username ? <img  src={room_senderimage?.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${room_senderimage}` : 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png' } /> : <img  src={room_receiverimage?.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${room_receiverimage}` : 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png' } />


                                                    }
                                                </div>
                                                <div className='name-of-user-private-messages'>
                                                    <div className='name-of-user-and-date-private-messages'>
                                                        <div className='name-of-user-private'>
                                                            {
                                                                room_receiver === username ? <span>{room_sender}</span> : <span>{room_receiver}</span>

                                                            }
                                                        </div>
                                                        <div className='date-of-user-private'>
                                                            <span>{format(parseISO(room_date), "MMM Qo, H:m a")}</span>
                                                        </div>
                                                    </div>
                                                    <div className='message-of-user-private'>
                                                        {/* <span>asdadsa</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                            
                        </div>
                            )
                        }
                    </div>
                    <div className='forum-private-messages-right-side'>

                    {
                        selectedLeftSideUser.roomid && (
                        <><div className='forum-private-messages-right-side-container'>
                                            {/* {
        errorEmptyMessageErr && (
            <div className='privatemessages-error-container'>
                <div className='private-message'>
                    <span>{errorEmptyMessageErr}</span>

                </div>
            </div>
        )
    } */}




                                        {
                                            datamessageIsLoading ? (
                                                <div className="loader-private"></div>

                                            ) : (
                                                datamessage?.map((item, index) => {
                                                    const { roommessage_id, roommessage_roomid, roommessage_sender_image, roommessage_sender, roommessage_receiver, roommessage_content, roommessage_date } = item
                                                    return (
                                                        selectedLeftSideUser.roomid === roommessage_roomid && (
                                                            roommessage_sender === username ? (
                                                                <div className='right-side-private-whorecieved' key={index} ref={scrollRef}>
                                                                    <div className='right-side-private-whorecieved-box'>
    
                                                                        <div className='right-side-whorecieved-text-box'>
                                                                            <span>{roommessage_content}</span>
                                                                        </div>
    
                                                                        <div className='right-side-private-whorecieved-image'>
                                                                            <img src={roommessage_sender_image.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${roommessage_sender_image}` : 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'} alt='photo' />
    
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className='sender' key={index}>
                                                                    <div className='right-side-private-whorecieved-box'>
                                                                        <div className='right-side-private-whorecieved-image'>
                                                                            <img src={roommessage_sender_image.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${roommessage_sender_image}` : 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'} alt='photo' />
    
                                                                        </div>
    
                                                                        <div className='right-side-whorecieved-text-box'>
                                                                            <span>{roommessage_content}</span>
                                                                        </div>
    
    
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    )
                                                })
                                            )
                                        }
                                            




                                        </div><form onSubmit={insertMessageIntoRoomFunction}>

                                                <div className='private-message-input'>

                                                    <input type='text' placeholder='Write your message...' value={messageContent} onChange={handleMessageEvent} />
                                                    <button>Send</button>

                                                </div>

                                            </form></>

                        )
                    }
                    </div>

                </div>
            </div>
        </div>

        <Footer />
    </>
        )
    }


    return content;
}
