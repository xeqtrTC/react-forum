import React, { useState, useCallback, useRef } from 'react';
import Header from '../../header/Header';
import Footer from '../../Footer/Footer';
import LoadingBox from '../../LoadingBox/LoadingBox';
import './ForumScreen.css';
import { useGetCategoriesQuery, useLastTwentyMessagesGlobalQuery, useInsertMessageGlobalMutation } from '../../../redux/categoryApi';
import { format,parseISO  } from 'date-fns'

import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';

import UseAuthHook from '../../Hooks/UseAuthHook';
import Picker from 'emoji-picker-react'

import { useEffect } from 'react';
import { useMemo } from 'react';
import InfoStuff from './InfoStuff';
import SuggestionStuff from './SuggestionStuff';
import AccountSettings from './AccountSettings';
import ServerStuff from './ServerStuff';
import NewPostFeature from '../NewPostFeature/NewPostFeature';

// const socket = io.connect("http://localhost:3000")
export default function ForumScreen() {
    const [color, setColor] = useState(true)
    const scrollRef = useRef();
    const [clicked, setClicked] = useState(true);
    const { username } = UseAuthHook()
    const { data, isLoading, isError, error, isSuccess } = useGetCategoriesQuery();
    const { data: messagesData, isError: messageError, isSuccess: messageSuccess} = useLastTwentyMessagesGlobalQuery();
    const [chatbox, setchatbox] = useState(true)
    const [testaa, settest] = useState('');
    const [insertMessageGlobal] = useInsertMessageGlobalMutation();
    const [message, setMessage] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [messagestored, setmessagestored] = useState([]);
   
    const memoizedListOfCategories = useMemo(() => data, [data]);
    const memoizdedMessages = useMemo(() => messagesData, [messagesData])

console.log(messagesData)
    const onEmojiClick = (event, emojiObject) => {
        setMessage(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const onChangeInputValueChat = (e) => {
        setMessage( e.target.value)
    }
    const onchangesomething = (e) => {
        settest(e.target.value);
    }
    const toggle = useCallback(() => setchatbox((prev) => !prev), []);

    const sendMessage = async (e) => {
        e.preventDefault();

        const notEmptyCheck  = !message;


        if(!notEmptyCheck) {
            insertMessageGlobal(message);
            setMessage('');
        }

        console.log(message);
        
    }
    // const sendMessage = () => {
    //     socket.emit("send_message", { message });
    // }

    // useEffect(() => {
    //     socket.on('receive_message', (data) => {
    //         console.log(data)
    //         // setmessagestored(data.message)
    //     })
    // }, [socket])



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }, [messagesData, chatbox])

    let content;

    if (isLoading) content = <LoadingBox />

    if(isError) {
        content  = <p>{error?.data?.message}</p>
    }

    if(isSuccess ) {

        
        const { ids } = memoizedListOfCategories;
        // const { ids: messageIds } = messagesData
        const commmunityRulesIds = ids.slice(0, 3)
        const gamingStuffIds = ids.slice(3,9)
        const infoStuff = ids.slice(0, 2);
        const suggestionStuff = ids.slice(2, 4)
        const accountSettings = ids.slice(4, 5);
        const serverStuff = ids.slice(5, 9)

        // const communityRulesContent = commmunityRulesIds?.length ? commmunityRulesIds.map(userId => <CommunityRules key={userId} userId={userId} />) : null
        // const gamingStuffContent = gamingStuffIds?.length ? gamingStuffIds.map(userId => <GamingStuff key={userId} userId={userId} /> ) : null;
       
        const infoStuffContent = infoStuff?.length ? infoStuff.map(userId => <InfoStuff key={userId} userId={userId} />) : null
        const suggestionStuffContent = suggestionStuff?.length ? suggestionStuff.map(userId => <SuggestionStuff key={userId} userId={userId} />) : null
        const accountSettingsContent = accountSettings?.length ? accountSettings.map(userId => <AccountSettings key={userId} userId={userId} />) : null
        const serverStuffContent = serverStuff?.length ? serverStuff.map(userId => <ServerStuff key={userId} userId={userId} />) : null

        content = (
            <>
            <Header children={color} clicked={clicked} />
            <div className='forum-screen-container'>
                <PhotoAfterHeader />
                <NewPostFeature />
                {
                 
                        <div className='forum-screen-posts-container'>
                                <div className='forum-screen-chatbox-p' onClick={toggle}>
                                    <span>Chatbox</span>
                                </div>
                                        <div className='forum-screen-chatbox-container'   >
                                                {memoizdedMessages?.map((item) => {
                                                        const { messageimage, messageuser, messagedate, messagecontent, messagesid} = item

                                                    // const { message, user, image, date } = item
                                                    return (
                                                        <div className='forum-screen-chatbox-messsages-container' key={messagedate} ref={scrollRef}>
                                                                <div className='forum-screen-chatbox-messsages-container-image' >
                                                                    <img src={messageimage.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${messageimage}` : 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'} alt='photo' />
                                                                </div>
                                                                <div className='forum-screen-chatbox-messsages-container-user-container'  >
                                                                    <div className='forum-screen-chatbox-messsages-container-user'>


                                                                <div className='forum-screen-chatbox-messsages-container-user-name'>
                                                                    <p>{messageuser}</p>
                                                                </div>
                                                                <div className='forum-screen-chatbox-messsages-container-user-date'>
                                                                    <p>{format(parseISO(messagedate), "do MMM, H:m a")}</p>
                                                                </div>
                                                            </div>
                                                            <div className='forum-screen-chatbox-messsages-container-user-messages'>
                                                            {messagecontent}
                                                            </div>

                                                        </div>

                                                    </div>
                                                    )
                                                })}
                                                
                                           
                                        
                                        </div>
                                        <form onSubmit={sendMessage}>

                                        <div className='forum-screen-chatbox-input' >
                                                <div className='forum-screen-chatbox-input-input'>
                                                <input
                                                    value={message}
                                                    onChange={onChangeInputValueChat} placeholder='Write your message'/>
                                               
                                                </div>
                                                <div className='forum-img-box'>
                                                
                                                
                                                   
                                                <button>Send</button>
                                                <img
                                                    className="emoji-icon"
                                                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                                    onClick={() => setShowPicker(val => !val)} />
                                                </div>
                                                
                                               
                                           
                                            </div>
                                            {showPicker && <Picker
                                                    pickerStyle={{ width: '100%' }}
                                                    onEmojiClick={onEmojiClick} />}
                                            </form> 

                                

            
                <div className='forum-screen-posts'>
               
                        <div className='forum-screen-big-post'>
                    <span>[BJ] Informacije</span>
                </div>
                    {infoStuffContent}
                </div>
                <div className='forum-screen-posts'>
                    <div className='forum-screen-big-post'>
                        <span>[BJ] Predlozi</span>
                    </div>
                    
                    {suggestionStuffContent}
                             
                           
                </div>
                <div className='forum-screen-posts'>
                    <div className='forum-screen-big-post'>
                        <span>[BJ] Account</span>
                    </div>
                    
                    {accountSettingsContent}
                             
                           
                </div>
                <div className='forum-screen-posts'>
                    <div className='forum-screen-big-post'>
                        <span>[BJ] Server</span>
                    </div>
                    
                    {serverStuffContent}
                             
                           
                </div>
                    
                </div>
                  
                }

            </div>
            <Footer />
            </>
        )
    }














   
    
  return content;
}
