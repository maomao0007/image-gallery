import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LovedProvider } from "./components/LovedContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const PhotoDetail = lazy(() => import("./components/PhotoDetail"));
const LovedPhotos = lazy(() => import("./pages/LovedPhotos"));

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <BrowserRouter>
        <LovedProvider>
          <Header />
          <main className="container mx-auto py-8">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/photos/:id" element={<PhotoDetail />} />
                <Route path="/favorites" element={<LovedPhotos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </LovedProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
