import moment from "moment";
import React from "react";
import { Chip } from "../../common";

const EventCard = ({ cardData }) => {
  /**--------------- FORMATTING DATE ----------------------*/
  const startDate = moment.unix(cardData?.date);
  const endDate = moment(startDate).add(cardData?.duration, "days");

  const startDateFormatted = startDate.format("MMMM D");
  const endDateFormatted = endDate.format("D, YYYY");

  const dateRange = `${startDateFormatted}-${endDateFormatted}`;

  return (
    <div className="w-80 h-96 p-2 bg-secondary rounded-md shadow-md">
      <div className="w-full h-[55%]  rounded-md overflow-hidden">
        <img
          src={cardData?.image}
          alt={cardData?.title}
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="my-2 font-semibold text-lg">{cardData?.title}</h2>
      <p className="text-sm mb-1">{cardData?.description}</p>
      <p>{`Date: ${dateRange}`}</p>
      <p>{`Location: ${cardData?.location}`}</p>
      <p>{`Price: $${cardData?.price}`}</p>
      <div className="flex gap-x-1">
        {cardData?.tag?.map((item, index) => (
          <Chip key={index} name={item} />
        ))}
      </div>
    </div>
  );
};

export default EventCard;
