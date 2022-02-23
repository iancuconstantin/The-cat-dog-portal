import React,{ useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const FavoriteImages = () => {
    const url = 'https://api.thecatapi.com/v1/favourites';
    const key = 'ff976317-e0fe-4f51-955b-652d26438b25';
    const [favorites, setFavorites] = useState([]);

    const getFavorites = async () => {
        const response = await fetch(url,{
            method: "GET",
            headers:{
                'Content-Type':'application/json',
                'x-api-key' : key
            }
        });
        if(response.status===200){
        const images = await response.json();
        setFavorites(images);
        }
    }

    useEffect(()=>{
        getFavorites()
    },[])


    const removeFavorite = async (id) => {
        const url = `https://api.thecatapi.com/v1/favourites/${id}`;
        const response = await fetch(url,{
            method: 'DELETE',
            headers:{
                Accept:'aplication/json',
                'x-api-key' : key
            }
        })
        if(response.status===200){
            setFavorites(favorites.filter(item=>item.id!==id))
        }
    }

    return(
        <div className="container d-flex flex-column align-items-center">
            <h2 className="my-5">My favorite images</h2>
            <div className="d-grid row my-3 gap-3">
                <div className="row row-cols-3 my-3">
                    {
                        favorites?.map(image=> (
                            <div className="col-4 d-flex flex-column align-items-center" key={image.id}>
                                <img className="col img-thumbnail" src={image.image.url} alt={image.id}/>
                                <Button onClick={()=> removeFavorite(image.id)} className="my-3 w-50 mx-auto btn-sm" variant="outline-dark">Remove</Button>
                            </div>
                        ))
                    }
                </div>
            </div>
    </div>
    )
}

export default FavoriteImages;