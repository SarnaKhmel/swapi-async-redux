import "./App.css";
import { fetchPlanets } from "./redux/slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Planet from "./components/Planet";
import { increment, decrement } from "./redux/slice";
const App = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchPlanets());
  }, [dispatch, page]);

  const data = useSelector((state) => state.planets.data);
  const number = useSelector((state) => state.planets.page);
  const { status, error } = useSelector((state) => state.planets);
  // console.log(data);

  const handlerIncrement = () => {
    dispatch(increment());
    if (number <= 0 && number >= 60) setPage(1);
  };
  const handlerDecrement = () => {
    dispatch(decrement());
    if (number <= 0 && number >= 60) setPage(1);
    setPage(number);
  };
  return (
    <div className="App">
      <div className="navBar"></div>
      <div className="info">
        <h2>Planet:</h2>

        {status === "loading" && <h1>Loading ...</h1>}
        {error && <h2> ERRROR: {error}</h2>}
        <Planet {...data} />
        <div className="btnBlock">
          <button onClick={handlerDecrement}>-</button>
          {number}
          <button onClick={handlerIncrement}>+</button>
        </div>
      </div>
    </div>
  );
};

export default App;
