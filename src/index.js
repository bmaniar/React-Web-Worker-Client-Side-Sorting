import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useInterval from "react-useinterval";
import { fetchUsers } from "./services/fakeDataGenerator.service";
import WebWorker from "./workers/web.worker";
import sortingWorker from "./workers/sorting.worker";
import sortListDescending from "./services/sortDescending.service";
import "./styles.css";

const App = () => {
  const [initialized, setInitialized] = useState(false);
  let [timer, setTimer] = useState(0);
  const [userData, setUserData] = useState([]);
  let worker = useRef(null);

  useInterval(() => {
    setTimer(timer + 1);
  }, 1000 / 60);

  function onError(error) {
    console.log(error);
  }

  function onMessage(e) {
    console.log("[MAIN] MSG FROM WORKER: ", e.data);
    setUserData(e.data);
  }

  useEffect(() => {
    if (!initialized) {
      worker.current = new WebWorker(sortingWorker);
      worker.current.onerror = onError;
      worker.current.onmessage = onMessage;
      fetchUsers().then(users => {
        setUserData(users);
      });
      setInitialized(true);
    }
  }, []);
  const sortAscending = () => {
    worker.current.postMessage(userData);
  };
  const sortDescending = () => {
    setUserData(sortListDescending(userData));
  };
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
      <div className="row">
        <div className="col-md-12">
          <h1>{timer}</h1>
          <div className="" role="group" aria-label="Basic example">
            <button
              type="button"
              className="col-sm-5 btn btn-primary"
              onClick={sortAscending}
            >
              Sort Ascending Number of Comments <strong>with WebWorker</strong>
            </button>
            <button
              type="button"
              className="col-sm-5 btn btn-success"
              onClick={sortDescending}
            >
              Sort Descending Number of Comments{" "}
              <strong>WITHOUT WebWorker</strong>
            </button>
          </div>
        </div>
      </div>
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
