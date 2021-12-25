import React from "react";
import { useState } from 'react';


function NavBar() {
    var [filterOption, setData]= useState("last");
    
 function filterHandler (event) {
        setData(event.target.value)
        //console.log(event.target.value)
    }
    

    return(
        <div id="navbar">
            <select name={filterOption} onChange={filterHandler}>
                <option value="last">Last 24h</option>
                <option value="first">asdasdasd</option>
            </select>
            </div>
    )

}

export default NavBar