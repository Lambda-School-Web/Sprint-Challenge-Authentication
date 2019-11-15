import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "./axiosWithAuth";

const Users = () => {
  const [jokes, setJokes] = useState([]);

  const getJokes = async () => {
    try {
      const res = await axiosWithAuth().get("jokes");
      setJokes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getJokes();
  }, []);

  return (
    <div>
      {jokes.map(joke => {
        return (
          <>
            <p>id: {joke.id}</p>
            <p>joke: {joke.joke}</p>
          </>
        );
      })}
    </div>
  );
};

export default Users;
