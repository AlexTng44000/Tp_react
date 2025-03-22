function Home() {
    const hackathons = [
        {
            id: 1,
            name: "Hackathon IA Santé",
            theme: "Santé connectée",
            date: "2025-04-10T09:00:00Z",
        },
        {
            id: 2,
            name: "Hackathon Sécurité Web",
            theme: "Cybersécurité",
            date: "2025-05-05T10:00:00Z",
        },
        {
            id: 3,
            name: "Hackathon Énergie",
            theme: "Tech durable",
            date: "2025-06-15T08:30:00Z",
        },
    ];

    return (
        <div>
            <h2>Bienvenue sur HackTrack</h2>
            <p>Inscris-toi aux prochains hackathons de l’école.</p>

            <h3>À venir</h3>
            <ul>
                {hackathons.map((h) => (
                    <li key={h.id}>
                        <strong>{h.name}</strong> – {h.theme} (
                        {new Date(h.date).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
