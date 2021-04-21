import React, { useState } from 'react';
import { f7, Navbar, Page, List, ListInput, ListItem, Row, Col } from 'framework7-react';
import { signup } from '@/common/api';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast, sleep }  from '../../../js/utils.js';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required(""),
  email: Yup.string().email("").required(""),
  password: Yup.string().min(8, "8자 이상 입력해주세요").max(20, "길이가 너무 깁니다").required(""),
  password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required(""),
});

const SignUpPage = () => {
  return (
    <Page>
      <Navbar title="회원가입" backLink={true} sliding={false}></Navbar>
        <p className="font-semibole text-4xl text-center mt-5">GEMGEM</p>
        <Formik 
          initialValues={{ 
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await sleep(400);
            setSubmitting(false);
            f7.dialog.preloader('잠시만 기다려주세요...');
            try {
              (await signup({ user: values })).data;
              toast.get().setToastText('로그인 되었습니다.').openToast();
              location.replace('/')
            } catch(error) {
              f7.dialog.close();
              toast.get().setToastText(error?.response?.data || error?.message).openToast();
            }
          }}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, values, errors, touched, isSubmitting, isValid }) => 
          (
            <Form >
              <List noHairlinesMd>
                <div className="p-3 font-semibold bg-white">기본 정보</div>
                <ListInput
                  label={i18next.t('login.name')}
                  type="text"
                  name="name"
                  placeholder="이름을 입력해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  errorMessageForce={true}
                  errorMessage={touched.name && errors.name}
                />
                <ListInput
                  label={i18next.t('login.email')}
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  errorMessageForce={true}
                  errorMessage={touched.email && errors.email}
                />
                <ListInput
                  label={i18next.t('login.password')}
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  errorMessageForce={true}
                  errorMessage={touched.password && errors.password}
                />
                <ListInput
                  label={i18next.t('login.password_confirmation')}
                  type="password"
                  name="password_confirmation"
                  placeholder="비밀번호를 확인해주세요"
                  clearButton
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                  errorMessageForce={true}
                  errorMessage={touched.password_confirmation && errors.password_confirmation}
                />
              </List>
              <div className="p-4">
                <button 
                  type="submit" 
                  className="button button-fill button-large disabled:opacity-50" 
                  disabled={isSubmitting || !isValid}>
                  회원가입
                </button>
              </div>
            </Form>
          )}
        </Formik>
    </Page>
  );
};

export default SignUpPage;