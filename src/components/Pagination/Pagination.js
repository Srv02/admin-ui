import React from "react";
import PageButton from "./PageButton";
import "./pagination.css";
const Pagination = (props) => {
  const { page, rowsPerPage, operations, length } = props;
  const totalPage = Math.ceil(length / rowsPerPage);

  return (
    <div className="pagination-container">
      <div className="pagination-body">
        <PageButton onClick={operations.startPage} disable={page === 0}>
          {"<<"}
        </PageButton>
        <PageButton onClick={operations.prevPage} disable={page === 0}>
          {"<"}
        </PageButton>
        {[...Array(totalPage).keys()].map((pageIndex) => (
          <PageButton
            onClick={() => operations.goToPage(pageIndex)}
            active={page === pageIndex}
          >
            {pageIndex + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={operations.nextPage}
          disable={page === totalPage - 1}
        >
          {">"}
        </PageButton>
        <PageButton
          onClick={operations.endPage}
          disable={page === totalPage - 1}
        >
          {">>"}
        </PageButton>
      </div>
    </div>
  );
};

export default Pagination;
