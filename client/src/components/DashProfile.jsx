import { useSelector, useDispatch } from 'react-redux'
import { TextInput, Button, Alert } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { updateStart, udpateSuccess, updateFailure } from '../redux/user/userSlice'

const DashProfile = () => {
  const { currentUser} = useSelector(state => state.user)

  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploadError, setimageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [udpatedSuccessfully, setudpatedSuccessfully] = useState(null);
  const [error, setError] = useState(null);
  const [disableBotton, setDisableBotton] = useState(false);
  
  const filePickerRef = useRef()
  const dispatch = useDispatch()

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
    setDisableBotton(true)
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
          setFormData({ ...formData, profilePicture: downlodURL })
          setDisableBotton(false)
        })
      }
    )
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(formData).length === 0) {
      return setError("No changes made")
    }
    setImageFileUploadingProgress(null)
    dispatch(updateFailure(null))
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/updateUser/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        credentials: "include",
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success === false) {
        setudpatedSuccessfully(null)
        return setError(data.message)
      }

      if (res.ok) {
        dispatch(udpateSuccess(data))
        setError(null)
        setudpatedSuccessfully("Profile updated!")
      }
    } catch (error) {
      setError("Something went wrong!")
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl text-slate-300'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          {imageFileUploadingProgress && !imageFileUploadError && imageFileUploadingProgress + "% Uploded"}
        </div>

        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={disableBotton}>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {
        error && <Alert color="failure">
          {error}
        </Alert>
      }
      {
        udpatedSuccessfully && <Alert color="success">
          {udpatedSuccessfully}
        </Alert>
      }
    </div>
  );
}

export default DashProfile
