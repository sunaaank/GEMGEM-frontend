import {
  Block,
  BlockTitle,
  Button,
  Col,
  Checkbox,
  Icon,
  Link,
  List,
  ListInput,
  ListItem,
  PageContent,
  Radio,
  f7,
  Swiper,
  SwiperSlide,
  Toolbar,
  Tabs,
  Tab,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Row,
  Stepper,
  create,
} from "framework7-react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  cartDataState,
  cartTotalPriceState,
  orderDataState,
  userDataState,
} from "../common/recoil.js";
import { getToken } from "../common/auth";
import { toast, sleep } from "../js/utils.js";
import { getOrder, updateOrder } from "../common/api";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";

const phoneRegExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

const OrderSchema = Yup.object().shape({
  email: Yup.string().email().required("필수 입력사항 입니다"),
  name: Yup.string()
    .min(2, "길이가 너무 짧습니다")
    .max(20, "길이가 너무 깁니다")
    .required("필수 입력사항 입니다"),
  receiver_name: Yup.string()
    .min(2, "길이가 너무 짧습니다")
    .max(20, "길이가 너무 깁니다")
    .required("필수 입력사항 입니다"),
  receiver_phone: Yup.string()
    .matches(phoneRegExp, "정확한 연락처를 입력해주세요")
    .required("필수 입력사항 입니다"),
  address: Yup.string().required("필수 입력사항 입니다"),
});

const OrderPage = () => {
  const [paySelected, setPaySelected] = useState("credit_card");
  const [userData, setUserData] = useRecoilState(userDataState);
  const [cartData, setCartData] = useRecoilState(cartDataState);
  const [orderData, setOrderData] = useRecoilState(orderDataState);
  const [orderInput, setOrderInput] = useState({
    name: "",
    email: "",
    receiver_name: "",
    receiver_phone: "",
    address: "",
  });
  const [cartTotalPrice, setCartTotalPrice] = useRecoilState(
    cartTotalPriceState
  );
  let loggedIn = !!getToken().token;

  {
    loggedIn &&
      useEffect(() => {
        const fetchOrder = async () => {
          let res = await getOrder();
          if (!!res.data) {
            setOrderData(res.data);
          }
        };

        fetchOrder();
        console.log("주문데이터내놔order", orderData);
      }, [cartData]);
  }
  return (
    <Page name="order" noToolBar>
      <Navbar title="주문 정보" noHairline sliding={false} backLink="Back" />
      <BlockTitle className="mx-7 my-4 font-bold">주문상품 정보</BlockTitle>
      {cartData && (
        <Block>
          <List mediaList className="mx-4 mt-0">
            <ul className="ul flex flex-wrap">
              {cartData.map((lineitem, index) => (
                <ListItem
                  key={index}
                  title={lineitem.item.name}
                  subtitle={lineitem.total}
                  text={
                    <div className="flex flex-col">
                      <p>
                        {lineitem.rent_startdate}~{lineitem.rent_enddate}
                      </p>
                      <p>포장옵션: {lineitem.package_type}</p>
                    </div>
                  }
                  onClick={() => onClickItem(lineitem.item.id)}
                >
                  <img slot="media" width="90" src={lineitem.item.image_url} />
                </ListItem>
              ))}
            </ul>
          </List>
        </Block>
      )}

      <Formik
        initialValues={{
          name: userData.name,
          email: userData.email,
          receiver_name: "",
          receiver_phone: "",
          address: "",
        }}
        validationSchema={OrderSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await sleep(400);
          setSubmitting(false);
          f7.dialog.preloader("결제 중입니다");

          try {
            let res = await updateOrder({
              order_id: orderData.id,
              receiver_name: values.receiver_name,
              receiver_phone: values.receiver_phone,
              zipcode: "123423",
              address1: values.address,
              address2: "4층 인썸니아",
              order_status: "paid",
            });

            f7.dialog.close();
            toast("주문이 정상적으로 처리되었습니다");
            location.replace("/");
          } catch (error) {
            f7.dialog.close();
            toast(`${error?.response?.data || error?.message}`);
          }
        }}
        validateOnMount={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <BlockTitle className="mx-7 my-4 font-bold">고객 정보</BlockTitle>
            <Block className="mx-7 ">
              <List inlineLabels noHairlines className=" mt-0">
                <ListInput
                  name="name"
                  label="주문자 성함"
                  type="text"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  errorMessageForce={true}
                  errorMessage={touched.name && errors.name}
                  // onChange={(e) => onInputChange(e)}
                />

                <ListInput
                  name="email"
                  label="이메일"
                  type="email"
                  clearButton
                  // onChange={(e) => onInputChange(e)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  errorMessageForce={true}
                  errorMessage={touched.email && errors.email}
                />
              </List>
            </Block>
            <BlockTitle className="mx-7 my-4 font-bold">배송지 정보</BlockTitle>
            <Block className="mx-2">
              <List inlineLabels noHairlines className="mt-0">
                <ListInput
                  name="receiver_name"
                  label="수령인"
                  type="text"
                  placeholder="예) 인썸니아"
                  value={values.receiver_name}
                  errorMessageForce={true}
                  errorMessage={touched.receiver_name && errors.receiver_name}
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <Icon icon="demo-list-icon" slot="media" />
                </ListInput>
                <ListInput
                  name="address"
                  label="배송지"
                  type="text"
                  placeholder="예) 서울특별시 성동구 성수일로 19"
                  value={values.address}
                  errorMessageForce={true}
                  errorMessage={touched.address && errors.address}
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <Icon icon="demo-list-icon" slot="media" />
                </ListInput>
                <ListInput
                  name="receiver_phone"
                  label="연락처"
                  type="tel"
                  placeholder="예) 010-1234-1234"
                  value={values.receiver_phone}
                  errorMessageForce={true}
                  errorMessage={touched.receiver_phone && errors.receiver_phone}
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <Icon icon="demo-list-icon" slot="media" />
                </ListInput>
              </List>
            </Block>

            <BlockTitle className="mx-7 my-4 font-bold">결제 수단</BlockTitle>
            <Block className="mx-7">
              <List className=" mt-0">
                <ListItem
                  title="신용카드"
                  selected={paySelected === "credit_card"}
                  onClick={() => setPaySelected("credit_card")}
                ></ListItem>
                <ListItem
                  title="휴대폰 결제"
                  selected={paySelected === "phone"}
                  onClick={() => setPaySelected("phone")}
                ></ListItem>
                <ListItem
                  title="계좌이체"
                  selected={paySelected === "bank"}
                  onClick={() => setPaySelected("bank")}
                ></ListItem>
              </List>
              <div className="p-1">
                <Button
                  type="submit"
                  fill
                  large
                  className="button disabled:opacity-50"
                  disabled={isSubmitting || !isValid}
                  className="mb-10"
                >
                  결제하기
                </Button>
              </div>
            </Block>
          </form>
        )}
      </Formik>
    </Page>
  );
};
export default OrderPage;
