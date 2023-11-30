import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiSearchAlt, BiSolidImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";

const Banner = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [addPhoto, setAddPhoto] = useState(false);
  const [deltePhoto, setDeletePhoto] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function get() {
      await fetch("http://localhost:4001/banner/get", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setImages(data.images));
    }

    get();
  }, []);

  const onSelectFile = async (e) => {
    const selectedFiles = e.target.files;

    let imageUrl = selectedFiles[0];
    let formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", "lazzaro_burger");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnkt34mnf/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    const uploadImage = [...uploadImages, data.secure_url];

    setUploadImages(uploadImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resData = JSON.stringify({
      img_url: uploadImages,
    });

    await fetch("http://localhost:4001/banner/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: resData,
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Created!"
          ? (toast.success("Created!"),
            setTimeout(() => {
              window.location = "/banner";
            }, 1500))
          : toast.error("Invalid token!")
      );
  };

  const handleDelete = async (e) => {
    console.log(images);
    const resData = JSON.stringify({
      imges_url: images,
    });

    await fetch("http://localhost:4001/banner/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: resData,
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Deleted!"
          ? (toast.success("Deleted!"),
            setTimeout(() => {
              window.location = "/banner";
            }, 1500))
          : toast.error("Invalid token!")
      );
  };

  return (
    <>
      {addPhoto ? (
        <div className="addPhoto">
          <div className="addPhoto_box">
            <div>
              <h2>Добавить фотогарфию</h2>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="images">
                <div className="flex">
                  <div className="addimage">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={onSelectFile}
                      required
                      placeholder="Расскажите о своем товаре"
                    />
                    <span className="add">
                      Загрузить фотографии
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
                            <img src={image} alt="lazzaro" />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button className="no" onClick={() => setAddPhoto(false)}>
                  Назад
                </button>
                <button type="submit" className="save">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      {deltePhoto ? (
        <div className="deletePhoto">
          <div className="deletePhoto_box">
            <div>
              <h2>Удалить фотогарфию</h2>
            </div>
            <div className="images">
              <div className="flex">
                <div className="allImage">
                  {images.map((image, index) => {
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
                            let filter = images.filter(
                              (p, index) => p.banner_img !== image.banner_img
                            );

                            setImages(filter);
                          }}
                        />
                        <img src={image.banner_img} alt="lazzaro" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="no" onClick={() => setDeletePhoto(false)}>
                Назад
              </button>
              <button
                type="submit"
                className="save"
                onClick={() => handleDelete()}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <Header text="Вид баннера" />
      <div className="flex">
        <Sidebar />
        <div className="view_banner">
          <div className="view_fromtg">
            <div className="header container">
              <img
                src={"/lazzaro.jpg"}
                width={50}
                height={50}
                style={{ borderRadius: "50%", border: "0.5px solid silver" }}
              />
              <div className="flex">
                <HiOutlineShoppingBag
                  size={25}
                  color="#004225"
                  style={{ margin: "0px 15px" }}
                />
                <BiSearchAlt
                  size={25}
                  color="#004225"
                  onClick={() => setOpen(true)}
                />
              </div>
            </div>
            <div className="container embla" ref={emblaRef}>
              <div className="embla__container">
                {images?.map((p, index) => (
                  <img
                    src={p.banner_img}
                    className="embla__slide"
                    width={350}
                    height={140}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="table">
              <div
                className="table_text"
                style={{
                  borderBottom: "2px solid rgb(199, 22, 18)",
                  cursor: "pointer",
                }}
              >
                <h3>Лаваш</h3>
              </div>
              <div
                className="table_text"
                style={{
                  borderBottom: "none",
                  cursor: "pointer",
                }}
              >
                <h3>Бургер</h3>
              </div>
              <div
                className="table_text"
                style={{
                  borderBottom: "none",
                  cursor: "pointer",
                }}
              >
                <h3>Шаурма</h3>
              </div>
              <div
                className="table_text"
                style={{
                  borderBottom: "none",
                  cursor: "pointer",
                }}
              >
                <h3>Снеки</h3>
              </div>
              <div
                className="table_text"
                style={{
                  borderBottom: "none",
                  cursor: "pointer",
                }}
              >
                <h3>Напитки</h3>
              </div>
            </div>
            <div className="products">
              <div className="product">
                <div>
                  <img
                    src={"./lavash1.jpg"}
                    width={"100%"}
                    alt="lazzaro"
                    style={{
                      cursor: "pointer",
                      minWidth: 171,
                      height: 146,
                      overflow: "clip",
                    }}
                  />
                </div>
                <div className="info" style={{ cursor: "pointer" }}>
                  <h2>Lazzaro Лаваш</h2>
                  <div className="price">
                    <p>28 000 сум</p>
                  </div>
                </div>
                <button>Добавить в корзину</button>
              </div>
              <div className="product">
                <div>
                  <img
                    src={"./lavash2.jpg"}
                    width={"100%"}
                    alt="lazzaro"
                    style={{
                      cursor: "pointer",
                      minWidth: 171,
                      height: 146,
                      overflow: "clip",
                    }}
                  />
                </div>
                <div className="info" style={{ cursor: "pointer" }}>
                  <h2>Lazzaro Лаваш Биг</h2>
                  <div className="price">
                    <p>29 000 сум</p>
                  </div>
                </div>
                <button>Добавить в корзину</button>
              </div>
            </div>
          </div>

          <div className="buttons">
            <button onClick={() => setDeletePhoto(true)} className="no">
              Удалить фотографию
            </button>
            <button onClick={() => setAddPhoto(true)} className="save">
              Добавить фотогарфию
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
