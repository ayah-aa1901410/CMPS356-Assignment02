
import {Button} from "@mui/material"
// import * as emoji from "emoji-api";
import { Component, useEffect, useState } from "react"
import { render } from "react-dom"
import { useMemo } from "react"
import { useTilesContext } from "../contexts/TilesContext"
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
// import emoji from 'react-easy-emoji'
// import * as emoji from "emoji-api";


export default function EmojiCard({ id, emo, handleChoice}){
    const [vari, setVari] = useState(false)
    const {choices, setChoices, matched, setMatched, rotations, setRotations} = useTilesContext()

    function handleClick(event){
        handleChoice(emo, event.target.id)
        setVari(!vari)
    }
    
    
    return(
        <Button key={id} id={`${id}`} onClick={handleClick} style={{margin: "20px", fontSize: "35px" ,maxHeight: "70px", maxWidth: "80px", alignContent: "center", backgroundColor: matched.includes(emo)??"grey"}} variant= {choices[0].id == id?"contained":"outlined"} disabled={matched.includes(emo)??"true"}>
            <Icon sx={{transform: `rotate(${rotations[id]}deg)`, border:"none", pointerEvents: "none", backgroundColor: "transparent", width: "80px", height: "70px", fontSize: "35px"}}>{emo}</Icon>
        </Button>
    )
    
}
