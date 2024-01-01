import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import PaperTable from "../Components/PaperTable";
import { getAllPapers, getFilteredPapers, deletePaperById } from "../Requests/paper.js";
import { useNavigate } from "react-router-dom";
import { useStore, useFilter } from "../Zustand/hooks.js";

const AllPapers = () => {

  const getJwt = useStore((state) => state.jwt);
  const isLoggedIn = useStore((state) => state.loggedIn);
  const filters = useFilter((state) => state.filters);
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

  const handleFilter = () => {
    setLoading(true);
    let FilterArray = Object.keys(filters).reduce((acc, key) => {
      if (filters[key].value) {
        return [...acc, filters[key]];
      }
      return acc;
    },[]);
    let filterRequest = {filters: FilterArray};

    getFilteredPapers(getJwt, filterRequest)
      .then((res) =>  res.json())
      .then((papers)  => {
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
      .then((result) => {
        if(result.status) {
          console.log(result.status)
        }
        else {
          setLoading(false);
          setPapers(result);
        }
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
    //currentFilterValues={currentFilterValues}
    />


  );

};

export default AllPapers;