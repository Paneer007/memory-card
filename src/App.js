import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Body from "./Components/GameBody";
function App() {
  return (
    <div className="flex flex-col p-0 m-0 justify-center items-center bg-gradient-to-r from-cyan-500 to-green-500 h-full w-full">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
