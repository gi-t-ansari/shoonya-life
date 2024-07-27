import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../api/callApi";
import { API_URL } from "../../config";
import { Chip } from "../../common";
import moment from "moment";

const RetreatDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const retreatId = location?.pathname?.slice(1);

  const { data } = useQuery({
    queryKey: ["single-retreat"],
    queryFn: () => getData(`${API_URL.MAIN}/${retreatId}`),
  });

  // console.log("single data", data);

  const startDate = moment.unix(data?.date);
  const endDate = moment(startDate).add(data?.duration - 1, "days");

  const startDateFormatted = startDate.format("MMMM D");
  const endDateFormatted = endDate.format("D, YYYY");

  const dateRange = `${startDateFormatted}-${endDateFormatted}`;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    data && (
      <div>
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={handleGoBack}
        >
          <FaArrowLeftLong />
          <span className="hidden md:inline">Back</span>
        </div>

        <div className="w-full md:h-[70vh] flex md:flex-row flex-col justify-between  mb-12 md:mb-6 mt-4 md:mt-6 p-4 bg-secondary rounded-lg   shadow-md">
          <div className="md:basis-[49%] md:h-full basis-[100%]">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={data?.image}
              alt={data?.title}
            />
          </div>
          <div className="md:basis-[49%] text-wrap basis-[100%]">
            <h2 className="mb-3 md:mt-0 mt-3 font-semibold lg:text-3xl md:text-2xl text-xl ">
              {data?.title}
            </h2>
            <p className=" lg:text-lg mb-2 ">{data?.description}</p>
            <p className="lg:text-xl md:text-lg mb-1">{`Date: ${dateRange}`}</p>
            <p className="lg:text-xl md:text-lg mb-1">{`Location: ${data?.location}`}</p>
            <p className="lg:text-xl md:text-lg mb-1">{`Price: $${data?.price}`}</p>
            <div className="flex gap-x-1 md:mt-2 mt-1">
              {data?.tag?.map((item, index) => (
                <Chip key={index} name={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RetreatDetails;
