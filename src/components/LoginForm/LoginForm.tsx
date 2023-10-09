import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import paths from "../../paths/paths";
import { User } from "../../types";
import Button from "../Button/Button";

const LoginForm = (): React.ReactElement => {
  const [disabled, setDisabled] = useState(false);

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

  useEffect(() => {
    setDisabled(
      Object.values(logUser).every((value) => {
        return Boolean(value);
      }),
    );
  }, [logUser]);

  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, logUser.email!, logUser.password!);

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
        <Button
          className="outline-white outline-white--wider"
          type="submit"
          disabled={!disabled}
        >
          Entrar
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
