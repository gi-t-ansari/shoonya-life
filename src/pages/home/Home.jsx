import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getData } from "../../api/callApi";
import { CircularProgress } from "../../common";
import { EventCard } from "../../components";
import { Button } from "../../common";

const Home = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      getData("https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"),
  });

  console.log("data", data);

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
      <div></div>
      {/**------------------- EVENT CARDS -------------------- */}
      <div className="flex flex-wrap lg:justify-between justify-center md:gap-4 gap-3">
        {data ? (
          data
            ?.slice(startIndex, endIndex)
            .map((item) => (
              <EventCard
                key={item?.id}
                title={item?.title}
                image={item?.image}
                description={item?.description}
                date={item?.date}
                duration={item?.duration}
                location={item?.location}
                price={item?.price}
              />
            ))
        ) : (
          <CircularProgress />
        )}
      </div>
      {/**-------------------- PAGINATION ---------------------*/}
      <div className="w-full my-3 flex justify-center gap-x-2">
        {data && (
          <>
            <Button disabled={startIndex <= 0} onClick={handlePrevious}>
              Previous
            </Button>
            <Button disabled={endIndex >= data?.length} onClick={handleNext}>
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
