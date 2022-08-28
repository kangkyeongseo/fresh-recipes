export const sessionMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.homeTitle = "Fresh Recipes";
  next();
};
