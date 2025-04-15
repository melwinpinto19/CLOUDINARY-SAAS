"use client";
import { uploadVideo } from "@/api/upload";
import { videoUploadSchema } from "@/schemas";
import React, { useState } from "react";
import { toast } from "react-toastify";

function VideoUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    file: "",
  });

  const handleVideoUpload = async () => {
    const result = videoUploadSchema.safeParse({
      title,
      description,
      file,
    });

    // check if the result is successful or not:
    if (!result.success) {
      // extacting the zod erorr message array :
      const error = JSON.parse(result.error.message);

      // extacting the error message from the array and setting it to the state:
      const errors: any = {};
      error.forEach((each: any) => {
        const field = each.path[0] as string;
        errors[field] = each.message;
      });

      console.log("erros", errors);

      setErrors((prev) => ({
        title: errors.title,
        description: errors.description,
        file: errors.file,
      }));

      return;
    }

    // if the result is successful, reset the errors state:
    setErrors({ title: "", description: "", file: "" });

    // upload the video:
    const response = await uploadVideo(title, description, file as File);

    if (!response.error) {
      // show success message:
      toast.success(response.statusText, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // reset the form:
      setTitle("");
      setDescription("");
      setFile(undefined);
    } else {
      // show error message:
      toast.error(response.statusText, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="p-[40px]">
      <h1 className="text-2xl">Video Upload</h1>
      <div className="mt-[30px]">
        {/* title */}
        <div className="flex flex-col gap-[10px] mb-[20px]">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-neutral w-full"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
        </div>

        {/* description */}
        <div className="flex flex-col gap-[10px] mb-[20px]">
          <label htmlFor="title">Description</label>
          <textarea
            className="textarea w-full"
            placeholder="Bio"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </div>

        {/* file upload */}
        <div className="flex flex-col gap-[10px] mb-[20px]">
          <label htmlFor="title">Upload file</label>
          <input
            type="file"
            className="file-input file-input-neutral w-full"
            // value={file?.name}
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          {errors.file && <span className="text-red-500">{errors.file}</span>}
        </div>

        {/* upload button */}
        <button className="btn btn-primary" onClick={handleVideoUpload}>
          Upload Video
        </button>
      </div>
    </div>
  );
}

export default VideoUpload;
