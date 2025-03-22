import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères")
});

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3002/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                alert("Identifiants incorrects");
                return;
            }

            const result = await response.json();
            localStorage.setItem("token", result.token);
            navigate("/");
        } catch (err) {
            console.error("Erreur lors de la connexion", err);
            alert("Erreur lors de la connexion");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Connexion</h2>

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

            <button type="submit">Se connecter</button>
        </form>
    );
}

export default Login;

