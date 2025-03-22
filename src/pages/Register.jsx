import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
    name: z.string().min(1, "Nom requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Mot de passe trop court"),
});

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3002/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                alert("Erreur à l'inscription");
                return;
            }

            const result = await response.json();
            login(result.token); // Authentifie et stocke le token
            navigate("/");
        } catch (err) {
            console.error("Erreur API:", err);
            alert("Erreur technique");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Inscription</h2>

            <div>
                <label>Nom</label>
                <input type="text" {...register("name")} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input type="email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
                <label>Mot de passe</label>
                <input type="password" {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default Register;
