import React from "react";
import { useState } from "react";
import { FormRow, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";

const Profile = () => {
  const { user, isLoading, showAlert, displayAlert, updateUser } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      displayAlert("Please enter all required values.");
    }
    //console.log("Submit update!!!");
    updateUser({ name, email, lastName, location });
  };

  //console.log("User in profile:", user);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>User Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            className="form-row"
            name="name"
            labelText="First Name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          ></FormRow>
          <FormRow
            type="text"
            className="form-row"
            name="lastName"
            labelText="Last Name"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          ></FormRow>
          <FormRow
            type="email"
            className="form-row"
            name="email"
            labelText="Email Address"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          ></FormRow>
          <FormRow
            type="text"
            className="form-row"
            name="location"
            labelText="Location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          ></FormRow>

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Update User"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
