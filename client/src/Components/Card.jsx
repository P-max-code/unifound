import "../styles/Card.css";
import webpfy from "webpfy";
import { createItem } from "../api";
import React, { useState } from "react";
import upload from "../assets/gallery.png";
import { ThreeDots } from "react-loader-spinner";
import EmailIcon from "@mui/icons-material/Email";
import TitleIcon from "@mui/icons-material/Title";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";

const Card = (props) => {
  const [spinner, setSpinner] = useState(false);
  const [submitTxt, setSubmitTxt] = useState("Submit");
  const [formFields, setFormFields] = useState({
    fileInput: null,
    imagePreview: upload,
    studentName: "",
    itemTitle: "",
    itemDescription: "",
    email: "",
    location: "",
    category: "",
  });

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = file;
      const quality = 60;
      webpfy({ image, quality })
        .then((result) => {
          setFormFields((prevFields) => ({
            ...prevFields,
            fileInput: result.webpBlob,
            imagePreview: URL.createObjectURL(result.webpBlob),
          }));
        })
        .catch((error) => console.error(error));
    } else
      setFormFields((prevFields) => ({
        ...prevFields,
        fileInput: null,
        imagePreview: upload,
      }));
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    if (name === "fileInput") handleImage(event);
    else
      setFormFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
  };

  const prepareFormData = () => {
    if (formFields.fileInput === null) return alert("Please upload an image");
    const formData = new FormData();
    formData.append("file", formFields.fileInput);
    formData.append("studentName", formFields.studentName);
    formData.append("itemTitle", formFields.itemTitle);
    formData.append("itemDescription", formFields.itemDescription);
    formData.append("email", formFields.email);
    formData.append("location", formFields.location);
    formData.append("category", formFields.category);
    return formData;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = prepareFormData();
    if (!formData) return setSpinner(false);
    setSpinner(true);
    setSubmitTxt("Submitting");
    createItem(formData)
      .then(() => {
        setSpinner(false);
        setSubmitTxt("Submitted");
        setTimeout(() => {
          window.location.href = formFields.category.toLowerCase();
        }, 2000);
      })
      .catch((err) => {
        setSubmitTxt("Retry");
        setSpinner(false);
      });
  };

  const formItems = [
    {
      icon: <PersonIcon />,
      name: "studentName",
      placeholder: "Name",
      type: "text",
    },
    {
      icon: <TitleIcon />,
      name: "itemTitle",
      placeholder: "Item Name",
      type: "text",
    },
    {
      icon: <DescriptionIcon />,
      name: "itemDescription",
      placeholder: "Item Description",
      type: "text",
    },
    { icon: <EmailIcon />, name: "email", placeholder: "Email", type: "email" },
    {
      icon: <LocationOnIcon />,
      name: "location",
      placeholder: "Location",
      type: "text",
    },
  ];

  return (
    <div className="container-outer">
      <div className="container-inner" style={{ width: "70%" }}>
        <div
          className="closeIcon"
          onClick={() => {
            props.updateItem();
          }}
        >
          <CloseIcon />
        </div>
        <div className="uploadImg">
          <img src={formFields.imagePreview} alt="logo" id="image" />
          <div className="uploadImgInput">
            <input
              type="file"
              name="fileInput"
              id=""
              accept="image/*"
              className="btnGraphic fileInput bg-grad"
              style={{ paddingLeft: "10px", paddingRight: "0" }}
              onChange={handleImage}
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className="details">
          <div>
            <div className="heading">Report an item!</div>
            <div className="titleInfo">
              Add the relevant information about your item.
            </div>
          </div>
          <form method="POST" onSubmit={handleFormSubmit}>
            {formItems.map((inputField, index) => (
              <div className="inputField" key={index}>
                {inputField.icon}
                <input
                  type={inputField.type}
                  name={inputField.name}
                  placeholder={inputField.placeholder}
                  value={formFields[inputField.name]}
                  onChange={handleFieldChange}
                  required
                  style={{ width: "100%" }}
                />
              </div>
            ))}
            <div className="inputField">
              <CategoryIcon />
              <select
                className="select"
                defaultValue=""
                name="category"
                onChange={handleFieldChange}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="LOST">Lost</option>
                <option value="FOUND">Found</option>
              </select>
            </div>
            <div className="submitBtn">
              <div className="btnOuter">
                <ThreeDots
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  visible={spinner}
                />
                <button className="btnGraphic" type="submit">
                  {submitTxt}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
