import User from "../model/User";
import bcrypt from "bcrypt";

export const getUserDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  // params id로 user 찾기
  const user = await User.findById(id);
  return res.render("user/user-detail", { user });
};

export const getUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  // params id로 user 찾기
  const user = await User.findById(id);
  return res.render("user/user-edit", { user });
};

export const postUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { name },
  } = req;
  // params id로 user 수정하기
  await User.findByIdAndUpdate(id, {
    name,
  });
  // user detail redirect
  return res.redirect(`/user/${id}`);
};

export const getUserPasswordEdit = (req, res) => {
  return res.render("user/user-password-change");
};

export const postUserPasswordEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  const user = await User.findById(id);

  const passwordConfirm = await bcrypt.compare(oldPassword, user.password);
  if (!passwordConfirm) {
    req.flash("error", "현재 비밀번호가 일치하지 않습니다.");
    return res.redirect(`/user/${id}/password`);
  }
  if (newPassword !== newPasswordConfirm) {
    req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
    return res.redirect(`/user/${id}/password`);
  }
  req.flash("success", "비밀번호 변경되었습니다.");
  return res.redirect(`/user/${id}/edit`);
};

export const getUserIng = (req, res) => {
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
  return res.render("user/user-ing", { ingredients });
};

export const getUserRecipe = (req, res) => {
  const recipes = [
    {
      title: "오징어 볶음",
      description: "쫄깃쫄깃 오징어와 매콤 달달 양념의 조화! 밥 두공기 뚝딱!",
      time: 20,
    },
  ];
  return res.render("user/user-recipes", { recipes });
};
