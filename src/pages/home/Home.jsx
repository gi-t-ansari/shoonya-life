import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getData } from "../../api/callApi";
import { CircularProgress } from "../../common";
import { EventCard } from "../../components";
import { Button } from "../../common";
import { API_URL, LOCATION_OPTIONS, TYPE_OPTIONS } from "../../config";
import moment from "moment";

const Home = () => {
  const [eventData, setEventData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [endIndex, setEndIndex] = useState(4);

  /**------------ FETCHING DATA ---------------*/
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

  // console.log("data", data);

  /**----------------- HANDLING SEARCH AND FILTER -------------------*/
  const handleFilterAndSearch = () => {
    if (selectedType) {
      const filteredData = data?.filter((item) =>
        item?.tag?.includes(selectedType?.toLowerCase())
      );
      setEventData(filteredData);
      return;
    }

    if (selectedLocation) {
      const filteredData = data?.filter(
        (item) =>
          item?.location?.toLowerCase() === selectedLocation?.toLowerCase()
      );
      setEventData(filteredData);
      return;
    }

    if (searchTerm) {
      const filteredData = data?.filter(
        (item) =>
          item?.title?.toLowerCase().includes(searchTerm) ||
          item?.description?.toLowerCase().includes(searchTerm) ||
          item?.location?.toLowerCase().includes(searchTerm) ||
          item?.tag?.includes(searchTerm)
      );
      setEventData(filteredData);
      return;
    }

    if (selectedDate) {
      const filteredData = data?.filter((item) => {
        const startDate = moment.unix(item?.date).format("YYYY-MM-DD");
        const endDate = moment(startDate).add(item?.duration - 1, "days");
        return moment(selectedDate).isBetween(startDate, endDate);
      });
      setEventData(filteredData);
      return;
    }

    setEventData(data);
  };

  useEffect(() => {
    handleFilterAndSearch();
  }, [selectedType, selectedLocation, searchTerm, selectedDate]);

  /**--------- HANDLING CLEAR FILTER ---------------*/
  const handleClearFilter = () => {
    setSelectedType("");
    setSelectedLocation("");
    setSelectedDate("");
    setSearchTerm("");
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
    eventData && (
      <div>
        {/**------------------- FILTER & SEARCH ----------------- */}
        <div className="flex lg:flex-row flex-col justify-between items-center ">
          <div className="md:w-fit w-full flex md:flex-row flex-col md:gap-x-3 gap-y-2 md:items-center md:mb-4 mb-2 ">
            <div>
              <label htmlFor="dateFilter" className="mr-1">
                Filter by Date:
              </label>
              <input
                id="dateFilter"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="md:w-fit w-full px-2 py-1 border border-primary rounded-md  md:bg-primary  md:text-white placeholder:text-gray-400"
              />
            </div>

            <select
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
              className=" md:w-fit w-full  px-2 py-1.5 border border-primary rounded-md  md:bg-primary  md:text-white "
            >
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
              onChange={(e) => setSelectedLocation(e.target.value)}
              value={selectedLocation}
              className="md:w-fit w-full px-2 py-1.5 border border-primary rounded-md md:bg-primary md:text-white  "
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
          </div>
          <div className="md:w-fit w-full flex md:flex-row flex-col md:gap-x-2 gap-y-2 md:items-center mb-4">
            <input
              className="w-full px-2 py-1.5 border border-primary focus:border-primary rounded-md  md:w-[300px] shadow-md"
              type="text"
              placeholder="Search retreats by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              onClick={handleClearFilter}
              disabled={
                !selectedDate &&
                !selectedType &&
                !selectedLocation &&
                !searchTerm
              }
              color={"red"}
            >
              Clear Filter
            </Button>
          </div>
        </div>

        {/**------------------- EVENT CARDS -------------------- */}
        <div className="flex flex-wrap justify-evenly  gap-4 md:my-4 mb-2">
          {eventData?.slice(startIndex, endIndex).map((item) => (
            <EventCard key={item?.id} cardData={item} />
          ))}
        </div>

        {/**------------------- SHOWING NOT FOUND TEXT IF NO DATA FOUND AFTER FILTER ------------------ */}
        <div className="w-full text-center">
          {(selectedDate || selectedType || selectedLocation || searchTerm) &&
            eventData?.length === 0 && (
              <h1 className="text-lg font-semibold">No Retreats Found</h1>
            )}
        </div>

        {/**-------------------- PAGINATION ---------------------*/}
        <div className="w-full md:mt-8 mb-12 mb flex justify-center gap-x-2">
          {eventData?.length > 4 && (
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
    )
  );
};

export default Home;
