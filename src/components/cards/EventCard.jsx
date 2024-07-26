import moment from "moment";
import React from "react";

const EventCard = ({
  title,
  image,
  description,
  date,
  duration,
  location,
  price,
}) => {
  /**--------------- FORMATTING DATE ----------------------*/
  const startDate = moment.unix(date);
  const endDate = moment(startDate).add(duration, "days");

  const startDateFormatted = startDate.format("MMMM D");
  const endDateFormatted = endDate.format("D, YYYY");

  const dateRange = `${startDateFormatted}-${endDateFormatted}`;

  return (
    <div className="w-80 h-96 p-2 bg-secondary rounded-md shadow-md">
      <div className="w-full h-[55%]  rounded-md overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <h2 className="my-2 font-semibold text-lg">{title}</h2>
      <p className="text-sm mb-2">{description}</p>
      <p>{`Date: ${dateRange}`}</p>
      <p>{`Location: ${location}`}</p>
      <p>{`Price: $${price}`}</p>
    </div>
  );
};

export default EventCard;
