
# 💎 GEMGEM

**React와 Ruby On Rails로 구현한 보석 대여 쇼핑몰**
- **프로젝트 기간** : 2021.04.05 ~ 2021.04.29

> ## Project Stack
### Client

Following items are core frontend technologies used in this project:
- React / React Hooks
- Recoil
- JavaScript(ES6+)
- Framework7
- Tailwind CSS
- Yup, Formik
- HTML5, CSS3

### Server

Following items are core backend technologies used in this project:
- Ruby On Rails
- PostgreSQL


## 👀 구현 사항
![](https://images.velog.io/images/sunaaank/post/67185337-9afd-46c0-9cf0-96462cdd96f3/view.gif)

### 🎁 Item List Page
> ✅ 스크롤 시 상단 툴바 숨기기
✅ 카테고리 별 상품 보여주기

![](https://images.velog.io/images/sunaaank/post/18d88d9e-4792-4e90-b91b-ee3c2202abc0/productcart.gif)


- 같은 `대분류 카테고리`에 해당되는 잼들은 공통의 테마색상을 가지고 있습니다.
- 화면에서 보실 수 있듯이, 액티브레코드는 검정계열, 레일즈플러그인은 적색 계열입니다. 
- 해당 칩을 클릭하면 상단의 칩들이 `카테고리`의 테마컬러으로 변경되도록 구현하였습니다.
- 상품 리스트에서는 `상품 이름`과 `가격`, `소분류 카테고리명`을 표시하고 있습니다.

### 🎁 Item Detail Page
> ✅ 깃허브 주소 이동
✅ 인스톨 코드 복사 기능
✅ 장바구니 담기 시 로그인 여부/대여기간 필수 입력/이미 담긴 상품인지 체크 후 안내
✅  상품 옵션 조정

- 상세페이지 상단에서는 해당 상품의 이미지와 잼의 `깃허브 주소`, `인스톨 코드` 정보가 들어있습니다.
- `깃허브 아이콘`을 클릭하면, 앱 밖 시스템 브라우저를 띄워주며, 외부 브라우저에서 해당 주소로 이동합니다.
- `문서 아이콘`을 클릭하면, 잼의 인스톨 코드를 간편하게 복사할 수 있습니다.


- 잼은 한 번에 한 개의 제품만 대여할 수 있도록 제한하여, 별도의 수량 선택 옵션은 없습니다.
- 오늘 기준으로 `대여 시작일`을 선택할 수 있고, 당일 대여가 가능하도록 설정하여, `대여 반납일`은 대여 시작일 이후부터 가능합니다.
- 만약 로그인을 하지 않은 상태라면, 구매하기 버튼을 클릭할 때 `로그인 요청` 창이 뜹니다. 확인을 클릭하면 바로 로그인 화면으로 이동할 수 있습니다.
- `구매하기 버튼`은 화면의 하단에 고정되도록 하여, 페이지에서 보고 있는 위치가 어디든 상관없이 바로 편리하게 구매를 할 수 있도록 하였습니다.

### 🛒 Cart Page
> ✅ 장바구니 상품 삭제
✅  장바구니 상품 합계 계산(30000원 이상 배송비 3000원 포함)
✅  장바구니 담긴 상품 없을 시 상품 페이지로 유도
✅ Recoil을 사용한 전역상태관리

![](https://images.velog.io/images/sunaaank/post/4dabc0e6-c4ee-4171-825a-f4d70096d77b/cartdelete.gif)

### 🧐 Search Page
> ✅ 상품 검색 기능

![](https://images.velog.io/images/sunaaank/post/351b54a6-e16a-4e95-a087-7418a8f2ebda/search.gif)

### 🚛 Order Page
> ✅ 고객정보 DB 회원정보 연동, 수정 가능
✅ 결제하기, 결제 수단 옵션 선택

![](https://images.velog.io/images/sunaaank/post/3a542099-d9a4-4baf-83ae-2e69693972d3/order2.gif)
