import React from "react";
import { useEffect } from "react";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Storage from '../utils/localStorage';


import axios from 'axios';

const Payment = () => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const requestPay = () => {
    const { IMP } = window;
    IMP.init('imp18142323');

    IMP.request_pay({
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: '테스트 상품',
      amount: 104,
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
        if (rsp.paid_amount === 104) {
          alert('결제 성공');
        } else {
          alert('결제 실패');
        }
      } catch (error) {
        console.error('Error while verifying payment:', error);
        alert('결제 실패1');
      }
    });
  };

  return (
    <div>
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default Payment;