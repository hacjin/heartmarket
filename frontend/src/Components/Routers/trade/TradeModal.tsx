import React from "react";
import axios from "axios";
import "./TradeModal.scss";

interface Props {
    isOpen: boolean;
    close: any;
    email: string;
    tradeNo: number;
    bcandidate: Array<string>;
}

class TradeModal extends React.Component<Props> {
    state = {
        buser: "",
        isBuser: false,
        result: ''
    };

    selectbuser = (buser: string) => {
        if(buser){
            this.setState({
                buser: buser,
                isBuser: true,
                result: ''
            });
        }else{
            this.setState({
                buser: buser,
                isBuser: false,
                result: '구매자를 선택해주세요!'
            })
        }
        
    };

    complete = () => {
        if(this.state.isBuser){
            axios({
                method: "put",
                url: "http://13.125.55.96:8080/trade/complete",
                params: {
                    email: this.props.email,
                    other: this.state.buser,
                    tradeNo: this.props.tradeNo
                }
            })
                .then(res => {
                    this.props.close();
                    window.location.reload();
                })
                .catch(err => {
                    alert("거래 완료에 실패했습니다.");
                });

        }else{
            this.setState({
                result: "구매자를 선택해주세요!"
            })
        }
    };

    modalClose = () => {
        this.setState({
            buser: "",
            isBuser: false,
            result: ''
        });
        this.props.close();
    };
    componentDidMount() {
        // // console.log('modal userno',this.props.userNo);
    }

    render() {
        return (
            <div className="trade-modal">
                <React.Fragment>
                    {this.props.isOpen ? (
                        <>
                            <div className="Modal-overlay" onClick={this.modalClose} />
                            <div className="Modal">
                                <p className="title">
                                    거래 완료를 위해
                                    <br />
                                    구매자의 닉네임을
                                    <br />
                                    입력해주세요.
                                </p>
                                <div className="content">
                                    <select
                                        className="buser"
                                        onChange={e => this.selectbuser(e.target.value)}
                                    >
                                        <option value="" selected>
                                            구매자 고르기
                                        </option>

                                        {this.props.bcandidate.map(candi => {
                                            return <option value={candi}>{candi}</option>;
                                        })}
                                    </select>
                                    <div className="result">{this.state.result}</div>
                                </div>
                                <div className="button-wrap">
                                    <button onClick={this.complete}>거래 완료 하기</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </React.Fragment>
            </div>
        );
    }
}

export default TradeModal;