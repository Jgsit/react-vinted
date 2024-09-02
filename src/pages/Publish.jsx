import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function Publish() {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");

  //  const token = Cookies.get("token");
  const token =
    "ONc1422LYM_1WhrjUHJ79MmVThtBJWVw5csF2i3oLMSfLgTQZn75NSpjmLUwTw_3";

  const handleChange = (e) => {
    const key = e.target.name;
    const newInfo = structuredClone(info);
    if (e.target.type === "file") {
      console.log(e.target.files[0]);

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
      alert(JSON.stringify(response.data));
    } catch (error) {
      if (error.response.status === 500) {
        console.log("An error occurred");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Vends ton article</label>
      <input type="file" name="picture" id="picture" onChange={handleChange} />
      <input
        type="text"
        name="title"
        id="title"
        placeholder="ex: Chemise Sézane verte"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        id="description"
        placeholder="ex: porté quelquefois, taille correctement"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="brand"
        id="brand"
        placeholder="ex: Zara"
        onChange={handleChange}
      />
      <input
        type="text"
        name="size"
        id="size"
        placeholder="ex: L/40/12"
        onChange={handleChange}
      />
      <input
        type="text"
        name="color"
        id="color"
        placeholder="ex: Fushia"
        onChange={handleChange}
      />
      <input
        type="text"
        name="condition"
        id="condition"
        placeholder="ex: Neuf avec étiquette"
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        id="city"
        placeholder="ex: Paris"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="price"
        id="price"
        placeholder="0,00€"
        onChange={handleChange}
        required
      />
      <input type="checkbox" name="" />
      <input type="submit" name="" placeholder="Ajouter" />
    </form>
  );
}

export default Publish;
