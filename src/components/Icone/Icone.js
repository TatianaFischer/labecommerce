import React from "react";

function Icone(props) {
  return (
    <div>
      <img alt={"Icone"} src={props.icone} onClick={props.onClickIcone} />
    </div>
  );
}

export default Icone;
