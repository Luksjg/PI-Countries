import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../actions";


export default function Nav() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }


  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getByName(name));
    setName('')
  };
  return (
    <form onSubmit={(event) => handleClick(event)}>
      <div>
      <input type="text" placeholder="Buscar pais..." onChange={(e) => handleInputChange(e)}/>
      <button type="submit">Buscar</button>
      </div>
    </form>
  );
}
