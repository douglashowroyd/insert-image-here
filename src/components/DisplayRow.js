import React, {useEffect, useState} from "react";
import '../App.css';



function DisplayRow(props) {

    const [imageURLS, setImageURLS] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setImageURLS(props.listURLS)
        setSearchTerm(props.searchTerm)
    }, [props])

    return (
        <div className="Display-Row">
            <p>{searchTerm}:</p>
            {imageURLS.map((image, i) =>
                <img src={image} key={i} width="15%" alt="Error"/>
            )}
        </div>
    );

}

export default DisplayRow;
