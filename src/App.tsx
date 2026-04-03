import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
import { LoadingProvider } from "./context/LoadingProvider";

const HomePage = () => (
  <LoadingProvider>
    <Suspense>
      <MainContainer>
        <Suspense>
          <CharacterModel />
        </Suspense>
      </MainContainer>
    </Suspense>
  </LoadingProvider>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/project/:id"
          element={
            <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0a0e17" }} />}>
              <ProjectDetail />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
