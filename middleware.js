import multer from "multer";

export const sessionMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.homeTitle = "Fresh Recipes";
  return next();
};

export const UserOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    req.flash("error", "로그인 부탁 드립니다.");
    return res.redirect("/login");
  }
  next();
};

export const PublicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.redirect("/");
  }
  next();
};

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: {
    fieldSize: 3000000,
  },
});

export const thumbUpload = multer({
  dest: "uploads/thumbs",
  limits: {
    fileSize: 3000000,
  },
});
