import { useEffect, useState } from "react";
import UnderConstruction from "../Components/UnderConstruction";
import { useStore } from "../Zustand/hooks";
import { useNavigate } from "react-router-dom";

const PaperUpdater = () => {
  const navigate = useNavigate();
  const isLoggedIn = useStore((state) => state.loggedIn);

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/');
    }
  }, []);  

  return (
    <UnderConstruction />
  )

};

export default PaperUpdater;