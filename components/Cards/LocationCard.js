import React from "react";
import Link from "next/link";
import styled from "styled-components";

const BackgroundImage = styled.div`
  background-image: url(${(props) => props.image});
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-position: center center;
`;
const LocationCard = ({ location: { name, image, subtitle } }) => {
  return (
    <Link href={`/homes/${name}`}>
      <div className="w-full first:mt-0 mt-4 sm:mt-0 first:ml-0 ml-0 sm:ml-4 max-w-sm overflow-hidden rounded-md border bg-white shadow cursor-pointer">
        <div className="relative">
          <div className="h-48 bg-cover bg-no-repeat bg-center">
            <BackgroundImage image={image} />
          </div>
          <div className="absolute right-0 w-10 mr-2">
            {/* <a href="#">
              <img
                className="rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/17.jpg"
              />
            </a> */}
          </div>
        </div>
        <div className="p-3">
          <h3 className="mr-10 text-sm truncate-2nd font-semibold">
            <span>{name}</span>
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
