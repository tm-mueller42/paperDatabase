import { Link, useNavigate, useParams, } from "react-router-dom";
import  { useState } from "react";
import { useFilter } from "../../Zustand/hooks";
import "./PaperTable.css";

const PaperTable = ({ papers, onClickSort, onDelete, onFilter }) => {

  const filters = useFilter((state) => state.filters);
  const clearFilters = useFilter((state) => state.clearAll);
  const setFilters = useFilter((state) => state.setFilters);

  const onSubmit = (e) => {
    e.preventDefault();
    onFilter();
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
            value = {filters.title.value}
            onChange={(e) => setFilters({...filters, title: {...filters.title, value: e.target.value}})}
            name="title"
            id="title"
          />
        </label>
        <label htmlFor="publishedbefore">published before:
          <input 
            type="number" 
            value = {filters.before.value}
            onChange={(e) => setFilters({...filters, before: {...filters.before, value: e.target.value}})}
            name="publishedbefore"
            id="publishedbefore"
          />
        </label>
        <label htmlFor="publishedafter">published after:
          <input 
            type="number" 
            value = {filters.after.value}
            onChange={(e) => setFilters({...filters, after: {...filters.after, value: e.target.value}})}
            name="publishedafter"
            id="publishedafter"            
          />
        </label>
        <label htmlFor="journal">Journal:
          <input 
            type="text" 
            value = {filters.journal.value}
            onChange={(e) => setFilters({...filters, journal: {...filters.journal, value: e.target.value}})}
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
