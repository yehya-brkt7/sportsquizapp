import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Quiz from "./quiz";

export default function Home() {
  const [sport, setSport] = useState();
  const [selected, setSelected] = useState(false);

  return (
    <>
      {!selected && (
        <Grid container justifyContent="center" textAlign="center">
          <Grid item xs={12} marginBottom="50px" marginTop="100px">
            <h1>Choose sport</h1>
          </Grid>
          <Grid item xs={12}>
            <button className={styles.button} onClick={() => setSport("nba")}>
              NBA
            </button>
          </Grid>
          <Grid item xs={12}>
            <button
              className={styles.button}
              onClick={() => setSport("football")}
            >
              FOOTBALL
            </button>
          </Grid>

          <Grid item xs={12} marginTop="100px">
            <button onClick={() => setSelected(true)} className={styles.button}>
              Start Quiz
            </button>
          </Grid>
        </Grid>
      )}
      {selected && <Quiz sport={sport} setSelected={setSelected} />}
    </>
  );
}
