import { useParams } from "react-router-dom";

function HackathonDetail() {
    const { id } = useParams();

    // Simuler des données
    const fakeHackathon = {
        1: { name: "Hackathon IA Santé", theme: "Santé connectée", date: "2025-04-10T09:00:00Z" },
        2: { name: "Hackathon Sécurité Web", theme: "Cybersécurité", date: "2025-05-05T10:00:00Z" },
        3: { name: "Hackathon Énergie", theme: "Tech durable", date: "2025-06-15T08:30:00Z" },
        4: { name: "Hackathon Cloud", theme: "DevOps", date: "2025-07-01T09:00:00Z" },
        5: { name: "Hackathon IA Juridique", theme: "LegalTech", date: "2025-08-12T14:00:00Z" }
    };

    const hackathon = fakeHackathon[id];

    if (!hackathon) {
        return <p>Hackathon introuvable</p>;
    }

    return (
        <div>
            <h2>{hackathon.name}</h2>
            <p>Thème : {hackathon.theme}</p>
            <p>Date : {new Date(hackathon.date).toLocaleString()}</p>
        </div>
    );
}

export default HackathonDetail;
