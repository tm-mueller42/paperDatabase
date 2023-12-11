import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import PaperTable from "../Components/PaperTable";
import { BACKEND_GETALLPAPERS } from '../Constants/endpoints.js';
import { useStore } from "../Zustand/useStore.js";
import { getAllPapers, deletePaperById } from "../Requests/paper.js";

// const deleteEmployee = (id) => {
//   return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
//     res.json()
//   );
// };


const AllPapers = () => {

  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState(null);
  const getJwt = useStore((state) => state.jwt);


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
  

  useEffect(() => {
    getAllPapers(getJwt)
      .then((papers) => {
        setLoading(false);
        setPapers(papers);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <PaperTable 
    papers={papers} 
    onClickSort={handleOnClickSort}
    onDelete={handleDelete} 
    />


  );

};

export default AllPapers;