import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function HackathonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const [hackathon, setHackathon] = useState(null);
    const [teamName, setTeamName] = useState("");
    const [teamCode, setTeamCode] = useState("");

    const loadHackathon = async () => {
        try {
            const res = await fetch(`http://localhost:3002/hackathons/${id}`);
            if (!res.ok) throw new Error("Erreur lors du chargement du hackathon");
            const data = await res.json();
            setHackathon(data);
        } catch (err) {
            console.error(err);
            alert("Impossible de charger les données du hackathon");
        }
    };

    useEffect(() => {
        loadHackathon();
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
                alert(error.error || "Erreur lors de la création de l'équipe");
                return;
            }

            alert("Équipe créée !");
            setTeamName("");
            loadHackathon();
        } catch (err) {
            console.error(err);
            alert("Erreur technique lors de la création de l'équipe");
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
                alert(error.error || "Erreur lors de l'ajout à l'équipe");
                return;
            }

            alert("Rejoint !");
            setTeamCode("");
            loadHackathon();
        } catch (err) {
            console.error(err);
            alert("Erreur technique lors de l'ajout à l'équipe");
        }
    };

    if (!hackathon) return <p>Chargement...</p>;

    return (
        <div>
            <button onClick={() => navigate("/hackathons")}>← Retour à la liste</button>

            <h2>{hackathon.name}</h2>
            <p>Thème : {hackathon.theme}</p>
            <p>Date : {new Date(hackathon.startDate).toLocaleString()}</p>

            {isAuthenticated && (
                <div>
                    <h3>Créer une équipe</h3>
                    <form onSubmit={handleCreateTeam}>
                        <input
                            type="text"
                            placeholder="Nom de l'équipe"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <button type="submit">Créer</button>
                    </form>

                    <h3>Rejoindre une équipe</h3>
                    <form onSubmit={handleJoinTeam}>
                        <input
                            type="text"
                            placeholder="Code de l'équipe"
                            value={teamCode}
                            onChange={(e) => setTeamCode(e.target.value)}
                        />
                        <button type="submit">Rejoindre</button>
                    </form>
                </div>
            )}

            <h3>Équipes inscrites</h3>
            {hackathon.teams.length === 0 ? (
                <p>Aucune équipe inscrite.</p>
            ) : (
                <ul>
                    {hackathon.teams.map((team) => (
                        <li key={team.id}>
                            <strong>[{team.id}] {team.name}</strong>
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
