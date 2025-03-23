import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
    const [hackathons, setHackathons] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/hackathons?page=1&limit=100")
            .then(res => res.json())
            .then(data => setHackathons(data))
            .catch(err => console.error("Erreur de chargement :", err));
    }, []);

    return (
        <div>
            <h2>Bienvenue sur HackTrack</h2>
            <p>Inscris-toi aux prochains hackathons de l’école.</p>

            <h3>À venir</h3>
            <ul>
                {hackathons.map((h) => (
                    <li key={h.id}>
                        <Link to={`/hackathons/${h.id}`}>
                            <strong>{h.name}</strong>
                        </Link>{" "}
                        – {h.theme} ({new Date(h.startDate).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
