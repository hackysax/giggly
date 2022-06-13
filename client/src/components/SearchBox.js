import React from "react";
import Wrapper from "../assets/wrappers/SearchBox";
import { useAppContext } from "../context/appContext";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";

const SearchBox = () => {
  const {
    clearFilters,
    handleChangeGlob,
    isLoading,
    searchVenue,
    searchLocation,
    filterGenre,
    filterStatus,
    genreOptions,
    statusOptions,
    sortOptions,
    sortCurrent,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChangeGlob({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("clear filters", e);
    clearFilters();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search and Filter</h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Search Venue"
            value={searchVenue}
            name="searchVenue"
            handleChange={handleSearch}
          >
            Venue
          </FormRow>
          <FormRow
            type="text"
            labelText="Search Location"
            value={searchLocation}
            name="searchLocation"
            handleChange={handleSearch}
          ></FormRow>
          <FormRowSelect
            type="text"
            labelText="Status"
            value={filterStatus}
            name="filterStatus"
            options={["All", ...statusOptions]}
            handleChange={handleSearch}
          ></FormRowSelect>
          <FormRowSelect
            type="text"
            labelText="Genre"
            value={filterGenre}
            name="filterGenre"
            options={["All", ...genreOptions]}
            handleChange={handleSearch}
          ></FormRowSelect>
          <FormRowSelect
            labelText="Sort By"
            value={sortCurrent}
            name="sortCurrent"
            options={sortOptions}
            handleChange={handleSearch}
          ></FormRowSelect>
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchBox;
