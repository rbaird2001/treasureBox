import { useEffect, useState, fragment } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";

export default () => {
  const gameID = useParams();
  const [games, setGames] = useState([]);
  useEffect(() => {
    api.post(`/games/addGame/${gameID}`).then(response => {
        setGames = (response)
    });
  },[gameID]);
};
