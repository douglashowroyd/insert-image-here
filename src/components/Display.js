import React, {useEffect, useState} from "react";
import DisplayRow from "./DisplayRow";


function Display(props) {

    const [allImageURLS, setAllImageURLS] = useState([]);
    const [searchTerms, setSearchTerms] = useState([]);

    useEffect(() => {
        setAllImageURLS(props.imageUrls)
        setSearchTerms(props.searchTerms)
    }, [props])

    return (
        <div>
            {allImageURLS.reverse().map((listURLS, i) =>
                <DisplayRow key={i} listURLS={listURLS} searchTerm={searchTerms[i]} />
            )}
        </div>
    );

}

export default Display;
