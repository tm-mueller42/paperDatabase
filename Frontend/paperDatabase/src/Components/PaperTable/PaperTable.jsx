import { Link, useNavigate, useParams, } from "react-router-dom";
import  { useState } from "react";
import { useFilter } from "../../Zustand/useStore";
import "./PaperTable.css";

const PaperTable = ({ papers, onClickSort, onDelete, onFilter }) => {

  const clearFilters = useFilter((state) => state.clearAll);
  const titleFilter = useFilter((state) => state.title);
  const publishedBeforeFilter = useFilter((state) => state.before);
  const publishedAfterFilter = useFilter((state) => state.after);
  const journalFilter = useFilter((state) => state.journal);

  const setTitleFilterValue = useFilter((state) => state.setTitle);
  const setPublishedBeforeFilterValue = useFilter((state) => state.setBefore);
  const setPublishedAfterFilterValue = useFilter((state) => state.setAfter);
  const setJournalFilterValue = useFilter((state) => state.setJournal);


  // const [titleSearch, setTitleSearch] = useState({field: "title", operator : "LIKE", value : "test"});
  // const [publishedBefore, setPublishedBefore] = useState({field: "yearOfPublication", operator : "LESS_THAN", value : ""});
  // const [publishedAfter, setPublishedAfter] = useState({field: "yearOfPublication", operator : "GREATER_THAN", value : ""});
  // const [journalSearch, setJournalSearch] = useState({field: "journal", operator : "LIKE", value : ""});

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log("title: ", titleSearch.value, "before: ", publishedBefore, "after: ", publishedAfter, "journal: ", journalSearch);
    let searchArray = [titleFilter, publishedBeforeFilter, publishedAfterFilter, journalFilter];
    let currentSearch = searchArray.reduce((acc, searchItem) => {
      if (searchItem.value) {
        return [...acc, searchItem];
      }
      return acc;
    },[]);
    onFilter({filters : currentSearch});
  }

  const handleClear = () => {
    clearFilters();
  }

  return (
    <>
      <form 
        className="filterform"
        onSubmit={onSubmit}>
        <label htmlFor="title">Title: 
          <input
            type="text"
            // value={titleSearch.value}
            // onChange={(e) => {setTitleSearch({...titleSearch, value : e.target.value})}}
            value = {titleFilter.value}
            onChange={(e) => {setTitleFilterValue(e.target.value)}}
            name="title"
            id="title"
          />
        </label>
        <label htmlFor="publishedbefore">published before:
          <input 
            type="number" 
            // value={publishedBefore.value ? publishedBefore.value : ""}
            // onChange={(e) => {setPublishedBefore({...publishedBefore, value : e.target.value})}}
            value = {publishedBeforeFilter.value}
            onChange={(e) => {setPublishedBeforeFilterValue(e.target.value)}}
            name="publishedbefore"
            id="publishedbefore"
          />
        </label>
        <label htmlFor="publishedafter">published after:
          <input 
            type="number" 
            // value={publishedAfter.value ? publishedAfter.value : ""}
            // onChange={(e) => {setPublishedAfter(e.target.value)}}
            value = {publishedAfterFilter.value}
            onChange={(e) => {setPublishedAfterFilterValue(e.target.value)}}
            name="publishedafter"
            id="publishedafter"            
          />
        </label>
        <label htmlFor="journal">Journal:
          <input 
            type="text" 
            // value={journalSearch.value ? journalSearch.value : ""}
            // onChange={(e) => {setJournalSearch(e.target.value)}}
            value = {journalFilter.value}
            onChange={(e) => {setJournalFilterValue(e.target.value)}}
            name="journal"
            id="journal"
          />
        </label>
        <button>Submit</button>
        <button onClick={handleClear}>Clear</button>

      </form>  
      <div className="PaperTable">
        <table>
          <thead>
            <tr>
              <th><button type="button" onClick={() => onClickSort("id")} >Id</button></th>
              <th><button type="button" onClick={() => onClickSort("title")}>Title</button></th>
              <th><button type="button" onClick={() => onClickSort("firstAuthor")}>First Author</button></th>
              <th><button type="button" onClick={() => onClickSort("lastAuthor")}>Last Author</button></th>
              <th><button type="button" onClick={() => onClickSort("journal")}>Journal</button></th>
              <th><button type="button" onClick={() => onClickSort("year")}>Year</button></th>
              <th><button type="button" onClick={() => onClickSort("doi")}>DOI</button></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id}>
                <td>{paper.id}</td>
                <td>{paper.title}</td>
                <td>{paper.authors[0]}</td>
                <td>{paper.authors[paper.authors.length-1]}</td>
                <td>{paper.journal}</td>
                <td>{paper.yearOfPublication}</td>
                <td>{paper?.doi ?? ""}</td>
                <td>
                  <Link to={`/paper/update/${paper.id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(paper.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PaperTable;
