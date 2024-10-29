const axios = require("axios");

// Fetch historical weather data and format it as an array
exports.getWeatherData = async (req, res) => {
  try {
    const response = await axios.get(
      'https://archive-api.open-meteo.com/v1/archive',
      {
        params: {
          latitude: 40.7128,
          longitude: -74.0060,
          start_date: '2023-01-01',
          end_date: '2023-01-31',
          temperature_unit: 'celsius',
          daily: ['temperature_2m_max', 'temperature_2m_min'], // Specify daily data fields as an array
        },
      }
    );

    // Extract the data into an array of objects
    const weatherData = response.data.daily;
    const formattedData = weatherData.time.map((date, index) => ({
      date: date,
      maxTemperature: weatherData.temperature_2m_max[index],
      minTemperature: weatherData.temperature_2m_min[index],
    }));

    res.json(formattedData); // Send the array back to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
