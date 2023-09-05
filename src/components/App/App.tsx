import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./App.css";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <NavigationBar />
    </div>
  );
};

export default App;
