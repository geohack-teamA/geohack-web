import React from "react";
import useHooks from "./hooks"

export type Props = {
  className?: string;
}

const Form: React.FC<Props> = ({ className }) => {
  const {getGeoLocation, currentLocation} = useHooks();
  return(
    <div>
      hello
      <div>
        Your current location is
      </div>
      <div>
        {
          currentLocation?.lat
        }
      </div>
      <div>
        {
          currentLocation?.lng
        }
      </div>
    </div>
  );
};

export default Form;
