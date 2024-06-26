import { ClassValue } from "clsx";
import React, { useEffect, useState } from "react";
import cn from "../../../../../libs/utils/cn";
interface IAddPosterVideoProps {
  className?: ClassValue;
  onChange: (file: File | null) => void;
}
const AddPosterVideo: React.FC<IAddPosterVideoProps> = ({
  className,
  onChange,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      // Clean up the object URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);
  return (
    <div className={cn("", className)}>
      <p>Video's poster</p>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-96 border-2  border-dashed rounded-lg cursor-pointer "
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Selected"
              className="w-full h-96 object-cover rounded-lg py-2"
            />
          ) : (
            <>
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG
              </p>
            </>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImage(e.target.files[0]);
              onChange(e.target.files[0]);
            }
          }}
        />
      </label>
    </div>
  );
};

export default AddPosterVideo;
