import LinksEditor from "../../../components/editorPanel/LinksEditor";
import styled from "styled-components";
import { useContext } from "react";
import Context from "../../../Context";

const Iframe = styled.iframe``;

export default function openVideoPlayer({ setForm, url }) {
  //ratio: 1:1.7

  let ratio = 1.7;
  let width = window.innerWidth * 0.9;
  let height = width / ratio;

  if (window.innerWidth < 950) {
    width = window.innerWidth;
    height = width / ratio;
  }

  let form = {
    settings: { width: width + "px", height: height + "px" },
    component: (
      <Iframe
        width={width}
        height={height}
        src={url}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    ),
  };

  setForm(form);
}

/*

<iframe width="560" height="315" src="https://www.youtube.com/embed/Wm6jmN2XQ3w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

*/
