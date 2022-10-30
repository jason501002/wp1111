import React, { useState } from 'react';

const StartMenu = ({setHasStarted}) => {
    
    return(
        <div>
            <button onClick={()=>setHasStarted(true)}> start game </button>
        </div>
    )
}
export default StartMenu;
