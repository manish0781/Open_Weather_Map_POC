/* Component to display weather information for the location 
selected by the user based on lat long value */

import "./weather-details.css";
import { useEffect, useState } from "react";
import { CurrentWeatherDetails } from "./types.d";
import { callService } from "../../utils/utils";

export const WeatherDetails = (props: {
  selectedLocation:
    | { locationName: string; lat: string; lon: string }
    | undefined;
}) => {
  /* state variable to store the weathers information of location selected by user */
  const [weatherDetail, setWeatherDetail] = useState<CurrentWeatherDetails>();

  /* Getting location's weather information based on lat long */
  useEffect(() => {
    const reqUrl =
      "/data/2.5/weather?lat=" +
      props.selectedLocation?.lat +
      "&lon=" +
      props.selectedLocation?.lon +
      "&units=metric";
    callService(reqUrl).then((respnse) => {
      setWeatherDetail({
        date: respnse?.dt ? new Date(respnse?.dt).toString() : "",
        temprature: respnse?.main?.temp
          ? Math.round(Number(respnse?.main?.temp)).toString()
          : "",
        feelsLike: respnse?.main?.feels_like
          ? Math.round(Number(respnse?.main?.feels_like)).toString()
          : "",
        humidity: respnse?.main?.humidity,
        dew_point: respnse?.current?.dew_point,
        visibility: respnse?.visibility
          ? (Number(respnse?.visibility) / 1000).toString()
          : "",
        lat: respnse?.coord?.lat,
        long: respnse?.coord?.lon,
        country: respnse?.coord?.country,
        name: props.selectedLocation?.locationName
          ? props.selectedLocation.locationName
          : "",
        weatherCondition: respnse?.weather[0]?.description,
        windSpeed: respnse?.wind?.speed
          ? Number(respnse?.wind?.speed).toFixed(1)
          : "",
      });
    });
  }, [props.selectedLocation]);

  return (
    <>
      {weatherDetail && (
        <fieldset>
          <div className="weather-detail">
            <div>
              <span>
                <label className="label_info">Location:</label>
                <label className="label_value">{weatherDetail?.name}</label>
              </span>
              <span>
                <label className="label_info">Latitude:</label>
                <label className="label_value">{weatherDetail?.lat}</label>
              </span>
              <span>
                <label className="label_info">Longitude:</label>
                <label className="label_value">{weatherDetail?.long}</label>
              </span>
              <span>
                <label className="label_info">Wind speed:</label>
                <label className="label_value">
                  {weatherDetail?.windSpeed + " m/s"}
                </label>
              </span>
            </div>
            <div>
              <span>
                <label className="label_info">Visibility:</label>
                <label className="label_value">
                  {weatherDetail?.visibility + " km"}
                </label>
              </span>
              <span>
                <label className="label_info">Humidity:</label>
                <label className="label_value">
                  {weatherDetail?.humidity + "%"}
                </label>
              </span>
              <span>
                <label className="label_info">Feels Like:</label>
                <label className="label_value">
                  {weatherDetail?.feelsLike + "°C"}
                </label>
              </span>
              <span>
                <label className="label_info">Weather Condition:</label>
                <label className="label_value">
                  {weatherDetail?.weatherCondition}
                </label>
              </span>
              <span>
                <label className="label_info">Temperature:</label>
                <label className="label_value">
                  {weatherDetail?.temprature + "°C"}
                </label>
              </span>
            </div>
          </div>
        </fieldset>
      )}
    </>
  );
};
