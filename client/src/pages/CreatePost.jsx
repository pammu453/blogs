import { FileInput, Select, TextInput, Button } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
            <form className="flex flex-col gap-4">
                <div className='flex justify-around gap-2'>
                    <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
                    <Select id="categories" required className='flex-1' >
                        <option defaultValue={"MERN/MEAN"}>MERN/MEAN</option>
                        <option value={"NodeJS"}>NodeJS</option>
                        <option value={"ExpressJS"}>ExpressJS</option>
                        <option value={"MongoDB"}>MongoDB</option>
                        <option value={"Javascipt"}>Javascipt</option>
                        <option value={"GitHub"}>GitHub</option>
                        <option value={"Python"}>Python</option>
                        <option value={"Backend"}>Backend</option>
                        <option value={"Frontend"}>Frontend</option>
                        <option value={"Database"}>Database</option>
                    </Select>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center border-2  border-dashed border-teal-400 p-3 gap-3">
                    <FileInput type="file" accept='image/*' className='w-full flex' required />
                    <Button outline gradientDuoTone="purpleToPink" className='text-nowrap'>Upload Image</Button>
                </div>
                <ReactQuill theme="snow" className='h-48 md:h-64 mb-4' required />
                <Button type='submit' gradientDuoTone="purpleToPink" className='mt-4'>Publish</Button>
            </form>
        </div>
    )
}

export default CreatePost
