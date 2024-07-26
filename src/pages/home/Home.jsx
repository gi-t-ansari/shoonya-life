import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getData } from "../../api/callApi";
import { CircularProgress } from "../../common";
import { EventCard } from "../../components";
import { Button } from "../../common";
import { API_URL, LOCATION_OPTIONS, TYPE_OPTIONS } from "../../config";

const Home = () => {
  const [eventData, setEventData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
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

  const handleTypeFilter = (e) => {
    e.preventDefault();
    const filteredData = data?.filter((item) =>
      item?.tag?.includes(e?.target?.value?.toLowerCase())
    );
    setEventData(filteredData);
  };

  const handleLocationFilter = (e) => {
    e.preventDefault();
    const filteredData = data?.filter(
      (item) =>
        item?.location?.toLowerCase() === e?.target?.value?.toLowerCase()
    );
    setEventData(filteredData);
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
        <div>
          <input type="date" placeholder="Filter by Date" />
          <select onChange={handleTypeFilter}>
            <option className="text-gray-400">Filter by Type</option>
            {TYPE_OPTIONS.map((item) => (
              <option
                key={item}
                value={item}
                className="uppercase cursor-pointer"
              >
                {item}
              </option>
            ))}
          </select>
          <select onChange={handleLocationFilter}>
            <option className="text-gray-400">Filter by Location</option>
            {LOCATION_OPTIONS.map((item) => (
              <option
                key={item}
                value={item}
                className="uppercase cursor-pointer"
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/**------------------- EVENT CARDS -------------------- */}
      <div className="flex flex-wrap lg:justify-between justify-center md:gap-4 gap-3">
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
