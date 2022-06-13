import React from "react";
import { FormRow, FormRowSelect, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";
import moment from "moment";

const AddGig = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    venue,
    venueemail,
    date,
    isEditing,
    gigLocation,
    status,
    statusOptions,
    genre,
    genreOptions,
    handleChangeGlob,
    handleClearGig,
    createGig,
    editGig,
  } = useAppContext();

  const dateFormated = moment(date).utc().format("YYYY-MM-DD");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!venue || !date || !venueemail) {
      displayAlert("Please provide all required values.");
    }
    if (isEditing) {
      editGig();
      //console.log("Edit Gig...");
    } else {
      createGig();
      //console.log("Submit gig...");
    }
  };
  const handleGigInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChangeGlob({ name: name, value: value });
    //console.log(`n:${name} v:${value}`);
  };

  const handleClear = () => {
    handleClearGig();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit your gig" : "Add a new gig"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            className="form-row"
            name="venue"
            labelText="Venue"
            value={venue}
            handleChange={handleGigInput}
          ></FormRow>
          <FormRow
            type="text"
            className="form-row"
            name="venueemail"
            labelText="Venue Email"
            value={venueemail}
            handleChange={handleGigInput}
          ></FormRow>
          <FormRow
            type="date"
            className="form-row"
            name="date"
            labelText="Date of Performance"
            value={dateFormated}
            handleChange={handleGigInput}
          ></FormRow>
          <FormRow
            type="text"
            className="form-row"
            name="gigLocation"
            labelText="Location"
            value={gigLocation}
            handleChange={handleGigInput}
          ></FormRow>
          <FormRowSelect
            className="form-row"
            name="status"
            labelText="Booking Status"
            value={status}
            options={statusOptions}
            handleChange={handleGigInput}
          ></FormRowSelect>
          <FormRowSelect
            className="form-row"
            name="genre"
            labelText="Show Genre"
            value={genre}
            options={genreOptions}
            handleChange={handleGigInput}
          ></FormRowSelect>
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onSubmit={handleSubmit}
              disabled={isLoading}
            >
              {isEditing ? "Save Changes" : "Add Gig"}
            </button>
            <button
              className="btn btn-block clear-btn"
              type="clear"
              onClick={(e) => {
                e.preventDefault(); //<-------------Important :/
                handleClear();
              }}
              disabled={isLoading}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddGig;
