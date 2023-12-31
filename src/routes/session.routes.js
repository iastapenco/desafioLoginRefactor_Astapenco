import { Router } from "express";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.get("/login", async (req, res) => {
  res.render("login", {
    js: "session.js",
  });
});

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send({ mensaje: "Usuario inválido" });
      }
      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };
      const userWithoutPassword = req.user.toObject();
      delete userWithoutPassword.password;

      res.status(200).send({ payload: userWithoutPassword });
    } catch (error) {
      return res
        .status(500)
        .send({ mensaje: `Error al iniciar sesión: ${error} ` });
    }
  }
);

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  async (req, res) => {
    res.status(200).send({ mensaje: "Usuario registrado" });
  }
);

sessionRouter.get(
  "/githubCallback",
  passport.authenticate("github"),
  async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: "Usuario logueado" });
  }
);

sessionRouter.post(
  "/register",
  passport.authenticate("register"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).send({ mensaje: "Usuario ya existente" });
      }

      res.status(200).send({ mensaje: "Usuario registrado" });
    } catch (error) {
      return res
        .status(500)
        .send({ mensaje: `Error al registrar usuario: ${error} ` });
    }
  }
);

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    res.status(200).send({ mensaje: "Usuario registrado" });
  }
);

sessionRouter.get(
  "/githubCallback",
  passport.authenticate("github"),
  async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: "Usuario logueado" });
  }
);

sessionRouter.get("/logout", async (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.json({ res: "ok" });
});

export default sessionRouter;
