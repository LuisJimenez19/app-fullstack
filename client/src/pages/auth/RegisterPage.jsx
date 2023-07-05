import { useState } from "react";
import { LayoutAuth } from "./LayoutAuth";
import "./auth.css";
import { registerRequest } from "../../api/auth";

import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

function RegisterPage() {
  const auth = useAuth();

  const [user, setUser] = useState({});
  const [formErros, setFormErros] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErros(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await registerRequest(user);

        if (res.status === 200 || res.status === 204) {
          
          auth.setUser(res.data.currentUser);
          toast.success(res.data.message, {
            duration: 1000,
          });
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  }

  function handleChange(e) {
    const data = { ...user };
    data[e.target.id] = e.target.value;
    setUser(data);
  }

  function validateForm(data) {
    const errors = {};
    if (!data.name) errors.name = "El nombre es requerido";
    if (!data.email) errors.email = "El correo es requerido";
    if (!data.password) errors.password = "La contraseña es requerida";
    return errors;
  }

  return (
    <LayoutAuth>
      <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="">
          <div className="form">
            <label className="form__label" htmlFor="name">
              <p>Nombre</p>
              <input
                autoFocus
                type="text"
                id="name"
                className="input-auth"
                required
                placeholder="Lionel Messi"
                onChange={handleChange}
              />
              {formErros.name && (
                <span className="error-input">{formErros.name}</span>
              )}
            </label>
            <label className="form__label" htmlFor="email">
              <p>Email</p>
              <input
                type="email"
                id="email"
                className="input-auth"
                required
                placeholder="messi@gmail.com"
                onChange={handleChange}
              />
              {formErros.email && (
                <span className="error-input">{formErros.email}</span>
              )}
            </label>
            <label className="form__label" htmlFor="password">
              <p>Contraseña</p>
              <input
                type="password"
                id="password"
                className="input-auth"
                required
                onChange={handleChange}
              />
              {formErros.password && (
                <span className="error-input">{formErros.password}</span>
              )}
            </label>
          </div>
          <button
            aria-label="Enviar datos"
            aria-labelledby="Enviar datos"
            type="submit"
            className="btn-submit"
          >
            Register
          </button>
        </form>
      </>
    </LayoutAuth>
  );
}

export { RegisterPage };