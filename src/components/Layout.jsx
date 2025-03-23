import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import "./Layout.css";

function Layout({ children }) {
    const { isAuthenticated, logout, user } = useAuth();
    const location = useLocation();

    let backgroundColor = "#ffffff";

    if (location.pathname === "/") {
        backgroundColor = "#f9f9f9";
    } else if (location.pathname === "/hackathons") {
        backgroundColor = "#eef7ff";
    } else if (/^\/hackathons\/\d+$/.test(location.pathname)) {
        backgroundColor = "#fff8e7";
    }

    return (
        <>
            <header>
                <h1>HackTrack</h1>
                <nav>
                    <a href="/">Accueil</a>
                    <a href="/hackathons">Hackathons</a>
                    {isAuthenticated ? (
                        <>
                            <span>{user?.name} ({user?.email})</span>
                            <button onClick={logout}>Se déconnecter</button>
                        </>
                    ) : (
                        <>
                            <a href="/register">S'inscrire</a>
                            <a href="/login">Se connecter</a>
                        </>
                    )}
                </nav>
            </header>
            <main style={{ backgroundColor, minHeight: "100vh", padding: "1rem" }}>
                {children}
            </main>
        </>
    );
}

export default Layout;
