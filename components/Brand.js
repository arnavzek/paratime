import styled from "styled-components";
import Link from "next/link";
// const Path = styled.path`
//   stroke: ${({ color }) => color};
//   strokeWidth: 2;
//   fill: ${({ fill }) => (fill ? fill : "none")};
// `;

// const Rect = styled.rect`
//   stroke: ${({ color }) => color};
//   fill: ${({ fill }) => (fill ? fill : "none")};
// `;

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 55px;
  width: 55px;
  margin-bottom: 38px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/home/logo.svg");
`;

export default Brand;
