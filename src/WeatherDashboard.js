import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchData, setSearchData] = useState("New Delhi");
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const apiUrl = process.env.REACT_APP_OPEN_WEATHER_API_URL;

  const getCoordinates = async (city) => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const data = await response.json();
      if (data.length > 0) {
        getWeatherData(data[0].lat, data[0].lon);
      } else {
        alert("City not found!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setLoading(false);
    }
  };

  const getWeatherData = async (lat, lon) => {
    if (!lat || !lon) return;
    try {
      const response = await fetch(
        `${apiUrl}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoordinates(searchData);
  }, [searchData]);

  const getWeatherIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return "bi-brightness-high-fill";
      case "few clouds":
        return "bi-cloud-sun-fill";
      case "scattered clouds":
        return "bi-cloud-fill";
      case "broken clouds":
        return "bi-clouds-fill";
      case "rain":
        return "bi-cloud-rain-fill";
      case "thunderstorm":
        return "bi-cloud-lightning-rain-fill";
      case "snow":
        return "bi-snow";
      case "mist":
      case "fog":
        return "bi-cloud-fog2-fill";
      default:
        return "bi-cloud-fill"; // Default icon
    }
  };

  const handleSearchChange = (e) => setSearchData(e.target.value);
  const handleCardClick = (weather) => setSelectedWeather(weather);
  const handleClose = () => setSelectedWeather(null);

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "#fff",
        padding: "40px 0",
      }}
    >
      <h1 className="display-4 fw-bold text-center mb-4">
        🌤 Weather Dashboard
      </h1>
      <Form className="d-flex justify-content-center w-50 mb-4">
        <Form.Control
          type="text"
          placeholder="Enter city name..."
          className="p-2 rounded-pill text-center shadow"
          value={searchData}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        />
      </Form>

      {loading && <Spinner animation="border" variant="light" />}

      {!loading && weatherData && weatherData.city && (
        <>
          <h2 className="fw-semibold text-center mb-4">
            📍 {weatherData.city.name}, {weatherData.city.country}
          </h2>
          <Row className="g-4 justify-content-center">
            {weatherData.list.slice(0, 5).map((item, index) => (
              <Col md={4} key={index}>
                <Card
                  className="shadow-lg border-0 text-center p-4"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    color: "#fff",
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    cursor: "pointer",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <Card.Body>
                    <i
                      className={`bi bi-cloud-sun display-3 text-info mb-3`}
                    ></i>
                    <Card.Title className="fw-bold fs-4 mb-3">
                      {item.weather[0].main}
                    </Card.Title>
                    <h2 className="fw-bold mb-3">{item.main.temp}°C</h2>
                    <p className="text-light opacity-75 mb-3">
                      {item.weather[0].description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <p className="fw-semibold mb-0">
                        📅 {new Date(item.dt * 1000).toLocaleDateString()}
                      </p>
                      <p className="fw-semibold mb-0">
                        🕒{" "}
                        {new Date(item.dt * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {selectedWeather && (
        <Modal show={true} onHide={handleClose} centered>
          <Modal.Header
            closeButton
            style={{
              borderBottom: "none",
              backgroundColor: "#2a5298",
              color: "#fff",
            }}
          >
            <Modal.Title>
              <h2>
                {weatherData.city.name}, {weatherData.city.country}
              </h2>
              <p>
                {new Date(selectedWeather.dt * 1000).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ backgroundColor: "#1e3c72", color: "#fff" }}
            className="text-center"
          >
            <i
              className={`bi ${getWeatherIcon(
                selectedWeather.weather[0].main
              )} display-1 text-info`}
            ></i>
            <h1>{selectedWeather.main.temp}°C</h1>
            <p>{selectedWeather.weather[0].description}</p>
            <Row className="mt-4">
              <Col>
                <p>🌅 Sunrise: 7:00 AM</p>
                <p>🌇 Sunset: 7:20 PM</p>
              </Col>
              <Col>
                <p>💨 Wind: {selectedWeather.wind.speed} km/h</p>
                <p>💧 Humidity: {selectedWeather.main.humidity}%</p>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <p>🌡️ Min: {selectedWeather.main.temp_min}°C</p>
                <p>🌡️ Max: {selectedWeather.main.temp_max}°C</p>
              </Col>
              <Col>
                <p>📊 Pressure: {selectedWeather.main.pressure} mbar</p>
                <p>🧭 Direction: North-East</p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: "none", backgroundColor: "#2a5298" }}
          >
            <Button variant="light" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default WeatherDashboard;
