import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Publish({ setVisible }) {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");

  const token = Cookies.get("token");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.name;
    const newInfo = structuredClone(info);
    if (e.target.type === "file") {
      setFile(e.target.files[0]);
    } else {
      newInfo[key] = e.target.value;
    }
    setInfo(newInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in info) {
      formData.append(String(key), String(info[key]));
    }
    formData.append("picture", file);
    try {
      const response = await axios.post(
        "http://localhost:3000/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const id = response.data._id;
      navigate(`/offers/${id}`);
    } catch (error) {
      if (error.response.status === 500) {
        console.log("An error occurred");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };

  return token ? (
    <div className="publish">
      <div className="container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="file">
            <input
              type="file"
              name="picture"
              id="picture"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {file ? (
              <div className="picture">
                <img src={URL.createObjectURL(file)} alt="preview photo" />
                <span
                  onClick={() => {
                    setFile("");
                  }}
                >
                  X
                </span>
              </div>
            ) : (
              <label htmlFor="picture">+ Ajoute une photo </label>
            )}
          </div>
          <div className="input-section">
            <div className="title">
              <h4>Titre</h4>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="ex: Chemise Sézane verte"
                onChange={handleChange}
                required
              />
            </div>
            <div className="description">
              <h4>Décris ton article</h4>
              <textarea
                name="description"
                id="description"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-section">
            <div className="brand">
              <h4>Marque</h4>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="ex: Zara"
                onChange={handleChange}
              />
            </div>
            <div className="size">
              <h4>Taille</h4>
              <input
                type="text"
                name="size"
                id="size"
                placeholder="ex: L/40/12"
                onChange={handleChange}
              />
            </div>
            <div className="color">
              <h4>Couleur</h4>
              <input
                type="text"
                name="color"
                id="color"
                placeholder="ex: Fushia"
                onChange={handleChange}
              />
            </div>
            <div className="condition">
              <h4>Etat</h4>
              <input
                type="text"
                name="condition"
                id="condition"
                placeholder="ex: Neuf avec étiquette"
                onChange={handleChange}
              />
            </div>
            <div className="city">
              <h4>Lieu</h4>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="ex: Paris"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-section">
            <div className="price">
              <h4>Prix</h4>
              <div className="input-price">
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="0,00€"
                  onChange={handleChange}
                  required
                />
                <div className="checkbox">
                  <input type="checkbox" name="exchange" id="exchange" />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <input type="submit" name="" placeholder="Ajouter" />
        </form>
      </div>
    </div>
  ) : (
    (setVisible([false, true]), navigate("/"))
  );
}

export default Publish;
