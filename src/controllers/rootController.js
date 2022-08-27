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
  return res.render("root/home", { recipe, ingredients });
};

export const getLogin = (req, res) => {
  return res.render("root/login");
};

export const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  // 이메일 존재 확인
  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error", "존재하는 않는 이메일입니다.");
    return res.redirect("/login");
  }
  // 비밀번호 일치 확인
  const passwordConfirm = await bcrypt.compare(password, user.password);
  if (!passwordConfirm) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    return res.redirect("/login");
  }
  // 로그인 및 세션저장
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const getLogout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getJoin = (req, res) => {
  return res.render("root/join");
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, confirmPassword, name },
  } = req;
  const emailExists = await User.exists({ email });
  // 이메일 중복 확인
  if (emailExists) {
    req.flash("error", "이미 존재하는 이메일입니다.");
    return res.redirect("/join");
  }
  // 비밀번호 확인
  if (password !== confirmPassword) {
    req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
    return res.redirect("/join");
  }
  // 유저 데이터 저장
  User.create({
    email,
    password,
    name,
  });
  req.flash("success", "FRESH RECIPES에 오신 걸 환영합니다");
  return res.redirect("/login");
};
