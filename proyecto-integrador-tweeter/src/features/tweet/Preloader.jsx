import React from "react";
import { Preloader, TailSpin } from "react-preloader-icon";

export default function CustomPreloader({ text }) {
  return (
    <div
      style={{
        marginTop: "50%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Preloader
        use={TailSpin}
        size={90}
        strokeWidth={11}
        strokeColor="Skyblue"
        duration={1990}
        style={{ alignSelf: "center" }}
      />
      <h2>{text}</h2>
    </div>
  );
}
