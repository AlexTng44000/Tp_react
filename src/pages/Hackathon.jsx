import { useState } from "react";

function Hackathon() {
    const [page, setPage] = useState(1);

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
        {
            id: 4,
            name: "Hackathon Cloud",
            theme: "DevOps",
            date: "2025-07-01T09:00:00Z",
        },
        {
            id: 5,
            name: "Hackathon IA Juridique",
            theme: "LegalTech",
            date: "2025-08-12T14:00:00Z",
        }
    ];

    const perPage = 2;
    const totalPages = Math.ceil(hackathons.length / perPage);
    const displayed = hackathons.slice((page - 1) * perPage, page * perPage);

    return (
        <div>
            <h2>Liste des hackathons</h2>
            <ul>
                {displayed.map((h) => (
                    <li key={h.id}>
                        <strong>{h.name}</strong> – {h.theme} (
                        {new Date(h.date).toLocaleDateString()})
                    </li>
                ))}
            </ul>

            <div>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        disabled={page === i + 1}
                        style={{ marginRight: "0.5rem" }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Hackathon;
