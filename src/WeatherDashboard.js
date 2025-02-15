import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchData, setSearchData] = useState("New Delhi");
  const [selectedWeather, setSelectedWeather] = useState(null);
  const apiKey = "49e1c60be364c11bb302518ab761f9ec";

  const getCoordinates = async (city) => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const data = await response.json();

      if (data.length > 0) {
        getWeatherData(data[0].lat, data[0].lon);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const getWeatherData = async (lat, lon) => {
    if (!lat || !lon) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    getCoordinates(searchData);
  }, [searchData]);

  const handleSearchChange = (e) => setSearchData(e.target.value);
  const handleCardClick = (weather) => setSelectedWeather(weather);
  const handleClose = () => setSelectedWeather(null);

  return (
    <Container fluid className="bg-primary text-white min-vh-100 py-5">
      <Container className="text-center">
        <h1 className="display-4 fw-bold">🌤 Weather Dashboard</h1>

        {/* Search Bar */}
        <Form className="d-flex justify-content-center my-4">
          <Form.Control
            type="text"
            placeholder="Enter city name..."
            className="w-50 p-2 rounded-pill text-center shadow-sm"
            value={searchData}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
        </Form>

        {weatherData && weatherData.city && (
          <>
            <h2 className="fw-semibold mb-4">
              📍 {weatherData.city.name}, {weatherData.city.country}
            </h2>

            {/* Weather Cards */}
            <Row className="g-4 justify-content-center">
              {weatherData.list.slice(0, 5).map((item, index) => (
                <Col md={4} key={index}>
                  <Card
                    className="bg-light text-dark shadow-lg border-0 rounded-4 p-3 text-center"
                    onClick={() => handleCardClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Body>
                      <i className="bi bi-cloud-haze-fill display-3 text-info"></i>
                      <Card.Title className="fw-bold">
                        {item.weather[0].main}
                      </Card.Title>
                      <h2 className="fw-bold">{item.main.temp}°C</h2>
                      <p className="text-secondary">
                        {item.weather[0].description}
                      </p>
                      <hr />
                      <p className="text-muted">
                        📅 {new Date(item.dt * 1000).toLocaleDateString()} | 🕒{" "}
                        {new Date(item.dt * 1000).toLocaleTimeString()}
                      </p>
                      <p>
                        🌡 Min: {item.main.temp_min}°C | Max:{" "}
                        {item.main.temp_max}°C
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Modal for Detailed View */}
        {/* Modal for Detailed View */}
        {selectedWeather && (
          <Modal show={true} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="fw-bold text-center w-100">
                {weatherData.city.name}, {weatherData.city.country}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="text-center text-white rounded-4 p-4"
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
              }}
            >
              <i className="bi bi-cloud-haze-fill display-1 mb-3 text-light"></i>
              <h2 className="fw-bold">{selectedWeather.weather[0].main}</h2>
              <h1 className="fw-bold">{selectedWeather.main.temp}°C</h1>
              <p className="text-light">
                {selectedWeather.weather[0].description}
              </p>

              <hr className="text-light" />

              <Row className="text-center text-light">
                <Col xs={6} className="mb-3">
                  <i className="bi bi-calendar-date-fill text-warning"></i>
                  <p>
                    {new Date(selectedWeather.dt * 1000).toLocaleDateString()}
                  </p>
                </Col>
                <Col xs={6} className="mb-3">
                  <i className="bi bi-clock text-info"></i>
                  <p>
                    {new Date(selectedWeather.dt * 1000).toLocaleTimeString()}
                  </p>
                </Col>
                <Col xs={6} className="mb-3">
                  <i className="bi bi-thermometer-half text-danger"></i>
                  <p>
                    {selectedWeather.main.temp_min}°C /{" "}
                    {selectedWeather.main.temp_max}°C
                  </p>
                </Col>
                <Col xs={6} className="mb-3">
                  <i className="bi bi-wind text-success"></i>
                  <p>Wind: {selectedWeather.wind.speed} km/h</p>
                </Col>
                <Col xs={6} className="mb-3">
                  <i className="bi bi-droplet text-primary"></i>
                  <p>Humidity: {selectedWeather.main.humidity}%</p>
                </Col>
                <Col xs={6} className="mb-3">
                  <i className="bi bi-speedometer text-light"></i>
                  <p>Pressure: {selectedWeather.main.pressure} mbar</p>
                </Col>
                <Col xs={6} className="mb-3">
                  <i className="bi bi-brightness-high text-warning"></i>
                  <p>
                    Sunrise:{" "}
                    {new Date(
                      weatherData.city.sunrise * 1000
                    ).toLocaleTimeString()}
                  </p>
                </Col>
                <Col xs={6}>
                  <i className="bi bi-moon-stars text-light"></i>
                  <p>
                    Sunset:{" "}
                    {new Date(
                      weatherData.city.sunset * 1000
                    ).toLocaleTimeString()}
                  </p>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="border-0 d-flex justify-content-center">
              <Button
                variant="light"
                className="rounded-pill px-4 py-2"
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </Container>
  );
};

export default WeatherDashboard;
