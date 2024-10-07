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
          >
            <button className="page-link" onClick={() => handlePageChange(i)}>
              {i + 1}
            </button>
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
            >
              <button className="page-link" onClick={() => handlePageChange(i)}>
                {i + 1}
              </button>
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
            >
              <button className="page-link" onClick={() => handlePageChange(i)}>
                {i + 1}
              </button>
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
            >
              <button className="page-link" onClick={() => handlePageChange(i)}>
                {i + 1}
              </button>
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
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {renderPagination()}
        <li
          className={`page-item ${
            currentPage === totalPage - 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
