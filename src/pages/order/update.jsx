import {
  Block,
  BlockTitle,
  Button,
  Col,
  List,
  ListInput,
  ListItem,
  f7,
  Navbar,
  Page,
  Row,
} from "framework7-react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  cartDataState,
  orderDataState,
  userDataState,
} from "../../common/recoil.js";
import { getToken } from "../../common/auth";
import { toast, sleep } from "../../js/utils.js";
import { getOrder, updateOrder } from "../../common/api";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { lte } from "lodash-es";

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
  const userData = useRecoilValue(userDataState);
  const cartData = useRecoilValue(cartDataState);
  const orderData = useRecoilValue(orderDataState);

  let loggedIn = !!getToken().token;

  return (
    <Page name="order" noToolBar>
      <Navbar title="주문 정보" noHairline sliding={false} backLink="Back" />
      <BlockTitle className="mx-7 my-4 font-bold">주문상품 정보</BlockTitle>
      {loggedIn && (
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
            await updateOrder({
              order_id: orderData.id,
              receiver_name: values.receiver_name,
              receiver_phone: values.receiver_phone,
              zipcode: "12323",
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
            <Block className="mx-7">
              <List inlineLabels noHairlines className="mt-0">
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
            <Block className="mx-7">
              <List inlineLabels noHairlines className="mt-0">
                <ListInput
                  name="receiver_name"
                  label="수령인"
                  type="text"
                  placeholder="인썸니아"
                  value={values.receiver_name}
                  errorMessageForce={true}
                  errorMessage={touched.receiver_name && errors.receiver_name}
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></ListInput>
                <ListInput
                  name="address"
                  label="배송지"
                  type="text"
                  placeholder="서울특별시 성동구 성수일로 19"
                  value={values.address}
                  errorMessageForce={true}
                  errorMessage={touched.address && errors.address}
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></ListInput>
                <ListInput
                  name="receiver_phone"
                  label="연락처"
                  type="tel"
                  placeholder="010-1234-1234"
                  value={values.receiver_phone}
                  errorMessageForce={true}
                  errorMessage={touched.receiver_phone && errors.receiver_phone}
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></ListInput>
              </List>
            </Block>
            <Block strong className="mt-10 ml-7 mr-3 pb-7">
              <Row className="mb-3">
                <Col width="33" className="font-bold">
                  결제 수단
                </Col>
                <Col width="66" className="flex flex-row justify-start w-full">
                  <List className="p-0 mt-0 mr-4 w-full">
                    {PAYMENT_OPTIONS.map((option) => (
                      <ListItem
                        key={option.id}
                        className="col"
                        radio
                        radioIcon="start"
                        title={option.name}
                        value={option.name}
                        name="demo-radio-start"
                        defaultChecked={option.id === 1 && true}
                        onClick={() => setPaySelected(option.payment_type)}
                      ></ListItem>
                    ))}
                  </List>
                </Col>
              </Row>
            </Block>
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
          </form>
        )}
      </Formik>
    </Page>
  );
};
export default OrderPage;

const PAYMENT_OPTIONS = [
  { id: 1, name: "신용카드", payment_type: "credit_card" },
  { id: 2, name: "휴대폰 결제", payment_type: "phone" },
];
