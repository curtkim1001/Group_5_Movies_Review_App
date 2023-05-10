import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

const ProfileImage = (props) => {
  const [photo, setPhoto] = useState(null)
  const [newPhotoFormData, setNewPhotoFormData] = useState({
    image: {}
  })
  
  const getPhoto = async () => {
    try {
      const response = await fetch("/api/v1/users/image")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setPhoto(body.photo)
    } catch (error) {
      console.error(`Error in photos Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPhoto()
  }, [])


  const handleImageUpload = (acceptedImage) => {
    // sets state for the image we want to post
    setNewPhotoFormData({
      ...newPhotoFormData,
      image: acceptedImage[0]
    })
  }

  const addPhoto = async (event) => {
    event.preventDefault()
    const newPhotoBody = new FormData()
    newPhotoBody.append("image", newPhotoFormData.image)
    // formData is a special JS object. If we use the entries method on it, we can see our data after file upload
    // for (let pair of newMemeBody.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    
    try {
      const response = await fetch("/api/v1/users/image", {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newPhotoBody
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setPhoto(body.photo)
    } catch (error) {
      console.error(`Error in photos Fetch: ${error.message}`)
    }
  }

  return (
    <div>
      <h4>Profile Picture</h4>
      <div className="callout secondary">
            <img src={photo} />
        </div>
    
      <form className="callout primary" onSubmit={addPhoto}>
        <Dropzone onDrop={handleImageUpload}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Your Profile Picture - drag 'n' drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>

        <input className="button" type="submit" value="Add" />
      </form>
    </div>
  )
}

export default ProfileImage