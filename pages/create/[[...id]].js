/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";


const ProductsManager = () => {
  const initialState = {
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
    sale: "",
    book: "",
  };
  const videoInitial = {
    video_1: "",
    video_2: "",
    video_3: "",
  };


  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;
  const [product, setProduct] = useState(initialState);
  const { sale, title, price, inStock, description, content, category, book } =
    product;
  // --------------- video upload--------------------
  const [videoInput, setVideoInput] = useState(false);
  const [pdfInput, setPdfInput] = useState(false);
  const [categoryArr, setCategoryArr] = useState('');
  useEffect(() => {
    const x = (categories?.filter(item => item?._id === category)).map(item => item.name)
    return setCategoryArr(x)
  }, [category]);

  useEffect(() => {
    if (categoryArr == ('video cources')) {
      setVideoInput(true), setPdfInput(false);
    } else if (categoryArr == ('Books')) { setPdfInput(true), setVideoInput(false) } else { setPdfInput(false), setVideoInput(false) }
  }, [categoryArr]);
  console.log("videoInput", videoInput);
  console.log("pdfInput", pdfInput);
  // --------------- end of video upload--------------------
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(videoInitial);
  console.log("video >>>", video);

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);
  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
        // setVideos(res.product.videos);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
      // setVideos([]);
    }
  }, [id]);

  const handleVideoInput = (e) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 3000 * 3000)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setImages([...images, ...newImages]);
  };
  // const handleVideosInput = (e) => {
  //   dispatch({ type: "NOTIFY", payload: {} });
  //   let newVideos = [];
  //   let num = 0;
  //   let err = "";
  //   const files = [...e.target.files];

  //   if (files.length === 0)
  //     return dispatch({
  //       type: "NOTIFY",
  //       payload: { error: "Files does not exist." },
  //     });

  //   files.forEach((file) => {
  //     // if (file.size > 3000 * 3000)
  //     //   return (err = "The largest image size is 1mb");

  //     // if (file.type !== "image/jpeg" && file.type !== "image/png")
  //     //   return (err = "Image format is incorrect.");

  //     num += 1;
  //     if (num <= 5) newVideos.push(file);
  //     return newVideos;
  //   });

  //   if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

  //   const videoCount = videos.length;
  //   if (videoCount + newVideos.length > 5)
  //     return dispatch({
  //       type: "NOTIFY",
  //       payload: { error: "Select up to 5 images." },
  //     });
  //   setVideos([...video, ...videoCount]);
  // };


  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);
    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        { ...product, images: [...imgOldURL, ...media], video },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });

  };

  return (
    <div
      className="products_manager"
      style={{ width: "90%", margin: "0 auto" }}
    >
      <Head>
        <title>Products Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                placeholder="Price"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="price">In Stock</label>
              <input
                type="number"
                name="inStock"
                value={inStock}
                placeholder="inStock"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            placeholder="Description"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={description}
          />

          <textarea
            name="content"
            id="content"
            cols="30"
            rows="6"
            placeholder="Content"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={content}
          />

          <div className="input-group-prepend px-0 my-2">
            <select
              name="category"
              id="category"
              value={category}
              onChange={handleChangeInput}
              className="custom-select text-capitalize"
            >
              <option value="all">All Products</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-info my-2 px-4">
            {onEdit ? "Update" : "Create"}
          </button>
        </div>
        <div className="col-md-6 my-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file border rounded">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleUploadInput}
                multiple
                accept="image/*"
              />
            </div>
          </div>
          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
                />
                <span onClick={() => deleteImage(index)}>X</span>
              </div>
            ))}
          </div>
          <div className="col-sm-6">
            <label htmlFor="sale">Sale</label>
            <input
              type="number"
              name="sale"
              value={sale}
              placeholder="sale product"
              className="d-block w-100 p-2"
              onChange={handleChangeInput}
            />
          </div>
          {videoInput ? (<>
            {/* <div className="col-sm-6">
              <label htmlFor="video link">Video link</label>
              <input
                type="text"
                name="video"
                value={video}
                placeholder="video link"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div> */}
            <div className="col-sm-6">
              <label htmlFor="video link">Video_1 link</label>
              <input
                type="text"
                name="video_1"
                value={video.video_1}
                placeholder="video_1 link"
                className="d-block w-100 p-2"
                onChange={handleVideoInput}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="video_2 link">Video_2 link</label>
              <input
                type="text"
                name="video_2"
                value={video.video_2}
                placeholder="video_2 link"
                className="d-block w-100 p-2"
                onChange={handleVideoInput}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="video_3 link">Video_3 link</label>
              <input
                type="text"
                name="video_3"
                value={video.video_3}
                placeholder="video_3 link"
                className="d-block w-100 p-2"
                onChange={handleVideoInput}
              />
            </div>
          </>
          ) : (
            ""
          )}
          {pdfInput ? (
            <div className="col-sm-6">
              <label htmlFor="book's link">Book's link</label>
              <input
                type="text"
                name="book"
                value={book}
                placeholder="book's link"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductsManager;
