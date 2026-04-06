import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const WorkCategoryPage = lazy(() => import("./pages/WorkCategoryPage"));
import { LoadingProvider } from "./context/LoadingProvider";

const HomePage = () => (
  <Suspense>
    <MainContainer>
      <Suspense>
        <CharacterModel />
      </Suspense>
    </MainContainer>
  </Suspense>
);

const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/work/:category"
            element={
              <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0a0e17" }} />}>
                <WorkCategoryPage />
              </Suspense>
            }
          />
        </Routes>
      </LoadingProvider>
    </BrowserRouter>
  );
};

export default App;
