import { useEffect, useState } from "react";
import UnderConstruction from "../Components/UnderConstruction";
import { useStore } from "../Zustand/useStore";
import { useNavigate } from "react-router-dom";

const PaperCreator = () => {
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

export default PaperCreator;