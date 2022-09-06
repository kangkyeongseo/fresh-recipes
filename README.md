# Fresh Recipes

---

## Project

---

> 1.냉장고 재료 관리

- 재료의 이름,종류,보관 장소 및 구입 시기를 지정
- 유통기한이 임박한 재료 알림
- 재료 전부 소진 시 구입 목록 추가 기능
- 재료의 소모, 추가 및 삭제

> 2.조리법 추가

- 조리법 추가, 수정 및 삭제

> 3.조리법 추천

- 보관중인 재료에 맞게 조리법 추천

> 4.조리법 공유

- 모든 유저의 조리법 목록
- 조리법 추천 및 코멘트

## Pages

---

> Root(/)

- 홈(/)
- 로그인(/login)
- 로그아웃(/logout)
- 회원가입(/join)

> User(/user)

- 유저 상세정보(/:id)
- 유저 상세정보 수정(/:id/edit)
- 현재 보관중인 재료(/:id/ingredients)
- 조리법 목록(/:id/recipes)

> Ingredient(/ingredient)

- 재료 추가(/add)
- 재료 검색(/search)
- 재료 상세 정보(/:id)
- 재료 수정(/:id/edit)
- 재료 삭제(/:id/delete)

> Recipe(/recipe)

- 조리법 추가(/add)
- 조리법 검색(/seach)
- 조리법 상세정보(/:id)
- 조리법 수정 (/:id/edit)
- 조리법 삭제 (/:id/delete)

> Sqare(/square)

- 모든 유저의 조리법 목록(/)
- 조리법 검색(/search)
