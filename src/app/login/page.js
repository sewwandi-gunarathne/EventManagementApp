"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            username: form.username,
            password: form.password,
        });

        if (res.ok) {
            router.push("/");

        } else {
            setError("Invalid Credentials");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={(e)=> 
                                setForm({...form, username: e.target.value})
                            }
                            required
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Password:
                        <input
                            type="text"
                            name="password"
                            value={form.password}
                            onChange={(e) => 
                                setForm({...form, password: e.target.value})
                            }
                            required
                        />
                    </label>
                </div>

                <button type="submit" className="button-login">
                    Login
                </button>
            </form>
        </div>
    );
}
