import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './styles.css'
import HomeItemComponent from './item/component';
import useIntersect from '../hooks/intersect';

const URL = "https://picsum.photos/v2/list"


export default function HomeComponent() {

  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [entry, setNode] = useIntersect();
  const rowRef = useRef(null);


  useEffect(() => {
    const fetchImages = async () => {
      setIsFetching(true);
      const result = await axios(URL + `?page=${currentPage}&limit=12`);
      let res = data;
      res.push(...result.data)
      setData(res);
      setIsFetching(false);
    }
    fetchImages();
  }, [currentPage])


  useEffect(() => {
    if (entry[0] && entry[0].isIntersecting && !isFetching && currentPage < 6) {
      incrementCurrentPage();
    }
  }, [entry])

  function incrementCurrentPage() {
    setCurrentPage(currentPage + 1);
  }


  return (
    <>
      <div ref={rowRef} className="row">
        {data.map((item, i) => {
          return (
            i + 1 === data.length ?
              <div className="col" ref={setNode} key={item.id}>
                <HomeItemComponent item={item} />
              </div>
              :
              <div className="col" key={item.id}>
                <HomeItemComponent item={item} />
              </div>
          )
        })}
      </div>
      {currentPage >= 6 && !isFetching ?
        <div className="end-text">
          <h4>
            You scroll all the way to end
            <span className="catch-up-icon"><i className="fas fa-check-circle"></i> </span>
          </h4>
        </div> :
        <div className="end-text">
          <h4>
            <span className="loading-text">
              Loading More...
              <i className="fa fa-spinner fa-spin"></i>
            </span>


          </h4>
        </div>
      }
    </>
  );

}
