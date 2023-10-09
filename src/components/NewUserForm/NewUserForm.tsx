import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { apiUrl } from "../../hooks/useSpotsApi";
import { User } from "../../types";
import Button from "../Button/Button";
import { accountSuccesFeedback, showFeedback } from "../Feedback/toast";

const NewUserForm = (): React.ReactElement => {
  const [disabled, setDisabled] = useState(false);

  const [newUser, setNewUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((newUser) => ({
      ...newUser,
      [event.target.id]: event.target.value,
    }));
  };

  useEffect(() => {
    setDisabled(
      Object.values(newUser).every((value) => {
        return Boolean(value);
      }),
    );
  }, [newUser]);

  const signUp = async (user: User) => {
    await axios.post(`${apiUrl}/registrar`, user);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password,
      );

      newUser.uid = userCredentials.user.uid;

      signUp(newUser);
      showFeedback(accountSuccesFeedback, "success");
    } catch (error: unknown) {
      const message = "El correo electronico ya está registrado";

      showFeedback(message, "error");

      throw new Error(message);
    }
  };

  return (
    <form className="form-user" onSubmit={submitForm}>
      <div className="form-control">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          maxLength={100}
          value={newUser.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="text"
          id="email"
          maxLength={70}
          value={newUser.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={newUser.password}
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
          Registrar
        </Button>
      </div>
    </form>
  );
};

export default NewUserForm;
