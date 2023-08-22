import multer from "multer";
// Pug에서 사용하기 위해 res.locals에 session 정보를 저장합니다.
export const sessionMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.homeTitle = "Fresh Recipes";
  return next();
};
// req.session.loggedIn false일 떄 redirect 시킵니다.
export const UserOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    req.flash("error", "로그인 부탁 드립니다.");
    return res.redirect("/login");
  }
  next();
};
// req.session.loggedIn true 떄 redirect 시킵니다.
export const PublicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.redirect("/");
  }
  next();
};
// avatar 이미지를 업로드하기 위한 multer입니다.
export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: {
    fieldSize: 3000000,
  },
});
// thumbnail 이미지를 업로드하기 위한 multer입니다.
export const thumbUpload = multer({
  dest: "uploads/thumbs",
  limits: {
    fileSize: 3000000,
  },
});
