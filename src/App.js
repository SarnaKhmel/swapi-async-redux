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
    setPage(number);
  };
  const handlerDecrement = () => {
    dispatch(decrement());
    setPage(number);
  };
  return (
    <div className="App">
      <div>
        <h2>Planet:</h2>

        {status === "loading" && <h1>Loading ...</h1>}
        {error && <h2> ERRROR: {error}</h2>}
        <Planet {...data} />
      </div>
      <button onClick={handlerIncrement}>+</button>
      {number}
      <button onClick={handlerDecrement}>-</button>
    </div>
  );
};

export default App;
