import React from "react";

const Pagination = ({ currentPage, totalPage, handlePageChange }) => {
  const renderPagination = () => {
    const pages = [];
    if (totalPage <= 3) {
      for (let i = 0; i < totalPage; i++) {
        pages.push(
          <li
            className={`page-item ${i === currentPage ? "active" : ""}`}
            key={i}
            onClick={() => handlePageChange(i)}
          >
            <a className="page-link" href="#">
              {i + 1}
            </a>
          </li>
        );
      }
    } else {
      // Logic for showing page numbers with ellipsis
      if (currentPage < 2) {
        for (let i = 0; i < 3; i++) {
          pages.push(
            <li
              className={`page-item ${i === currentPage ? "active" : ""}`}
              key={i}
              onClick={() => handlePageChange(i)}
            >
              <a className="page-link" href="#">
                {i + 1}
              </a>
            </li>
          );
        }
        pages.push(
          <li className="page-item disabled" key="ellipsis-right">
            <span className="page-link">...</span>
          </li>
        );
      } else if (currentPage >= 2 && currentPage < totalPage - 2) {
        pages.push(
          <li className="page-item disabled" key="ellipsis-left">
            <span className="page-link">...</span>
          </li>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <li
              className={`page-item ${i === currentPage ? "active" : ""}`}
              key={i}
              onClick={() => handlePageChange(i)}
            >
              <a className="page-link" href="#">
                {i + 1}
              </a>
            </li>
          );
        }
        pages.push(
          <li className="page-item disabled" key="ellipsis-right">
            <span className="page-link">...</span>
          </li>
        );
      } else {
        pages.push(
          <li className="page-item disabled" key="ellipsis-left">
            <span className="page-link">...</span>
          </li>
        );
        for (let i = totalPage - 3; i < totalPage; i++) {
          pages.push(
            <li
              className={`page-item ${i === currentPage ? "active" : ""}`}
              key={i}
              onClick={() => handlePageChange(i)}
            >
              <a className="page-link" href="#">
                {i + 1}
              </a>
            </li>
          );
        }
      }
    }
    return pages;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination lis-view">
        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {renderPagination()}
        <li
          className={`page-item ${
            currentPage === totalPage - 1 ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
