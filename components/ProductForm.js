// Importing required modules and components
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

// ProductForm component
export default function ProductForm({
  _id,
  reference: existingReference,
  title: existingTitle,
  description: existingDescription,
  marque: existingMarque,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  // State declarations
  const [reference, setReference] = useState(existingReference || "");
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [marque, setMarque] = useState(existingMarque || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Fetch categories from the server using useEffect
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  // Function to save the product data
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      reference,
      title,
      description,
      marque,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      // Update an existing product
      await axios.put("/api/products", { ...data, _id });
    } else {
      // Create a new product
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  // Redirect to the products page when the product is saved
  if (goToProducts) {
    router.push("/products");
  }

  // Function to upload an image to Firebase storage
  const uploadImage = async (file) => {
    setIsUploading(true);
    console.log(file);
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);

      // Get the URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      setImages((prevImages) => [...prevImages, downloadURL]);
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Event handler for image upload
  const handleUploadImages = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      uploadImage(file);
    }
  };

  // Function to update the order of images
  function updateImagesOrder(images) {
    setImages(images);
  }

  // Function to set product properties
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  // Determine the properties to fill based on selected category
  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  // JSX rendering of the form
  return (
    <form onSubmit={saveProduct}>
      <label>Référence du produit</label>
      <input
        type="number"
        placeholder="Référence"
        value={reference}
        onChange={(ev) => setReference(ev.target.value)}
      />
      <label>Nom du produit</label>
      <input
        type="text"
        placeholder="Nom du produit"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Catégorie</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 bg-white shadow-sm rounded-lg border border-gray-200"
              >
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Ajoute une image</div>
          {/* <input type="file" onChange={uploadImages} className="hidden"/> */}
          <input type="file" onChange={handleUploadImages} className="hidden" />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Marque</label>
      <textarea
        placeholder="marque"
        value={marque}
        onChange={(ev) => setMarque(ev.target.value)}
      />
      <label>Prix (en €)</label>
      <input
        type="number"
        placeholder="prix"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Enregistrer
      </button>
    </form>
  );
}
