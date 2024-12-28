const apiKey = '8b2527260a14409ab0f75036242412'; // Your Weather API key
const cityInput = document.getElementById('cityInput'); // Input field for city
const weatherInfo = document.getElementById('weatherInfo'); // Container for weather info
const invalidInput = document.getElementById('invalidInput'); // Invalid input message
const container = document.querySelector('.container'); // Main container
const dateElement = document.getElementById('date'); // Date element

// Function to get and display the current date and time
function displayCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    dateElement.innerText = now.toLocaleDateString('en-US', options); // Format date
}

// Call the function to display the current date and time when the page loads
displayCurrentDate();

// Event listener for input on the input field
cityInput.addEventListener('input', function() {
    // Capitalize the first letter of the input
    const value = cityInput.value;
    if (value.length > 0) {
        cityInput.value = value.charAt(0).toUpperCase() + value.slice(1);
    }
});

// Event listener for keypress on the input field
cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { // Check if 'Enter' key is pressed
        const city = cityInput.value; // Get the city name from input
        if (city) {
            fetchWeather(city); // Fetch weather data for the city
        }
    }
});

// Function to fetch weather data from the API
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await response.json(); // Parse the JSON response

        if (data && data.location) {
            displayWeather(data); // Display the weather data
        } else {
            showInvalidInput(); // Show invalid input message
        }
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log any errors
        showInvalidInput(); // Show invalid input message
    }
}

// Function to display the weather data
function displayWeather(data) {
    // Get location details
    const location = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
    // Get current weather details
    const temperature = `${data.current.temp_c}°C<br>${data.current.condition.text}`;
    const wind = `Wind: ${data.current.wind_mph} mph`;
    const humidity = `Humidity: ${data.current.humidity}%`;

    // Update the HTML elements with weather data
    document.getElementById('location').innerText = location; 
    document.getElementById('temperature').innerHTML = temperature; 
    document.getElementById('wind').innerText = wind; 
    document.getElementById('humidity').innerText = humidity; 

    // Show the weather information
    weatherInfo.style.display = 'block'; 
    container.style.maxHeight = '600px'; 
}