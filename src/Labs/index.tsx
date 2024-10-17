
import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";

export default function Labs() {
  console.log('Hello World!');
  return (
    <div>
      <h1>Labs CS5610</h1>
      <h2>Yifan Zhu</h2>
      <a href="https://github.com/Lemoncoke1009/kanbas-react-web-app" id="wd-github" target="_blank" rel="noreferrer">
        My GitHub Repository
      </a>
      <h3>JavaScript</h3>

      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab3" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
        <Route path="Lab4/*" element={<Lab4 />} />
      </Routes>
    </div>
  );
}


