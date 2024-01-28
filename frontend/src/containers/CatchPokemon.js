import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function CatchPokemon() {
  const pokemon = useSelector((state) => state.detPokemon);
  const { id, name, img, url, base } = pokemon;
  const [c_id, setCID] = useState("");
  const [c_name, setNAME] = useState("");
  const [c_img, setIMG] = useState("");
  const [c_url, setURL] = useState("");
  const [c_base, setBASE] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios
      .post(
        "http://localhost:4000/api/pokemon/catch",
        {
          id: c_id,
          name: c_name,
          img: c_img,
          url: c_url,
          base: c_base,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => {
        console.log("error : ", err);
      });

    const data = response.data.message;

    if (data === "pokemon successfully captured") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message, { delay: 100 });
    }
  };

  return (
    <div>
      <input type="hidden" value={id} name="c_id" ref={() => setCID(id)} />
      <input
        type="hidden"
        value={name}
        name="c_name"
        ref={() => setNAME(name)}
      />
      <input type="hidden" value={img} name="c_img" ref={() => setIMG(img)} />
      <input type="hidden" value={url} name="c_url" ref={() => setURL(url)} />
      <input
        type="hidden"
        value={base}
        name="c_base"
        ref={() => setBASE(base)}
      />
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="buttons mt-5">
          <button type="submit" className="button is-success">
            Catch
          </button>
        </div>
      </form>
      <ToastContainer autoClose={10000} />
    </div>
  );
}

export default CatchPokemon;
