/**
 * Middleware que verifica si el usuario ha iniciado sesión.
 * Si está autenticado, permite continuar con la solicitud.
 * De lo contrario, redirige al usuario a la página de inicio de sesión.
 */
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/iniciarSesion");
  }
};

/**
 * Middleware que verifica si el usuario es un superUsuario o administrador.
 * Si es así, permite continuar con la solicitud.
 * De lo contrario, redirige al usuario a la página de inicio de sesión y registra un intento de acceso no autorizado.
 */
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

/**
 * Middleware que verifica si el usuario es de recursos humanos (rh).
 * Si es así, permite continuar con la solicitud.
 * De lo contrario, redirige al usuario a la página de inicio de sesión y registra un intento de acceso no autorizado.
 */
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

/**
 * Middleware que verifica si el usuario es un superUsuario, recursos humanos (rh) o administrador.
 * Si es así, permite continuar con la solicitud.
 * De lo contrario, redirige al usuario a la página de inicio de sesión y registra un intento de acceso no autorizado.
 */
const requireSuperUserOrRH = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.type === "superUsuario" || req.session.user.type === "rh" || req.session.user.type === "administrador")
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

/**
 * Middleware que verifica si el usuario es un usuario, recursos humanos (rh) o superUsuario.
 * Si es así, permite continuar con la solicitud.
 * De lo contrario, redirige al usuario a la página de inicio de sesión y registra un intento de acceso no autorizado.
 */
const requireUserOrRH = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.type === "usuario" || req.session.user.type === "rh" || req.session.user.type === "superUsuario")
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

// Exportar los middlewares para su uso en otras partes de la aplicación
export { requireAuth, requireRH, requireSuperUser, requireSuperUserOrRH, requireUserOrRH };
