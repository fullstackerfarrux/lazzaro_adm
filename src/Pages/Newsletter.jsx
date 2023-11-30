import React, { useState } from "react";
import Header from "../Components/Header";
import { toast } from "react-toastify";
import { BiSearchAlt, BiSolidImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import Sidebar from "../Components/Sidebar";

const Newsletter = () => {
  const [newsletter, setNewsletter] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [uploadVideos, setUploadVideos] = useState([]);

  const onSelectFile = async (e) => {
    const selectedFiles = e.target.files;
    let uploadType = "";
    uploadType = selectedFiles[0].type.includes("video") ? "video" : "image";

    let imageUrl = selectedFiles[0];
    let formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", "lazzaro_burger");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dnkt34mnf/${uploadType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    const uploadImage = [data.secure_url];
    const uploadVideo = [data.secure_url];

    uploadType == "video"
      ? setUploadVideos(uploadVideo)
      : setUploadImages(uploadImage);
  };

  const handleSubmitNews = async (e) => {
    e.preventDefault();
    let { text } = e.target;
    let videos = uploadVideos.length > 0 ? uploadVideos : "";
    let images = uploadImages.length > 0 ? uploadImages : "";

    await fetch("http://localhost:4001/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: images,
        videos: videos,
        text: text.value,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Created!"
          ? (toast.success("Успешно отправлен!"),
            setTimeout(() => {
              window.location = "/newsletter";
            }, 1500))
          : toast.error("Invalid token!")
      );
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="addNewsletter">
          <div className="addNewsletter_box">
            <div>
              <h2>Создание рассылку</h2>
            </div>
            <hr />
            <form onSubmit={(e) => handleSubmitNews(e)}>
              <div className="images">
                <div className="flex">
                  <div className="addimage">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={onSelectFile}
                    />
                    <span className="add">
                      Загрузить файл
                      <BiSolidImageAdd
                        size={23}
                        style={{ marginLeft: 10, marginTop: 3 }}
                      />
                    </span>
                  </div>

                  <div className="allImage">
                    {uploadImages &&
                      uploadImages.map((image, index) => {
                        return (
                          <div
                            key={index}
                            className="only"
                            style={{
                              display: "inline-block",
                              marginRight: 10,
                            }}
                          >
                            <TiDelete
                              size={26}
                              color="red"
                              className="editIcon"
                              onClick={() => {
                                setUploadImages(
                                  uploadImages.filter((e) => e !== image)
                                );
                              }}
                            />
                            <img src={image} alt="umami" />
                          </div>
                        );
                      })}

                    {uploadVideos &&
                      uploadVideos.map((image, index) => {
                        return (
                          <div
                            key={index}
                            className="only"
                            style={{
                              display: "inline-block",
                              marginRight: 10,
                            }}
                          >
                            <TiDelete
                              size={26}
                              color="red"
                              className="editIcon"
                              onClick={() => {
                                setUploadVideos(
                                  uploadVideos.filter((e) => e !== image)
                                );
                              }}
                            />
                            <video
                              src={image}
                              controls
                              alt="umami"
                              width={250}
                              height={140}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <textarea
                type="text"
                placeholder="Расскажите о новости"
                className="text"
                id="text"
              />
              <div className="buttons">
                <button type="submit" className="save">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
