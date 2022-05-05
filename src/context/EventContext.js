import { createContext, useContext, useState } from "react";

const EventContext = createContext();
const useEvent = () => useContext(EventContext);

const EventProvider = ({ children }) => {
  const [allowTouch, setAllowTouch] = useState(true);

  const values = { allowTouch, setAllowTouch };

  return (
    <EventContext.Provider value={values}>{children}</EventContext.Provider>
  );
};

export { useEvent, EventProvider };
