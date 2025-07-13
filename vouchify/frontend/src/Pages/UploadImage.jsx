import React, { useState, useEffect } from "react";

const UploadImage = () => {
  const [images, setImages] = useState([]);

  // Load images from localStorage when the component mounts
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(storedImages);
  }, []);

  // Save images to localStorage whenever images state updates
  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(images));
  }, [images]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newImages = [...images];

      for (let i = 0; i < files.length; i++) {
        if (newImages.length < 3) { // Limit to 3 images
          const reader = new FileReader();
          reader.onload = (e) => {
            newImages.push(e.target.result);
            setImages([...newImages]); // Update the state to trigger re-render
          };
          reader.readAsDataURL(files[i]);
        } else {
          alert("You can only upload up to 3 images.");
          break;
        }
      }
    }
  };

  const handleDelete = (index) => {
    // Filter out the image to be deleted
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages); // Update the state

    // Save updated images list to localStorage
    localStorage.setItem("uploadedImages", JSON.stringify(newImages));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Upload Your Images</h1>

      {/* Upload Button */}
      <label className="cursor-pointer bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-blue-100 transition">
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
        Select Images
      </label>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img src={image} alt={`Uploaded ${index}`} className="w-48 h-48 object-cover rounded-lg shadow-lg border-4 border-white" />
            <button 
              onClick={() => handleDelete(index)} 
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
