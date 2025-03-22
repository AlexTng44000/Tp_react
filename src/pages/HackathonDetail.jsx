import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function HackathonDetail() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();

    const fakeHackathon = {
        1: { name: "Hackathon IA Santé", theme: "Santé connectée", date: "2025-04-10T09:00:00Z" },
        2: { name: "Hackathon Sécurité Web", theme: "Cybersécurité", date: "2025-05-05T10:00:00Z" },
        3: { name: "Hackathon Énergie", theme: "Tech durable", date: "2025-06-15T08:30:00Z" },
        4: { name: "Hackathon Cloud", theme: "DevOps", date: "2025-07-01T09:00:00Z" },
        5: { name: "Hackathon IA Juridique", theme: "LegalTech", date: "2025-08-12T14:00:00Z" }
    };

    const hackathon = fakeHackathon[id];

    const [teamName, setTeamName] = useState("");
    const [teamCode, setTeamCode] = useState("");

    const handleCreateTeam = (e) => {
        e.preventDefault();
        alert(`Créer l’équipe : ${teamName}`);
    };

    const handleJoinTeam = (e) => {
        e.preventDefault();
        alert(`Rejoindre l’équipe avec le code : ${teamCode}`);
    };

    if (!hackathon) return <p>Hackathon introuvable</p>;

    return (
        <div>
            <h2>{hackathon.name}</h2>
            <p>Thème : {hackathon.theme}</p>
            <p>Date : {new Date(hackathon.date).toLocaleString()}</p>

            {isAuthenticated && (
                <div>
                    <h3>Créer une équipe</h3>
                    <form onSubmit={handleCreateTeam}>
                        <input
                            type="text"
                            placeholder="Nom de l’équipe"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <button type="submit">Créer</button>
                    </form>

                    <h3>Rejoindre une équipe</h3>
                    <form onSubmit={handleJoinTeam}>
                        <input
                            type="text"
                            placeholder="Code de l’équipe"
                            value={teamCode}
                            onChange={(e) => setTeamCode(e.target.value)}
                        />
                        <button type="submit">Rejoindre</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default HackathonDetail;
