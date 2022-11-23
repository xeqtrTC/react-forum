import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import { useGetNewsByTitleQuery } from '../../redux/usersApi/usersApi';
import Footer from '../Footer/Footer'
import Header from '../header/Header'
import LoadingBox from '../LoadingBox/LoadingBox';
import parse from 'html-react-parser';
import { format, parseISO   } from 'date-fns'

import './HomeScreenNews.css';

export default function HomeScreenNews() {
  const [clicked, setClicked] = useState(true);
  const { n_title } = useParams();
  const { data, isSuccess, isLoading, isError, error} = useGetNewsByTitleQuery(n_title)
console.log(data);
  let content;

  if(isLoading) {
    content = <LoadingBox />
  }

  if(error) {
    content = (
      <>
    <Header color={clicked} />
    <div className='homescreen-container'>
      
      <div className='homescreen-news-fullpage-container'>
        <div className='homescreen-news-fullpage'>
          {error?.data?.message}



        </div>
        
      </div>
      
    </div>
    <Footer />
    </>
    )
  }


  if(isSuccess) {

    const { n_description, n_username, n_date } = data[0];
    content = (
          <>
        <Header color={clicked} />
        <div className='homescreen-container'>
          
          <div className='homescreen-news-fullpage-container'>
            <div className='homescreen-news-fullpage'>
              {parse(n_description)}



            </div>
            <div className='homescreen-fullpage-whouploaded'>
              <span className='whoposted-user'>{n_username}</span>
              <span className='whoposted-span'>{format(parseISO(n_date), "MMMM Qo, yyyy, H:m a")} </span>
            </div>
          </div>
          
        </div>
        <Footer />
        </>
    )
  }

  return content;
}
