import React from "react";
import ReactLoading from "react-loading";
import LoadingType from "./LoadingType";

const Loading = (props: any) => {
  let loadingType = "spin" as LoadingType;
  const style = {
    display: props.isLoading ? "block" : "none",
    width: "20%",
    position: "fixed",
    height: "20%",
    top: "15%",
    marginLeft: "20%",
    color: "#040404",
    type: loadingType
  };

const isHidden = (styleDisplay: string) =>{
    return styleDisplay === "none"
}

  return (
    <div hidden = {isHidden(style.display)}>
      <ReactLoading
        type={style.type}
        color={style.color}
        height={style.height}
        width={style.width}
      />
    </div>
  );
};

export default Loading;
