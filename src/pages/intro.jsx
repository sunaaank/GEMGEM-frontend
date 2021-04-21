import { Button, f7ready, Page, Navbar, Swiper, SwiperSlide, Toolbar } from 'framework7-react';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper';
import sanitizeHtml from '../js/utils/sanitizeHtml';

const IntroPage = (props) => {
  const [slides, setSlides] = useState([]);
  let images = ['couple', 'segment', 'chilling', 'choose', 'chatting', 'confirmed', 'agreement', 'grades', 'brainstorming', 'hiring', 'love', 'messages1', 'development', 'team', 'together', 'space', 'mobile', 'website', 'easter', 'romantic', 'tasting', 'drone', 'coding', 'mindfulness', 'artificial', 'celebration', 'virtual', 'doggy', 'static', 'healthy', 'data', 'sleep', 'force', 'makeup', 'bicycle', 'podcast', 'fishing', 'credit', 'workout', 'pilates', 'group', 'mouth', 'school']
  useEffect(() => {
    f7ready(async (f7)=>{
      setSlides(_.zip(_.sampleSize(images, 3), ["<script>console.log('a')</script>\n", "", ""]))
    })
  }, []);

  return (
        <Swiper
          // className='h-85'
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          // pagination={{clickable: true }}
          observer
        >
          {slides.map( (item, i) => 
            <SwiperSlide key={i}>
              <div className="flex justify-center p-0">
                {/*<img className="resize" src={`https://insomenia.com/svgs/${item[0]}`} alt=""/>*/}
                <img src={`https://www.onespan.com/sites/default/files/blog/images/icon.ruby_.png` } />
              </div>
              
              {sanitizeHtml(item[1],{className: "text-lg text-center pt-4"})}
            </SwiperSlide>
            
          )}
        </Swiper>
  )
}
export default IntroPage