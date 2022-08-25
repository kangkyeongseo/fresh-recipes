export const getSquare = (req, res) => {
  const recipes = [
    {
      title: "오징어 볶음",
      description: "쫄깃쫄깃 오징어와 매콤 달달 양념의 조화! 밥 두공기 뚝딱!",
      time: 20,
    },
  ];
  return res.render("square/square-recipes", { recipes });
};

export const getSquareSearch = (req, res) => res.send("square search");
