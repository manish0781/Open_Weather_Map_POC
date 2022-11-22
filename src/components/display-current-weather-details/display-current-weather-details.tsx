/* Main component using Search component and Weather detail component. */
import { useState } from "react";
import { getApiToken } from "../../utils/utils";
import Search from "../search";
import WeatherDetails from "../weather-details";
import "./display-current-weather-details.css";
export const DisplayCurrentWeatherDetails = () => {
  /* state variable to store location selected by user */
  const [locationSelected, setLocationSelected] = useState<
    | {
        locationName: string;
        lat: string;
        lon: string;
      }
    | undefined
  >();

  /* Method to set selected location's detail selected by user */
  const selectedLocation = (
    location:
      | {
          locationName: string;
          lat: string;
          lon: string;
        }
      | undefined
  ) => {
    setLocationSelected(location);
  };

  return (
    <div className="main-container_div">
      {/* show error message if API token is not present in config.json file */}
      {getApiToken().trim() === "" && (
        <h2 className="no-api_key">
          Error: Api Key is missing in config file.Please place api key in
          config.json file.
        </h2>
      )}
      <div className="weather-header">
        Current weather details for searched location
      </div>
      <Search selectedLocation={selectedLocation} />
      {locationSelected && (
        <WeatherDetails selectedLocation={locationSelected} />
      )}
    </div>
  );
};
