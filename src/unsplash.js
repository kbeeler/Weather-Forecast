
import React, { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import WeatherFetch from "./weatherFetch";


const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "USBHyZ2dd8VHdS5f3C2nOlkRJAaNixCGOGM7yT6HB7A",
});

const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <Fragment>
      <img className="img" src={urls.regular} />
      <a
        className="credit"
        target="_blank"
        rel="noreferrer"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
    </Fragment>
  );
};

//passing in props
const Body = ({weatherImage}) => {
  const [data, setPhotosResponse] = useState(null);

  console.log('weatherImage', weatherImage);
  
  useEffect(() => {
    api.search
      .getPhotos({ 
        query: [weatherImage], 
        //query: "dog", 
        per_page: 2,
        orientation: "landscape",
      })
    
      .then((result) => {
        setPhotosResponse(result);
        
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [weatherImage]);


 

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="feed">
        <ul className="columnUl">
          {data.response.results.map((photo) => (
            <li key={photo.id} className="li">
              <PhotoComp photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Body;
