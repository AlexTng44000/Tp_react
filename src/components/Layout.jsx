function Layout({ children }) {
    return (
        <>
            <header>
                <h1>HackTrack</h1>
                <nav>
                    <a href="/login">Se connecter</a>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    );
}

export default Layout;
