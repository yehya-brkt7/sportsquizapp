import Image from "next/image";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { style } from "@mui/system";
import Link from "next/link";
import Home from "../index";

export default function Quiz({ sport, setSelected }) {
  const [data, setData] = useState([]);
  const [newdata, setnewData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedanswer, setSelectedanswer] = useState();
  const [score, setScore] = useState(0);
  const [check, setCheck] = useState(false);
  const [scoreMultiplier, setScoremultiplier] = useState(1);
  const [checkgametime, setCheckgametime] = useState(true);

  //load data from data.json
  useEffect(() => {
    axios.get("data.json").then((response) => {
      setData(response.data);
      setLoaded(true);
    });
    console.log(newdata.length);
  }, []);

  useEffect(() => {
    const sportfilter = data.filter((obj) => {
      return obj.sport === sport;
    });

    setFilteredData(sportfilter);
  }, [sport, loaded]);

  //shuffle data at first render
  useEffect(() => {
    const shuffle = (filteredData) =>
      [...filteredData].sort(() => Math.random() - 0.5);

    const newList = shuffle(filteredData);

    setnewData(newList);
  }, [filteredData]);

  //confirm function to evaluate answer
  const confirm = () => {
    if (newdata.length > 0) {
      const updatedList = newdata.splice(1);
      setnewData(updatedList);
      setCheck(false);
    }

    if (check == true && newdata.length > 0 && newdata[0].rating == "easy") {
      setScore(score + 1);
    } else if (
      check == true &&
      newdata.length > 0 &&
      newdata[0].rating == "medium"
    ) {
      setScore(score + 2);
    } else if (
      check == true &&
      newdata.length > 0 &&
      newdata[0].rating == "hard"
    ) {
      setScore(score + 3);
    } else if (
      check == false &&
      newdata.length > 0 &&
      newdata[0].rating == "hard"
    ) {
      setScore(score - 3);
    } else if (
      check == false &&
      newdata.length > 0 &&
      newdata[0].rating == "medium"
    ) {
      setScore(score - 2);
    } else setScore(score - 1);
  };

  //select answer
  function selectanswer(answer, type) {
    setSelectedanswer(answer);
    if (type == true) {
      setCheck(true);
    } else setCheck(false);
  }

  //check if game ended
  useEffect(() => {
    if (newdata.length == 1) {
      setCheckgametime(false);
    } else setCheckgametime(true);
  }, [newdata.length]);

  return (
    <>
      <Grid container justifyContent="center" textAlign="center">
        <Grid item xs={10}>
          {checkgametime && (
            <div className={styles.container}>
              <h1>
                <p className={styles.question}>
                  Q.
                  {newdata.length > 0 && newdata[0].question}? (
                  {newdata.length > 0 && newdata[0].rating})
                </p>
                <div>
                  {newdata.length > 0 &&
                    newdata[0]?.answers.map((a) => {
                      return (
                        <>
                          <button
                            className={styles.button}
                            onClick={() => {
                              selectanswer(a.answer, a.type);
                            }}
                          >
                            {a.answer}
                          </button>
                          <br></br>
                        </>
                      );
                    })}
                </div>

                <span onClick={confirm}>
                  <a href="#"></a>
                </span>
                <br></br>
                <br></br>
                <div>{score}</div>
              </h1>
            </div>
          )}
          {!checkgametime && (
            <>
              <div className={styles.gameover}>
                <h1>The Game Has ended, Your Score Is: {score}!</h1>
              </div>

              <button
                onClick={() => setSelected(false)}
                className={styles.button}
              >
                Reset
              </button>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
