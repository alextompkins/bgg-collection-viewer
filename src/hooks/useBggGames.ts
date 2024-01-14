import { BggGame, Game } from "../types/types";
import { useEffect, useState } from "react";
import convert from "xml-js";

const useBggGames = () => {
  const [collection, setCollection] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatGames = (games: BggGame[]) => {
    return games.map((game) => ({
      bggId: game._attributes.objectid,
      name: game.name._text,
      yearpublished: game.yearpublished._text,
      image: game.image._text,
      thumbnail: game.thumbnail._text,
      minplayers: parseInt(game.stats._attributes.minplayers),
      maxplayers: parseInt(game.stats._attributes.maxplayers),
      minplaytime: parseInt(game.stats._attributes.minplaytime),
      maxplaytime: parseInt(game.stats._attributes.maxplaytime),
      playingtime: parseInt(game.stats._attributes.playingtime),
      numplays: parseInt(game.numplays._text),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.geekdo.com/xmlapi/collection/hermokrates?own=1"
        );
        const data = JSON.parse(
          convert.xml2json(await response.text(), { compact: true, spaces: 2 })
        );
        const formattedGames = formatGames(data.items.item);
        setCollection(formattedGames);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { collection, loading, error };
};

export default useBggGames;
