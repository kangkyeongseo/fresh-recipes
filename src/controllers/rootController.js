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
  console.log(ingredients);
  return res.render("root/home", { recipe, ingredients });
};

export const getLogin = (req, res) => {
  return res.render("root/login");
};

export const getLogout = (req, res) => res.send("logout");

export const getJoin = (req, res) => res.send("join");
