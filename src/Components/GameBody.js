import { useEffect, useState } from "react"
import axios from "axios"
const ImageCard=({imageObject,userInput,setUserInput,setRound,round, userScore,setUserScore,setGameover})=>{
    const checkIfImageThere=()=>{
        if(userInput.includes(imageObject)){
            setGameover(true)
        }else{
            if(userScore+1===round*6){
                setUserScore(0)
                setRound(round+1)
                setUserInput([])
            }
            setUserInput(userInput.concat(imageObject))
            setUserScore(userScore+1)
        }
    }
    return(
        <div>
            <img className="h-36 w-36 m-1"  src={imageObject.urls.small} alt="failed" onClick={checkIfImageThere} setGameOver={setGameover}/>
        </div>
    )
}
function shuffleArray(inputArr) {
    let array=inputArr
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}
const Body=()=>{
    const [listOfImages,setListOfImages] = useState([])
    const [round,setRound]=useState(1)
    const [userInput,setUserInput]=useState([])
    const [userScore,setUserScore]=useState(0)
    const [gameOver,setGameover]=useState(false)
    const startAgain=()=>{
        setUserScore(0)
        setRound(1)
        setUserInput([])
        setGameover(false)
    }
    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get('https://api.unsplash.com/photos/random/?client_id=bWWo06tmlYhGZELn-inWw1YefWyixz5GxiEhznWMz2E&count=30')
            let tempArr= response.data
            tempArr=shuffleArray(tempArr)
            let finalArr=[]
            try{
                finalArr=tempArr.splice(0,round*6)
            }catch{
                console.log('oopsie')
            }
            setListOfImages(finalArr)
        }
        fetchData()
    },[round])
    useEffect(()=>{
        let tempArr = listOfImages
        tempArr= shuffleArray(tempArr)
        setListOfImages([...tempArr])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userInput])
    console.log('rendered',round,listOfImages)
    if(gameOver===true){
        return(
            <div>
                <h1>Game Over</h1>
                <button onClick={startAgain}>New Game</button>
            </div>
        )
    }
    return(
        
        <div className="w-full flex flex-col">
            <p className="">Round-{round}</p>
            <p>Userscore - {userScore}</p>
            <div className="flex flex-row flex-wrap items-center justify-center" >
                {listOfImages.length===0?<p>Wait...</p>:listOfImages.map(x=><ImageCard key ={x.id}imageObject={x} userInput={userInput} setUserInput={setUserInput} setUserScore={setUserScore} userScore={userScore} setRound={setRound} round={round} setGameover={setGameover}/>)} 
            </div>
            <br/>
        </div>
    )
}
export default Body