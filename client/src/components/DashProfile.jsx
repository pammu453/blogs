import { useSelector } from 'react-redux'
import { TextInput, Button, Alert } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)

  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploadError, setimageFileUploadError] = useState(null);

  const filePickerRef = useRef()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImageFileURL(URL.createObjectURL(file))
  }

  const uploadImage = async () => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    setimageFileUploadError(null)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        setImageFileUploadingProgress(percent.toFixed(0))
      },
      (error) => {
        setimageFileUploadError("Could not upload image (max size 2MB ade Image Only)")
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downlodURL) => {
          setImageFileURL(downlodURL)
        })
      }
    )
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl text-slate-300'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div onClick={() => filePickerRef.current.click()} className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img
            src={imageFileURL || currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>
        {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}

        <div className='text-center text-green-500'>
          {imageFileUploadingProgress && !imageFileUploadError && imageFileUploadingProgress+"% Uploded"}
        </div>

        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile
