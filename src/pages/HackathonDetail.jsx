import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function HackathonDetail() {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();

    const [hackathon, setHackathon] = useState(null);
    const [teamName, setTeamName] = useState("");
    const [teamCode, setTeamCode] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3002/hackathons/${id}`)
            .then((res) => res.json())
            .then((data) => setHackathon(data))
            .catch((err) => console.error("Erreur chargement :", err));
    }, [id]);

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3002/teams/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    name: teamName,
                    hackathonId: parseInt(id),
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                alert(error.error || "Erreur création");
                return;
            }

            alert("Équipe créée !");
            setTeamName("");
        } catch (err) {
            alert("Erreur technique");
            console.error(err);
        }
    };

    const handleJoinTeam = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3002/teams/join/${teamCode}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!res.ok) {
                const error = await res.json();
                alert(error.error || "Erreur");
                return;
            }

            alert("Rejoint !");
            setTeamCode("");
        } catch (err) {
            alert("Erreur technique");
        }
    };

    if (!hackathon) return <p>Chargement...</p>;

    return (
        <div>
            <h2>{hackathon.name}</h2>
            <p>Thème : {hackathon.theme}</p>
            <p>Date : {new Date(hackathon.startDate).toLocaleString()}</p>

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
                            placeholder="ID de l’équipe"
                            value={teamCode}
                            onChange={(e) => setTeamCode(e.target.value)}
                        />
                        <button type="submit">Rejoindre</button>
                    </form>
                </div>
            )}

            <h3>Équipes inscrites</h3>
            {hackathon.teams.length === 0 ? (
                <p>Aucune équipe pour l’instant.</p>
            ) : (
                <ul>
                    {hackathon.teams.map((team) => (
                        <li key={team.id}>
                            <strong>{team.name}</strong>
                            <ul>
                                {team.users.map((user) => (
                                    <li key={user.id}>{user.name}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HackathonDetail;
