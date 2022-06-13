import React from "react";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useAppContext } from "../context/appContext.js";

const PageBtnContainer = () => {
  const { numPages, page, changePg } = useAppContext();

  const pages = Array.from({ length: numPages }, (_, index) => {
    return index + 1;
  });
  const nextPg = () => {
    let newPage = page + 1;
    if (newPage > numPages) {
      newPage = 1;
    }
    changePg(newPage);
  };
  const previousPg = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numPages;
    }
    changePg(newPage);
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={previousPg}>
        <HiChevronDoubleLeft /> Prev
      </button>

      <div className="pg-btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => changePg(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button className="next-btn" onClick={nextPg}>
        <HiChevronDoubleRight />
        Next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
