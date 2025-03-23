import { useAuth } from "../context/AuthContext";
import "./Layout.css";


function Layout({ children }) {
    const { isAuthenticated, logout, user } = useAuth();


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
            <main>
                {children}
            </main>
        </>
    );
}

export default Layout;
