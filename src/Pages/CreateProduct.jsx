import React, { useEffect, useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [uploadImages, setUploadImages] = useState([]);
  const [category, setCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function get() {
      await fetch("https://api.lazzaroburger.uz/categories", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.categories), console.log(data);
        });
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
    const uploadImage = [data.secure_url];

    setUploadImages(uploadImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { title, description, price, category } = e.target;

    const resData = JSON.stringify({
      title: title.value,
      description: description.value,
      price: price.value,
      category_name: category.value,
      images: uploadImages,
    });

    await fetch("https://api.lazzaroburger.uz/product/create", {
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
              window.location = "/";
            }, 1500))
          : toast.error("Invalid token!")
      );
  };

  const handleCategory = async (e) => {
    e.preventDefault();
    let { category_name } = e.target;

    await fetch("https://api.lazzaroburger.uz/category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: category_name.value,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Created!"
          ? (toast.success("Created!"),
            setTimeout(() => {
              setCategory(false);
            }, 1500))
          : toast.error("Invalid token!")
      );

    await fetch("https://api.lazzaroburger.uz/categories", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    let { category } = e.target;

    await fetch("https://api.lazzaroburger.uz/category/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: category.value,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Deleted!"
          ? (toast.success("Deleted!"),
            setTimeout(() => {
              setDeleteCategory(false);
            }, 1500))
          : toast.error("Invalid token!")
      );

    await fetch("https://api.lazzaroburger.uz/categories", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  };

  return (
    <>
      {category ? (
        <div className="create">
          <div className="create_box">
            <div className="create_box_text">
              <h2>Создать категорию</h2>
            </div>
            <form onSubmit={(e) => handleCategory(e)}>
              <input
                type="text"
                name="category"
                id="category_name"
                placeholder="Название категории"
                required
              />
              <div className="create_btn">
                <button onClick={() => setCategory(false)} className="no">
                  Отмена
                </button>{" "}
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

      {deleteCategory ? (
        <div className="deleteCategory">
          <div className="delete_box">
            <div className="delete_box_text">
              <h2>Удалить категорию</h2>
            </div>
            <form onSubmit={(e) => handleDeleteCategory(e)}>
              <select name="category" id="category" required>
                <option value="category" selected disabled>
                  Выбрать категорию
                </option>
                {categories.length > 0
                  ? categories.map((c, index) => (
                      <option value={c.category_name} key={index}>
                        {c.category_name}
                      </option>
                    ))
                  : ""}
              </select>
              <div className="create_btn">
                <button
                  onClick={() => setDeleteCategory(false)}
                  className="save"
                >
                  Отмена
                </button>
                <button type="submit" className="no">
                  Удалить
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="newproductHeader">
          <h1>Создание товара</h1>
          <button type="submit">Сохранить</button>
        </div>
        <div id="newProduct">
          <div className="form_box">
            <div className="category">
              <label htmlFor="category">КАТЕГОРИЯ ТОВАРА</label>
              <select name="category" id="category" required>
                <option value="category" selected disabled>
                  Выбрать категорию
                </option>
                {categories.length > 0
                  ? categories.map((c, index) => (
                      <option value={c.category_name} key={index}>
                        {c.category_name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="flex">
              <p
                style={{
                  cursor: "pointer",
                  marginTop: 5,
                  color: "rgba(16, 16, 214, 0.557)",
                  marginLeft: 5,
                }}
                onClick={() => setCategory(true)}
              >
                Создать категорию?
              </p>
              <p
                style={{
                  cursor: "pointer",
                  marginTop: 5,
                  color: "red",
                  marginLeft: 30,
                }}
                onClick={() => setDeleteCategory(true)}
              >
                Удалить категорию?
              </p>
            </div>
            <div className="title">
              <label htmlFor="title">Название товара</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Точное название товара"
                maxLength={90}
              />
            </div>
            <div className="description">
              <label htmlFor="description">Описание товара</label>
              <textarea
                name="description"
                id="description"
                required
                placeholder="Расскажите о своем товаре"
              />
            </div>

            <div className="images">
              <label htmlFor="image">Общие фотографии товара</label>
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
                          style={{ display: "inline-block", marginRight: 10 }}
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

            <div className="price">
              <label htmlFor="price">Цена продажи, so'm</label>
              <input type="number" name="price" id="price" required />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
