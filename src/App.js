import { useState, useEffect } from "react";
//Import Components
import "./components/style.css";
import AnimeList from "./components/AnimeList";
import AnimeInfo from "./components/AnimeInfo";
import AddToList from "./components/AddToList";
import RemoveFromList from "./components/RemoveFromList";

function App() {
  const [search, setSearch] = useState("Gintama");

  const [animeData, setAnimeData] = useState();

  const [animeInfo, setAnimeInfo] = useState();

  const [myAnimeList, setMyAnimeList] = useState([]);

  // Add anime to my list.
  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };

  // Remove anime from my list.
  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };

  const getData = async () => {
    //get Anime&save response to state
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20&sfw`
    );

    const resData = await response.json();
    setAnimeData(resData.data);
  };

  useEffect(() => {
    getData();
  }, [search]);

  // Use components in app's returned JSX
  // Pass the getAnime function as a prop called animesearch
  return (
    <>
      <div className="header">
        <h1>MyAnimeCatalog</h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search for Anime"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Where the list of searched anime will pop up. */}
      <div className="container">
        <div className="animeInfo">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <AnimeList
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
            />
          </div>
          {/* My list of anime. */}
          <h2 className="text-heading">My List</h2>
          <div className="row">
            <AnimeList
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromList}
              handleList={(anime) => removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
