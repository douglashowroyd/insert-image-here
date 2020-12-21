//import logo from './logo.svg';
import nasaLogo from './nasa-logo-web-rgb.png'
import './App.css';
import Search from "./components/Search";
import Display from "./components/Display";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";

function App() {
    const [imageUrls, setImageUrls] = useState([]);
    const [searchTerms, setSearchTerms] = useState([]);

    function updateURLS(searchTerm, listURLs){
        if (listURLs.length !== 0 && listURLs[0].length !== 0){
            if (imageUrls.length === 0) {
                setImageUrls([listURLs])
                setSearchTerms([searchTerm])
            } else {
                setImageUrls(urls => [listURLs, ...urls])
                setSearchTerms(terms => [searchTerm, ...terms])
            }
        }
    }

    function clear(){
        setImageUrls([]);
        setSearchTerms([]);
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={nasaLogo} className="App-logo" alt="logo" />
        <br/>
        <Search updateURLS={updateURLS}/>
        <Button onClick={clear} variant="contained" size="medium">Clear</Button>
        <br/>
        <Display imageUrls={imageUrls} searchTerms={searchTerms}/>
      </header>
    </div>
  );
}

export default App;
