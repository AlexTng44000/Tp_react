import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hackathon() {
    const [page, setPage] = useState(1);
    const [hackathons, setHackathons] = useState([]);
    const [form, setForm] = useState({
        name: "",
        theme: "",
        startDate: "",
        endDate: "",
        description: ""
    });

    useEffect(() => {
        fetch("http://localhost:3002/hackathons?page=1&limit=10")
            .then((res) => res.json())
            .then((data) => setHackathons(data))
            .catch((err) => console.error("Erreur de chargement :", err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3002/hackathons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const error = await res.json();
                alert(error.error || "Erreur");
                return;
            }

            const newHackathon = await res.json();
            setHackathons((prev) => [...prev, newHackathon]);
            setForm({ name: "", theme: "", startDate: "", endDate: "", description: "" });
        } catch (err) {
            alert("Erreur réseau");
            console.error(err);
        }
    };

    const perPage = 2;
    const totalPages = Math.ceil(hackathons.length / perPage);
    const displayed = hackathons.slice((page - 1) * perPage, page * perPage);

    return (
        <div>
            <h2>Liste des hackathons</h2>
            <ul>
                {displayed.map((h) => (
                    <li key={h.id}>
                        <Link to={`/hackathons/${h.id}`}>
                            <strong>{h.name}</strong>
                        </Link>{" "}
                        – {h.theme} ({new Date(h.startDate).toLocaleDateString()})
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

            <h3>Créer un nouveau hackathon</h3>
            <form onSubmit={handleCreate}>
                <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
                <input name="theme" placeholder="Thème" value={form.theme} onChange={handleChange} required />
                <input name="startDate" type="datetime-local" value={form.startDate} onChange={handleChange} required />
                <input name="endDate" type="datetime-local" value={form.endDate} onChange={handleChange} required />
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export default Hackathon;
