import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Body from "./Components/GameBody";
function App() {
  return (
    <div className="h-full w-full left-0 absolute flex flex-col p-0 m-0 items-center bg-cornsilk bg-cover ">
      <Header/>
      <Body />
      <Footer/>
    </div>
  );
}

export default App;
