import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { fetchUsers } from "./services/fakeDataGenerator.service";
import "./styles.css";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (!initialized) {
      fetchUsers().then(users => {
        setUserData(users);
      });
      setInitialized(true);
    }
  });
  const renderUserData = () => {
    return userData.slice(0, 20).map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>
            <h5>{user.email}</h5>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container">
      <div className="row margin-top">
        <div className="col-md-12">
          <table>
            <tbody>{renderUserData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
