import "./App.css";
import "./main.scss"; // Assurez-vous que cette ligne est présente
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  // Initialiser les composants Bootstrap interactifs une fois que le composant est monté
  useEffect(() => {
    // Assurez-vous que les composants Bootstrap sont initialisés
    // Cette étape est importante pour le bon fonctionnement de la navbar offcanvas
    const bootstrap = window.bootstrap;
    if (bootstrap) {
      // Initialiser tous les tooltips, dropdowns, etc. si nécessaire
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggleEl => {
        new bootstrap.Dropdown(dropdownToggleEl);
      });
    }
  }, []);

  return (
    <Router>
      {/* Nouvelle navbar Bootstrap intégrée avec votre logique d'authentification */}
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">JtGame</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                
                {/* Menu conditionnel selon l'état d'authentification */}
                {!isAuth ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/createpost"   >Create Post</Link>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={signUserOut}>Log Out</button>
                    </li>
                  </>
                )}
                
                {/* Menu déroulant d'exemple (vous pouvez le personnaliser ou le supprimer) */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">About</a></li>
                  </ul>
                </li>
              </ul>
              
              {/* Formulaire de recherche (facultatif) */}
              <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Ajout d'un espaceur pour éviter que le contenu soit caché derrière la navbar fixe */}
      <div style={{ paddingTop: "70px" }}></div>
      
      {/* Vos routes existantes */}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;