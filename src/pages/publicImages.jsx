import React,{ useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';

const PublicImages = () => {
  const url = 'https://api.thecatapi.com/v1/categories/?limit=20';
  const key = 'ff976317-e0fe-4f51-955b-652d26438b25';
  const [categ, setCateg] = useState([]);
  const [selectedCateg, setSelectedCateg] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');
  const [images, setImages] = useState([]);

  const getCategories = async () => {
    const response = await fetch(url);
    const categories = await response.json();
    if(response.status===200){
      setCateg(categories);
    }
  }

  const getImages = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search/?category_ids=${selectedCateg}&limit=${selectedNumber}`);
    const images = await response.json();
    if(response.status===200){
      setImages(images)
    }
  }

  useEffect(()=>{
    getCategories();
  },[]);

  const setCategory = (value) =>{
    setSelectedCateg(value)
  }

  const setNumber = (value) => {
    setSelectedNumber(value)
  }

  const setFavorites = async (id) => {
    document.getElementById(id).setAttribute("disabled", "true");
    const url = 'https://api.thecatapi.com/v1/favourites';
    fetch(url,{
      method:"POST",
      headers: {
        'Content-Type':'application/json',
        'x-api-key' : key
      },
      body: JSON.stringify({image_id: id, sub_id: "your-user-1234"})
    })
  }

  return(
    <div className="container d-flex flex-column align-items-center">
      <h2 className="my-5">Public images</h2>
      <div className="d-flex flex-columns justify-content-center">

        <select className="form-select mx-2" aria-label="Default select example" onChange={(e)=>setCategory(e.target.value)}>
          <option>Select a category...</option>
          {
            categ.map(item=>{
              return(
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            })
          }
        </select>

        <select className="form-select mx-2" aria-label="Default select example" onChange={(e)=>setNumber(e.target.value)}>
          <option>Select a number of pics...</option>
          <option value="3">3</option>
          <option value="9">9</option>
          <option value="15">15</option>
        </select>
      </div>

      <div className="d-flex justify-content-center my-3">
        <button onClick={getImages} type="button" className="btn btn-primary">Get Images</button>
      </div>

      <div className="d-grid row my-3 gap-3">
          <div className="row row-cols-3">
            {
              images?.map(image=> (
                <div key={image.id} className="col-4 my-3 d-flex flex-column">
                  <img className="col img-thumbnail" key={image.id} src={image.url} alt={image.id}/>
                  <Button id={image.id} onClick={()=>setFavorites(image.id)} className="my-3 w-50 mx-auto btn-sm" variant="outline-success">Add to FAVORITE</Button>
                </div>
                )
              )
            }
        </div>
      </div>
    </div>
  )
};

export default PublicImages;
