import { useEffect, useState } from "react"
import axios from "axios"
const ImageCard=({imageObject,userInput,setUserInput,setRound,round, userScore,setUserScore,setGameover,setGameWin})=>{
    const checkIfImageThere=()=>{
        if(userInput.includes(imageObject)){
            setGameover(true)
        }else{
            if(userScore+1===30){
                setGameWin(true)
                setGameover(true)
            }else if(userScore+1===round*6){
                console.log('here we go again')
                setUserScore(0)
                setRound(round+1)
                setUserInput([])
            }else{
                setUserInput(userInput.concat(imageObject))
                setUserScore(userScore+1)
            }   
        }
    }
    return(
        <div>
            <img className="h-60 w-60 m-1 bg-kombu-green p-1 rounded"  src={imageObject.urls.small} alt="failed" onClick={checkIfImageThere} setGameOver={setGameover}/>
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
    const [gameWin,setGameWin]=useState(false)
    console.log(userScore)
    const startAgain=()=>{
        setRound(1)
        setUserInput([])
        setGameover(false)
        setUserScore(0)
    }
    useEffect(()=>{
        document.body.style.backgroundColor='#fefae0ff'
    },[])
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
        setTimeout(fetchData(),10000)
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
            <div className="flex flex-col bg-earth-yellow m-4 p-4 rounded text-lg font-quicksand">
                {gameWin===true?<p>Congratulations you won the game</p>:null}
                <div>
                    <p>Your Score</p>
                    <p>Round: {round}</p>
                    <p>Points: {userScore}</p>
                </div>

                <h1>Game Over</h1>
                <button onClick={startAgain} className="rounded-full bg-mintGreen hover:bg-forestGreen p-1 text-sm m-1" >New Game</button>
            </div>
        )
    }
    return(
        
        <div className="w-full flex flex-col grow basis-2/3 justify-between font-quicksand">
            <div className="m-2 p-2 bg-earth-yellow rounded text-cornsilk flex flex-row justify-between">
                <div className="">
                    <p>Round-{round}</p>
                    <p>Userscore - {userScore}</p>
                </div>
                <div>
                    <h2 className=" text-zinc-600">Rules</h2>
                    <ul>
                        <li>Select a card and get points</li>
                        <li>Make sure you don't click on any card more than once!</li>
                        <li>Game has 5 rounds to win</li>
                    </ul>
                </div>
                
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center" >
                {listOfImages.length===0?
                <button type='button' xmlns="http://www.w3.org/2000/svg" className=" bg-liver-dogs flex flex-row p-2 rounded">
                    <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>Wait...</button>
                    :listOfImages.map(x=><ImageCard key ={x.id}imageObject={x} userInput={userInput} setUserInput={setUserInput} setUserScore={setUserScore} userScore={userScore} setRound={setRound} round={round} setGameover={setGameover} setGameWin={setGameWin}/>)} 
            </div>
            <br/>
        </div>
    )
}
export default Body