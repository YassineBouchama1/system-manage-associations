'use client'
import Image from 'next/image';
import { useState, type FC } from 'react';

interface UploaderImgProps {
    text:string,
    defaultImg?:string,
    name:string
}

const UploaderImg: FC<UploaderImgProps> = ({
  text,
  defaultImg = "/imgUploader.png",
  name
}) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImg);





  //onchange image 
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      // Check if uploaded file is an image
      if (!uploadedFile.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      const newImageUrl = URL.createObjectURL(uploadedFile);
      setImageUrl(newImageUrl);
    }
  };

  return (
    <div className="w-full flex flex-wrap flex-col items-center">
      <label htmlFor="img" className="cursor-pointer text-center">
        <Image
          className="size-24 rounded-full"
          src={imageUrl}
          alt="upload img"
          width="200"
          height="200"
        />
        <p className="text-theme-color">{text && text}</p>
      </label>

      <input
        className="hidden"
        id="img"
        type="file"
        accept="image/*"
        name={name}
        onChange={handleImageChange}
      ></input>
    </div>
  );
};
export default UploaderImg;