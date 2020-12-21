import React, {useEffect, useState} from "react";
import '../App.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


function Search(props) {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchURL, setSearchURL] = useState("https://images-api.nasa.gov/search?q=nebula&media_type=image");
    const [allImageURLS, setAllImageURLS] = useState([]);
    const [loaded, setLoaded] = useState(true);

    const rootURL = 'https://images-api.nasa.gov/search?q='
    const mediaType = "&media_type=image"

    useEffect(() => {
        setSearchURL(rootURL + searchTerm + mediaType)
    }, [searchTerm])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!loaded) {
                setLoaded(true)
                if(allImageURLS.slice(0,5) !== []){
                    props.updateURLS(searchTerm, allImageURLS.slice(0,5))
                }
            }
        }, 500);
        return () => {
            clearInterval(interval);
        };
    }, [loaded, allImageURLS]);


    function handleClick() {
        let collection = []
        let imageURLs = []
        fetch(searchURL)
            .then((res) => res.json())
            .then((imageCollection) => {
                collection = imageCollection["collection"]["items"];
                collection = collection.map(collection => collection["href"])
                console.log(collection)

                collection.forEach(collection => {
                    fetch(collection)
                        .then(res => res.json())
                        .then(data => {imageURLs.push(data[0]); console.log(data);})
                        .catch(error => {
                            console.error('There has been a problem with your image fetch operation:', error)
                        })
                })

                setAllImageURLS(imageURLs)
            })
            .then(() => {
                setLoaded(false);
            })
            .catch(error => {
                    console.error('There has been a problem with your collection fetch operation:', error)
            });
    }

    return (
        <div className="Search">
            <TextField
                id="standard-basic"
                label="Search"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleClick} variant="contained" size="medium">Search</Button>
        </div>
    );
}

export default Search;
