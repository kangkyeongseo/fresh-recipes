export const getUserDetail = (req, res) => {
  const {
    params: { id },
  } = req;
  const user = {
    id,
    name: "kks",
    ingredients: [
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
    ],
    recipes: [
      {
        title: "오징어 볶음",
        description: "쫄깃쫄깃 오징어와 매콤 달달 양념의 조화! 밥 두공기 뚝딱!",
        time: 20,
      },
    ],
    likeRecipes: [
      {
        title: "연어장 덮밥",
        description: "부드럽고 고소한 연어와 짭쪼름한 간장의 조화!",
        time: 90,
      },
    ],
  };

  return res.render("user/user-detail", { user });
};

export const getUserEdit = (req, res) => res.send("user-edit");
