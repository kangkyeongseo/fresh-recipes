import User from "../model/User";

export const getUserDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id);
  return res.render("user/user-detail", { user });
};

export const getUserEdit = (req, res) => {
  return res.render("user/user-edit");
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
