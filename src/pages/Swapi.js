import { fetchPlanets } from "../redux/slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Planet from "../components/Planet";
import People from "../components/People";
import { increment, decrement, init } from "../redux/slice";

const Swapi = () => {
  const dispatch = useDispatch();
  const [paramLocal, setParam] = useState("");
  const number = useSelector((state) => state.planets.page);

  useEffect(() => {
    dispatch(fetchPlanets(paramLocal));
  }, [dispatch, number]);

  const data = useSelector((state) => state.planets.data);
  const { status, error } = useSelector((state) => state.planets);

  const handlerIncrement = () => {
    dispatch(increment());
  };
  const handlerDecrement = () => {
    dispatch(decrement());
  };

  const handlerChangeParam = (e) => {
    const param = e.target.textContent;
    if (paramLocal !== param) {
      setParam(param);
      dispatch(fetchPlanets(param));
      dispatch(init());
    }
  };

  const switchParam = () => {
    switch (paramLocal) {
      case "planets":
        return <Planet {...data} />;
      case "people":
        return <People {...data} />;
      default: {
        return <Planet {...data} />;
      }
    }
  };

  console.log(data);
  return (
    <div className="swapi">
      <div className="navBar">
        <button className="btn" onClick={handlerChangeParam}>
          planets
        </button>
        <button className="btn" onClick={handlerChangeParam}>
          people
        </button>
      </div>
      <div className="info">
        <div className="subinfo">
          {status === "loading" && <h1>Loading ...</h1>}
          {error && <h2> ERRROR: {error}</h2>}
        </div>
        {switchParam()}

        <div className="btnBlock">
          <button
            className="btn"
            disabled={number === 1}
            onClick={handlerDecrement}>
            -
          </button>
          {number}
          <button
            className="btn"
            disabled={number === 10}
            onClick={handlerIncrement}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Swapi;
