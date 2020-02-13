/* eslint-disable array-callback-return */
import React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import ItemCard from './ItemCard';

import "./Items.scss";
import SessionDelete from "../common/SessionDelete";

export interface purchase {
    tradeNo:       number;
    tradeCategory: string;
    tradeTitle:    string;
    productName:   string;
    tradeArea:     string;
    productInfo:   string;
    productPrice:  string;
    tradeDate:     Date;
    ttradeImg:     TtradeImg[];
    buser:         User;
    tuser:         User;
    tmanner:       null;
}

export interface TtradeImg {
    imgNo:   number;
    tiTrade: number;
    orgImg:  string;
}

export interface User {
    userNo:         number;
    email:          string;
    password:       string;
    profileImg:     null;
    nickname:       string;
    userPermission: string;
    uarea:          Uarea[];
}

export interface Uarea {
    areaNo:  number;
    address: string;
    auser:   number;
}

class Purchase extends React.Component {
    state = {
        Purchases: Array<purchase>()
    }

    user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    componentDidMount() {
        axios({
            method: "get",
            url: "http://13.125.55.96:8080/mypage/buy",
            params: {
                email: this.user.email
            }
        }).then(res => {
            this.setState({
                Purchases: res.data.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="purchase">
                <SessionDelete></SessionDelete>
                <h3>구매 상품</h3>
                <div className="products">
                    {/* <div className="item">
                        <img
                            src="https://dnvefa72aowie.cloudfront.net/origin/article/202001/77120318A0EA8BE3F97C131D8758D2B5E452A0D37184FE594F75148386745E8A.jpg?q=82&s=300x300&t=crop"
                            alt="item1"
                        />
                    </div> */}
                    {this.state.Purchases ? 
                    <>
                        {this.state.Purchases.map((purchase, i) => {
                            if(i < 4){
                                return (
                                    <ItemCard image={purchase.ttradeImg} tradeTitle={purchase.tradeTitle} 
                                    productPrice={purchase.productPrice} />
                                )
                            }
                        })}
                    </>
                    :
                    <div className="item">
                        <h4>구매 상품이 없습니다.</h4>
                    </div>
                    }
                    <div className="product-more-wrapper">
                    <Link to="/purchase"><button className="btn-purchase-more">
                        <h3>+ 구매 상품 더보기</h3>
                    </button></Link>
                </div>
                </div>
            </div>
        );

    }
}

export default Purchase;
