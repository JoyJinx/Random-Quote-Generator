import React, { useState, useRef, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import randomColor from "https://esm.sh/randomcolor";
const initialState = {
  loading: true,
  data: [],
  themeColor: ""
};

function RandomQuote() {
  const [load, setLoad] = useState(initialState);

  useEffect(() => {
    fetch("https://api.quotable.io/quotes/random")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setLoad({ loading: false, data: data[0], themeColor: randomColor() });
      })
      .catch((e) => console.log(e));
  }, []);

  function handleNewQuote() {
    setLoad(load, { loading: true, data: [] });
    fetch("https://api.quotable.io/quotes/random")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (data) {
        setLoad({ loading: false, data: data[0], themeColor: randomColor() });
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="wrapper" style={{ backgroundColor: load.themeColor }}>
      <div id="quote-box">
        <div id="text" style={{ color: load.themeColor }}>
          {load.loading === true ? "Is Loading ..." : load.data.content}
        </div>
        <br />
        <div id="author" style={{ color: load.themeColor }}>
          - {load.loading === true ? "" : load.data.author}
        </div>
        <div className="btns">
          <a
            style={{ backgroundColor: load.themeColor }}
            className="button"
            target="_blank"
            href="twitter.com/intent/tweet"
            id="tweet-quote"
          >
            Tweet
          </a>
          <button
            className="button"
            id="newBtn"
            onClick={handleNewQuote}
            id="new-quote"
            style={{ backgroundColor: load.themeColor }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <RandomQuote />;
}

ReactDOM.render(<App />, document.getElementById("root"));
