import User from "../model/User";
import bcrypt from "bcrypt";

export const getHome = (req, res) => {
  const recipe = {
    title: "오징어 볶음",
    description: "쫄깃쫄깃 오징어와 매콤 달달 양념의 조화! 밥 두공기 뚝딱!",
    time: 20,
  };
  const ingredients = [
    {
      name: "감자",
      amount: "3개",
      freshPeriod: 1,
    },
    {
      name: "당근",
      amount: "1개",
      freshPeriod: 2,
    },
  ];
  return res.status(200).render("root/home", { recipe, ingredients });
};

export const getLogin = (req, res) => {
  return res.status(200).render("root/login");
};

export const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  // Email Exists Confrim
  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error", "존재하는 않는 이메일입니다.");
    return res.status(400).redirect("/login");
  }
  // password Confrim
  const passwordConfirm = await bcrypt.compare(password, user.password);
  if (!passwordConfirm) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    return res.status(400).redirect("/login");
  }
  // Log In and Sessiom Save
  req.session.loggedIn = true;
  req.session.user = user;
  return res.status(200).redirect("/");
};

export const getLogout = (req, res) => {
  // Log Out and Sessiom Destory
  req.session.destroy();
  return res.status(200).redirect("/");
};

export const getJoin = (req, res) => {
  return res.status(200).render("root/join");
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, confirmPassword, name },
  } = req;
  const emailExists = await User.exists({ email });
  // Email Exists Confrim
  if (emailExists) {
    req.flash("error", "이미 존재하는 이메일입니다.");
    return res.status(400).redirect("/join");
  }
  // Password Confrim
  if (password !== confirmPassword) {
    req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
    return res.status(400).redirect("/join");
  }
  // User Create
  try {
    await User.create({
      email,
      password,
      name,
    });
    req.flash("success", "FRESH RECIPES에 오신 걸 환영합니다");
    return res.status(200).redirect("/login");
  } catch (error) {
    req.flash("error", "허용되지 않는 경로입니다.");
    return res.status(404).redirect("/");
  }
};
