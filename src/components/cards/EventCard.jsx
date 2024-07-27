import moment from "moment";
import React from "react";
import { Chip } from "../../common";
import { Link } from "react-router-dom";
import { APP_URL } from "../../config";

const EventCard = ({ cardData }) => {
  /**--------------- FORMATTING DATE ----------------------*/
  const startDate = moment.unix(cardData?.date);
  const endDate = moment(startDate).add(cardData?.duration - 1, "days");

  const startDateFormatted = startDate.format("MMMM D");
  const endDateFormatted = endDate.format("D, YYYY");

  const dateRange = `${startDateFormatted}-${endDateFormatted}`;

  return (
    <Link to={APP_URL.RETREAT_DETAILS.replace(":id", cardData?.id)}>
      <div className="md:w-80 w-72 h-96 p-2 bg-secondary rounded-lg hover:shadow-lg cursor-pointer">
        <div className="w-full h-[55%]  rounded-xl overflow-hidden">
          <img
            src={cardData?.image}
            alt={cardData?.title}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="mt-2 mb-1 font-semibold text-lg truncate overflow-hidden">
          {cardData?.title}
        </h2>
        <p className="text-sm mb-1 truncate overflow-hidden">
          {cardData?.description}
        </p>
        <p>{`Date: ${dateRange}`}</p>
        <p>{`Location: ${cardData?.location}`}</p>
        <p>{`Price: $${cardData?.price}`}</p>
        <div className="flex gap-x-1 mt-1">
          {cardData?.tag?.map((item, index) => (
            <Chip key={index} name={item} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
