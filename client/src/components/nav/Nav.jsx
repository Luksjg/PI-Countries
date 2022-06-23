import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../actions";
import styles from "./Nav.module.css"

export default function Nav({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }


  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getByName(name));
    setName("")
    setCurrentPage(1)
  };

  return (
    <form className={styles.searchContainer} onSubmit={(e) => handleClick(e)}>
      <div className={styles.searchBox}>
      <input className={styles.searchInput} type="text" placeholder="Buscar pais..." onChange={(e) => handleInputChange(e)}/>
      <button className={styles.searchButton} type="submit">Buscar</button>
      </div>
    </form>
  );
}
