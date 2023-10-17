import React from "react";
import { useEffect } from "react";
//import { useDispatch } from "react-redux";
import Storage from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../constants/router';



import axios from 'axios';

const Payment = () => {
  const navigator = useNavigate();
  const chargePoint = Storage.getAmount();
  console.log("코드번호 : " + process.env.REACT_APP_IMP)
  console.log("충전금액 : " + chargePoint);
  useEffect(() => {
    requestPay();
    return () => {

    };
  }, []);

  const requestPay = () => {
    const { IMP } = window;
    IMP.init(`${process.env.REACT_APP_IMP}`);

    IMP.request_pay({
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: '캐롯선더충전',
      amount: chargePoint,
      buyer_email: 'test@test.com',
      buyer_name: '코드쿡',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시',
      buyer_postcode: '123-456',
    }, async (rsp) => {
      try {
        //TODO  : 결제완료후, 해당 결제 정보사항 DB에 저장하고, 현재 사용자 포인트 정보 업데이트 해야함
        //const { data } = await axios.post('http://localhost:8080/verifyIamport/' + rsp.imp_uid);
        console.log(rsp.paid_amount);
        console.log(chargePoint);
        if (rsp.paid_amount === parseInt(chargePoint)) {
          alert('결제 성공');
        } else {
          alert('결제 실패');
        }
        Storage.removeAmount();
        console.log("안타냐???");
        navigator(ROUTER.PATH.MYPAGE);
      } catch (error) {
        console.error('Error while verifying payment:', error);
        alert('결제 실패1');
        navigator(ROUTER.PATH.BACK);
      }



    });
  };
};

export default Payment;