import React,{useState} from "react";
import Spinner from 'react-bootstrap/Spinner';

const Upload = () => {
  const key = 'ff976317-e0fe-4f51-955b-652d26438b25';
  const url = 'https://api.thecatapi.com/v1/images/upload';
  const [ selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  
  const uploadImage = async () => {
    setLoading(true);
    const formData = new FormData()
    formData.append('file', selectedFile)
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        Accept:'aplication/json',
        'x-api-key' : key
      },
      body: formData
    })
    if(response.status===200||201){
      setLoading(false);
      setSuccess(true);
      setTimeout(()=>setSuccess(false), 3000);
    } else {
      setLoading(false);
    }
  }

  const onChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  return(
    <div className="container d-flex flex-column align-items-center">
      <h2 className="my-5">Upload images</h2>
      <div className="row p-3 my-3 align-items-center border border-success rounded-pill">
        <div className="col-sm-8">
          <input onChange={onChange} type="file" className="form-control my-3" id="formFile" />
        </div>
        <div className="col-sm-4">
          <button onClick={uploadImage} type="button" className="btn btn-primary">Upload</button>
        </div>
      </div>
      {loading && <Spinner animation="border" variant="primary" />}
      {success && <h4>Uploaded success. You can find your image in My Images</h4>}
    </div>
    )
};

export default Upload;
