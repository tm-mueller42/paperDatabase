import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import PaperTable from "../Components/PaperTable";
import { BACKEND_GETALLPAPERS } from '../Constants/endpoints.js';
import { getAllPapers, getFilteredPapers, deletePaperById } from "../Requests/paper.js";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Zustand/useStore.js";

const AllPapers = () => {

  const getJwt = useStore((state) => state.jwt);
  const isLoggedIn = useStore((state) => state.loggedIn);
  const setFilters = useStore((state) => state.setFilters);
  const filters = useStore((state) => state.filters);
  const clearFilters = useStore((state) => state.clearFilters);
  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState(null);
  const navigate = useNavigate();


  const handleDelete = (id) => {
    deletePaperById(getJwt, id)
    .then(() => {
      getAllPapers(getJwt)
      .then((papers) => {
        setLoading(false);
        setPapers(papers);
      });
    });
  };

  const handleOnClickSort = (sortItem) => {
    console.log(sortItem);
  }

  const handleFilter = (newFilters) => {
    setLoading(true);
    setFilters(newFilters);
    getFilteredPapers(getJwt, newFilters)
      .then((papers) => {
        setLoading(false);
        setPapers(papers);
      })
      .catch(error => {
        console.log('ERROR: ' + error);
      });
  }
  

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/');
    }
    getAllPapers(getJwt)
      .then((papers) => {
        setLoading(false);
        setPapers(papers);
      })
      .catch(error => {
        console.log('ERROR: ' + error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <PaperTable 
    papers={papers} 
    onClickSort={handleOnClickSort}
    onDelete={handleDelete}
    onFilter={handleFilter} 
    />


  );

};

export default AllPapers;