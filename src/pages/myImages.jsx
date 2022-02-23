import React,{ useState,useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from 'react-bootstrap/Button';

const MyImages = () => {
  const key = 'ff976317-e0fe-4f51-955b-652d26438b25';
  const url = 'https://api.thecatapi.com/v1/images/?limit=10';
  const [images, setImages] = useState([]);

  const getImages = async () => {
    const response = await fetch(url,{
      method: "GET",
      headers:{
        'Content-Type':'application/json',
        'x-api-key' : key
      }
    });
    if(response.status===200){
      const images = await response.json();
      setImages(images);
    }
  }

  useEffect(()=>{
    getImages()
  },[]);

  const deleteImage = async(id) => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`,{
      method: 'DELETE',
      headers:{
        AccessControlAllowOrigin: "*",
        'x-api-key' : key
      }
    });
    if(response.status===204){
      getImages()
    }
  } 

  return(
    <div className="container d-flex flex-column align-items-center">
      <h2 className="my-5">My Images</h2>
        <div className="d-grid row my-3 gap-3">
          <div className="row row-cols-3">
            {
              images?.map(image=> (
                <div key={image.id} className="col-4 d-flex flex-column">
                  <img className="col img-thumbnail" key={image.id} src={image.url} alt={image.id}/>
                  <Button onClick={()=> deleteImage(image.id)} className="my-3 w-50 mx-auto btn-sm" variant="outline-dark">Remove</Button>
                </div>
                )
              )
            }
          </div>
        </div>
    </div>
  )
};

export default MyImages;
