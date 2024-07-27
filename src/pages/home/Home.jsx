import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getData } from "../../api/callApi";
import { CircularProgress } from "../../common";
import { EventCard } from "../../components";
import { Button } from "../../common";
import { API_URL, LOCATION_OPTIONS, TYPE_OPTIONS } from "../../config";

const Home = () => {
  const [eventData, setEventData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [endIndex, setEndIndex] = useState(4);

  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => getData(API_URL.MAIN),
    onSuccess: (data) => {
      setEventData(data);
    },
    onError: (error) => {
      alert("Error loading data", error);
    },
  });

  console.log("data", data);

  const handleTypeFilter = () => {
    if (type) {
      const filteredData = data?.filter((item) =>
        item?.tag?.includes(type.toLowerCase())
      );
      setEventData(filteredData);
    } else {
      setEventData(data);
    }
  };

  const handleLocationFilter = () => {
    if (location) {
      const filteredData = data?.filter(
        (item) => item?.location?.toLowerCase() === location.toLowerCase()
      );
      setEventData(filteredData);
    } else {
      setEventData(data);
    }
  };

  useEffect(() => {
    handleLocationFilter();
  }, [location]);

  useEffect(() => {
    handleTypeFilter();
  }, [type]);

  const handleClearFilter = () => {
    setType("");
    setLocation("");
  };

  /**--------- HANDLING PAGINATION ---------*/
  const handleNext = () => {
    setStartIndex((prev) => prev + 4);
    setEndIndex((prev) => prev + 4);
  };

  const handlePrevious = () => {
    setStartIndex((prev) => prev - 4);
    setEndIndex((prev) => prev - 4);
  };

  return (
    <div>
      {/**------------------- FILTER & SEARCH ----------------- */}
      <div>
        <div className="flex md:flex-row flex-col md:gap-x-2 gap-y-2 md:items-center mb-4">
          <input type="date" placeholder="Filter by Date" />
          <select onChange={(e) => setType(e.target.value)} value={type}>
            <option value={""} className="text-gray-400">
              Filter by Type
            </option>
            {TYPE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            <option value={""} className="text-gray-400">
              Filter by Location
            </option>
            {LOCATION_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Button onClick={handleClearFilter}>Clear Filter</Button>
        </div>
        <div></div>
      </div>

      {/**------------------- EVENT CARDS -------------------- */}
      <div className="flex flex-wrap justify-evenly  gap-4">
        {eventData ? (
          eventData
            ?.slice(startIndex, endIndex)
            .map((item) => <EventCard key={item?.id} cardData={item} />)
        ) : (
          <CircularProgress />
        )}
      </div>

      {/**-------------------- PAGINATION ---------------------*/}
      <div className="w-full my-3 flex justify-center gap-x-2">
        {eventData && (
          <>
            <Button disabled={startIndex <= 0} onClick={handlePrevious}>
              Previous
            </Button>
            <Button
              disabled={endIndex >= eventData?.length}
              onClick={handleNext}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
