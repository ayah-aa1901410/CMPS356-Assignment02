import * as emoji from "emoji-api";
import randomUnicodeEmoji, { random } from "random-unicode-emoji";
import {Button, Grid} from "@mui/material"
// import emoji from 'react-easy-emoji'
import { useState } from "react";
import {useRouter} from "next/router"
import { useEffect } from "react"
import EmojiCard from "../components/EmojiCard";
import {Stack} from "@mui/material";
import { useTilesContext } from "../contexts/TilesContext";

export default function TilesGame(){
    // const em = emoji.unicodeToEmoji("1F600")
    const router = useRouter()
    const path = router.asPath
    const {choices, setChoices, matched, setMatched, rotations, setRotations} = useTilesContext()
    const [enableNextLevel, setEnableNextLevel] = useState(false)
    const [emojiList, setEmojisList] = useState([])
    let {level} = router.query
    const nextLevel = parseInt(level)+1

    let randomEmoji = []
    let rots = []

    useEffect(() =>{
        let data = JSON.parse(localStorage.getItem("storedData"))

        if(data !== null){

            if(level === undefined){
                
            }
            else if(data.level === level){
               
                if(data.matched.length === parseInt(level)){
                    setRotations(data.rotations)
                    setMatched(data.matched)
                    setEnableNextLevel(true)
                }
                randomEmoji = data.tiles
                rots = data.rotations
                localStorage.setItem("storedData", JSON.stringify(data))
                setRotations(data.rotations)
                setEmojisList(randomEmoji)
                setMatched(data.matched)
            }else{
                randomEmoji = randomUnicodeEmoji.random({count: level})
                randomEmoji = [...randomEmoji, ...randomEmoji].sort(() => Math.random() - 0.5)
                for (let i = 0; i < (level*2); i++) {
                    rots.push((Math.random() * (359 - 0) + 0).toFixed(2))
                }
                data = {level: level, matched: [], tiles: randomEmoji, rotations: rots}     
                localStorage.setItem("storedData", JSON.stringify(data))
                setRotations(rots)
                setEmojisList(randomEmoji)
                setMatched(data.matched)
            }
        }else{
            randomEmoji = randomUnicodeEmoji.random({count: level})
            randomEmoji = [...randomEmoji, ...randomEmoji].sort(() => Math.random() - 0.5)
            for (let i = 0; i < (level*2); i++) {
                rots.push((Math.random() * (359 - 0) + 0).toFixed(2))
            }
            data = {level: level, matched: [], tiles: randomEmoji, rotations: rots}    
            localStorage.setItem("storedData", JSON.stringify(data))
            setRotations(rots)
            setEmojisList(randomEmoji)
            setMatched(data.matched)
        }
    },[level])


    useEffect(()=>{
        if(path === "/tiles"){
            router.push('/tiles?level=1')
        }
    },[path])

    function handleChoice(emo, id){
        if(choices[0].emo != null){
            if(choices[0].id !== id){
                let updated = choices
                updated[1] = {emo, id}
                setChoices(updated)
                if(choices[0] && choices[1]){
                    if(choices[0].emo === choices[1].emo){
                        let data = JSON.parse(localStorage.getItem("storedData"))
                        data.matched.push(choices[0].emo)
                        localStorage.setItem("storedData",JSON.stringify(data))
                        setMatched(data.matched)
                        if(data.matched.length === parseInt(level)){
                            setEnableNextLevel(true)
                        }
                        let updated = choices
                        updated[0] = {emo:null, id:null}
                        updated[1] = {emo:null, id:null}
                        setChoices(updated)
                    }else{ 
                        let updated = [{emo:null, id:null}, {emo:null, id:null}]
                        setChoices(updated)
                    }
                }
                
            }else{
                let updated = choices
                updated[0] = {emo:null, id:null}
                setChoices(updated)
            }
        }else{
            let updated = choices
            updated[0] = {emo, id}
            setChoices(updated)
        }

        
    }

    function moveNextLevel(){
        router.push(`/tiles?level=${nextLevel}`)
        setMatched([])
        setRotations([])
        setEnableNextLevel(false)
    }

    return(
        <>
            <div sx={{padding: "12px"}}>
                <Stack component="nav" direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                        {!enableNextLevel && <h2>Level {level}</h2>}
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        {enableNextLevel && 
                        <Button onClick={moveNextLevel}>
                            <h2>Level {nextLevel}</h2>
                        </Button>}
                    </Stack>
                </Stack>
            </div>
            <div>
                <Grid container  spacing={{ xs: 2 }}>
                    {emojiList.map((emo, index) => (
                        <Grid item key={index} xs={2} md={1}>
                            <EmojiCard key={index} id={index} emo={emo} rots={rots[index]} handleChoice={handleChoice} />
                        </Grid>
                    ))
                    }
                </Grid>
            </div>
        </>
    )
}