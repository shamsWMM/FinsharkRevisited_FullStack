import { useState } from "react";
import "./App.css"
import CardList from "./components/CardList/CardList"
import Search from "./components/Search/Search"

function App() {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  };
  
  return (
    <>
      <Search handleButtonClick={handleButtonClick} handleInputChange={handleInputChange} search={search} />
      <CardList />
    </>
  )
}

export default App
