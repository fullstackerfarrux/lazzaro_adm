import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { BiSolidImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";

const EditProduct = () => {
  const productId = useParams();
  const [uploadImages, setUploadImages] = useState([]);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState(false);
  const [categoryName, setCategoryName] = useState();
  const [categories, setCategories] = useState([]);

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
    let { title, description, price, category } = e.target;

    const resData = JSON.stringify({
      id: productId.id,
      title: title.value,
      description: description.value,
      price: price.value,
      category_name: category.value,
      images: uploadImages,
    });

    await fetch("https://api.lazzaroburger.uz/product/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: resData,
    })
      .then((res) => res.json())
      .then((data) =>
        data.msg == "Updated!"
          ? (toast.success("Updated!"),
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

  if (typeof id !== "undefined" || productId.id !== "") {
    useEffect(() => {
      async function check() {
        await fetch("https://api.lazzaroburger.uz/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: productId.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setProduct(data.product[0]);
            setUploadImages(data.product[0].images);
          });

        await fetch("https://api.lazzaroburger.uz/categories", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => setCategories(data.categories));
      }

      check();
    }, []);
  }

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

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="newproductHeader">
          <h1>Редактировать товар</h1>
          <button type="submit">Сохранить</button>
        </div>
        <div id="newProduct">
          <div className="form_box">
            <div className="category">
              <label htmlFor="category">КАТЕГОРИЯ ТОВАРА</label>
              <select
                name="category"
                id="category"
                required
              >
                <option value="category" disabled>
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
            <div className="title">
              <label htmlFor="title">Название товара</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Точное название товара"
                defaultValue={product.title}
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
                defaultValue={product.description}
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
              <input
                type="number"
                name="price"
                id="price"
                defaultValue={product.price}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
