import React from 'react'
import { useSelector } from 'react-redux';
import { selectMessageById } from '../../../redux/categoryApi'
import { format, formatDistance, formatRelative, subDays, parseISO, compareAsc   } from 'date-fns'

export default function ChatBox({ userId }) {
    const chatContent = useSelector(state => selectMessageById(state, userId))

    const { messageimage, messageuser, messagedate, messagecontent} = chatContent
  return (







    <div className='forum-screen-chatbox-messsages-container'>
                 <div className='forum-screen-chatbox-messsages-container-image'>
                    <img src={messageimage.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${messageimage}` : 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'} alt='photo' />
                </div>
                <div className='forum-screen-chatbox-messsages-container-user-container'>
                    <div className='forum-screen-chatbox-messsages-container-user'>


                <div className='forum-screen-chatbox-messsages-container-user-name'>
                    <p>{messageuser}</p>
                </div>
                <div className='forum-screen-chatbox-messsages-container-user-date'>
                    <p>{format(parseISO(messagedate), "Qo MMM, H:m a")}</p>
                </div>
            </div>
            <div className='forum-screen-chatbox-messsages-container-user-messages'>
               {messagecontent}
            </div>

        </div>

    </div>
  )
}
