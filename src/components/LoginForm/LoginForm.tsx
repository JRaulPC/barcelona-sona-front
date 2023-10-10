import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import paths from "../../paths/paths";
import { User } from "../../types";
import Button from "../Button/Button";
import { FirebaseError } from "firebase/app";
import { showFeedback, wrongPassword } from "../Feedback/toast";

const LoginForm = (): React.ReactElement => {
  const [logUser, setLogUser] = useState<Partial<User>>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogUser((newUser) => ({
      ...newUser,
      [event.target.id]: event.target.value,
    }));
  };

  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, logUser.email!, logUser.password!);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          showFeedback(wrongPassword, "error");
        }

        if (error.message === "Firebase: Error (auth/user-not-found).") {
          showFeedback(wrongEmail, "error");
        }
      }
    }

    navigate(paths.homePage);
  };

  return (
    <form className="form-user" onSubmit={submitForm}>
      <div className="form-control">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="text"
          id="email"
          maxLength={70}
          value={logUser.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={logUser.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-spot__button">
        <Button className="outline-white outline-white--wider" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
