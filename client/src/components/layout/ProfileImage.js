import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

const ProfileImage = (props) => {
  const [photo, setPhoto] = useState(null);
  const [newPhotoFormData, setNewPhotoFormData] = useState({
    image: {},
  });

  const getPhoto = async () => {
    try {
      const response = await fetch("/api/v1/users/image");
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      setPhoto(body.photo);
    } catch (error) {
      console.error(`Error in photos Fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);

  const handleImageUpload = (acceptedImage) => {
    setNewPhotoFormData({
      ...newPhotoFormData,
      image: acceptedImage[0],
    });
  };

  const addPhoto = async (event) => {
    event.preventDefault();
    const newPhotoBody = new FormData();
    newPhotoBody.append("image", newPhotoFormData.image);

    try {
      const response = await fetch("/api/v1/users/image", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newPhotoBody,
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      setPhoto(body.photo);
    } catch (error) {
      console.error(`Error in photos Fetch: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="callout secondary profile-pic">
        <img src={photo} />
      </div>

      <form className="callout primary picture-form" onSubmit={addPhoto}>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
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
  );
};

export default ProfileImage;
