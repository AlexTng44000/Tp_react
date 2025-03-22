import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <>
            <header>
                <h1>HackTrack</h1>
                <nav>
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
