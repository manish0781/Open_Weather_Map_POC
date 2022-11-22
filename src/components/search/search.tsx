/* Search component to get the searched location details 
such as lat long & name of the location */

import { useEffect, useState } from "react";
import { Location_Info } from "./types.d";
import "./search.css";
import { callService } from "../../utils/utils";

const Search = (props: {
  selectedLocation: (selectedLoc: Location_Info) => void;
}) => {
  //state variable to store searched locations
  const [searchResults, setSearchResult] = useState<Location_Info[]>();
  //state variable to search location value
  const [searchString, setSearchString] = useState("");
  //state variable to maintain no data error flag
  const [isError, setIsError] = useState(false);
  //state variable to maintain search dropdown visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  /* Handling search dropdown visibility depends upon the search results */
  useEffect(() => {
    if (searchResults) {
      setIsPopupVisible(true);
    } else {
      setIsPopupVisible(false);
    }
  }, [searchResults]);

  /* Method to set the current location and pass it to parent component. */
  const selectedLocationValue = (location: Location_Info) => {
    if (location) {
      props.selectedLocation(location);
      setSearchString("");
    }
  };

  /* Method to get locations based on search string */
  const getLocations = (searchString: string) => {
    if (searchString.trim() !== "") {
      callService("/data/2.5/find?q=" + searchString.trim()).then(
        (response) => {
          if (response?.list && response.list.length > 0) {
            setSearchResult(
              (response.list as any[]).map((location) => {
                return {
                  locationName: location?.name + "-" + location?.sys?.country,
                  lat: location?.coord?.lat,
                  lon: location?.coord?.lon,
                };
              })
            );
            setIsError(false);
          } else {
            setSearchResult(undefined);
            setIsError(true);
          }
        }
      );
    }
  };

  return (
    <>
      <div className="container-div">
        <div className="dropdown">
          <input
            type="text"
            onChange={(e) => {
              setSearchString(e.target.value);
              setSearchResult([]);
              setIsError(false);
            }}
            placeholder={"Search location"}
            value={searchString}
            className="dropbtn"
          />
          {isPopupVisible && (
            <div className="dropdown-content">
              {searchResults?.map((sresult: Location_Info, index) => (
                <a
                  key={index}
                  href="/#"
                  onClick={() => {
                    selectedLocationValue(sresult);
                    setIsPopupVisible(false);
                  }}
                >
                  <strong>{sresult.locationName}</strong>
                  <br />
                  <small>
                    lat:{sresult.lat + " "}long:{sresult.lon}
                  </small>
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            type="button"
            className="search-button"
            onClick={() => {
              getLocations(searchString);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button
            type="button"
            className="search-button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Clear
          </button>
        </div>
      </div>
      {isError && <div className="no-data">No Data found</div>}
    </>
  );
};
export default Search;
