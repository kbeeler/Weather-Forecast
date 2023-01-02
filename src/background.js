import React, { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import "./App.css";
// import WeatherFetch from "./weatherFetch";

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "USBHyZ2dd8VHdS5f3C2nOlkRJAaNixCGOGM7yT6HB7A",

});

// const PhotoComp = ({ photo }) => {
//   const { user, urls } = photo;
//   console.log("urls.regular", urls.regular);

//   return (
//     <Fragment>
//       <img alt="img" className="img" src={urls.regular} />
//       <a
//         className="credit"
//         target="_blank"
//         rel="noreferrer"
//         href={`https://unsplash.com/@${user.username}`}
//       >
//         {user.name}
//       </a>
//     </Fragment>
//   );
// };

//passing in props
const Body = ({ weatherImage, children }) => {
  const [data, setPhotosResponse] = useState(null);

  useEffect(() => {
    api.search
      .getPhotos({
        query: [weatherImage],
        //query: "dog",
        per_page: 1,
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
      <div className="container">
        {data.response.results[0]?.urls?.regular ? (
          <img
            style={{ width: "100%" }}
            src={data.response.results[0].urls.regular}
            alt=""
          />
        ) : (
          ""
        )}
        ;<div className="centered">{children}</div>

        {/* {data.response.results.map((photo) => (
          <div key={photo.id}>
            <img style={{ width: "100%" }} src={photo.urls.regular} alt="" />   
            <div className="centered">{children}</div>
          </div>
        ))} */}
        {/* <img style={{ width: "100%" }} src={photoTest} alt="" />    */}
      </div>
    );
  }
};

export default Body;
