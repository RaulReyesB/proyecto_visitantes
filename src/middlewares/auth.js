const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/iniciarSesion");
  }
};

// Middleware para verificar si el usuario es un superUsuario o administrador
const requireSuperUser = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.type === "superUsuario" ||
      req.session.user.type === "administrador")
  ) {
    next();
  } else {
    const userName = req.session.user ? req.session.user.name : "Desconocido";
    const userType = req.session.user ? req.session.user.type : "Desconocido";

    console.log(
      `Intento de acceso no autorizado a la página de historial por parte del usuario: ${userName} y es de tipo: ${userType}`
    );

    res.redirect("/iniciarSesion");
  }
};

// Middleware para verificar si el usuario es de recursos humanos (rh)
const requireRH = (req, res, next) => {
  if (req.session.user && req.session.user.type === "rh") {
    next();
  } else {
    const userName = req.session.user ? req.session.user.name : "Desconocido";
    const userType = req.session.user ? req.session.user.type : "Desconocido";

    console.log(
      `Intento de acceso no autorizado a una página de recursos humanos por parte del usuario: ${userName} y es de tipo: ${userType}`
    );

    res.redirect("/iniciarSesion");
  }
};

// Middleware para verificar si el usuario es un superUsuario o rh
const requireSuperUserOrRH = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.type === "superUsuario" || req.session.user.type === "rh")
  ) {
    next();
  } else {
    const userName = req.session.user ? req.session.user.name : "Desconocido";
    const userType = req.session.user ? req.session.user.type : "Desconocido";

    console.log(
      `Intento de acceso no autorizado por parte del usuario: ${userName} y es de tipo: ${userType}`
    );

    res.redirect("/iniciarSesion");
  }
};

// Middleware para verificar si el usuario es un usuario o rh
const requireUserOrRH = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.type === "usuario" || req.session.user.type === "rh")
  ) {
    next();
  } else {
    const userName = req.session.user ? req.session.user.name : "Desconocido";
    const userType = req.session.user ? req.session.user.type : "Desconocido";

    console.log(
      `Intento de acceso no autorizado por parte del usuario: ${userName} y es de tipo: ${userType}`
    );

    res.redirect("/iniciarSesion");
  }
};


export { requireSuperUser, requireAuth, requireRH, requireSuperUserOrRH, requireUserOrRH };
