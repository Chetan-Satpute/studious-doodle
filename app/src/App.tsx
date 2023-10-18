import Canvas from './components/Canvas';
import ErrorSnackBar from './components/ErrorSnackBar';
import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row">
      <div className="h-2/5 w-full lg:h-full lg:w-2/3 flex flex-col">
        <Header />
        <Canvas />
      </div>
      <SideBar />
      <ErrorSnackBar />
    </div>
  );
}

export default App;
