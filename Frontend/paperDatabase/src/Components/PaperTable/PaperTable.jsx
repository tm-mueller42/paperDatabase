import { Link, useNavigate, useParams, } from "react-router-dom";
import {useState } from "react";
import "./PaperTable.css";

const PaperTable = ({ papers, onClickSort, onDelete }) => {
  //const navigate = useNavigate();
  // console.log(useParams());

  return (
    <>
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
