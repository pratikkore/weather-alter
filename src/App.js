import logo from "./logo.svg";
import "./App.css";
import WeatherDashboard from "./WeatherDashboard";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <center>
      {/* <h1>Weather App</h1> */}
      <Header />
      <WeatherDashboard />
      <Footer />
    </center>
  );
}

export default App;
