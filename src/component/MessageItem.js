import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../redux/action/message';
import styled from 'styled-components';
import InputBox from '../component/InputBox';

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isShowResponse: false,
        }

        this.handleSumbitMessage = this.handleSumbitMessage.bind(this);
        this.handleToggleResponse = this.handleToggleResponse.bind(this);
    }

    handleSumbitMessage(e) {
        const { addMessage, messageList, id } = this.props;

        const cloneMessageList = Object.assign([], messageList);

        cloneMessageList.find((element, index) => {
            if (id === index) {
                element.responseArray = [
                    ...element.responseArray,
                    {
                        name: e.name,
                        text: e.text,
                        time: e.time,
                    }
                ]
            }
        });

        addMessage(cloneMessageList);
    }

    handleToggleResponse() {
        const { isShowResponse } = this.state;
        this.setState({ isShowResponse: !isShowResponse });
    }

    render() {
        const { name, time, value, responseArray } = this.props
        const { isShowResponse } = this.state;
        return (
            <MessageItemWrap>
                <Info><span>{name}</span> 在 {time} 發佈了這則訊息</Info>
                <Message>{value}</Message>

                {
                    responseArray && responseArray.map((element, index) => {
                        return (
                            <ResponseMessage key={index}>
                                <Info><span>{element.name}</span> 在 {element.time} 回覆了這則訊息</Info>
                                <Message>{element.text}</Message>
                            </ResponseMessage>
                        );
                    })
                }

                <ResponseButton isShow={isShowResponse} onClick={this.handleToggleResponse}>發表回應</ResponseButton>

                {
                    isShowResponse && <InputBox onSubmitMessage={this.handleSumbitMessage} />
                }
            </MessageItemWrap>
        );
    }
}

const mapStateToProps = (state) => ({
    messageList: state.messageList,
});

const mapDispatchToProps = (dispatch) => ({
    addMessage: (e) => { dispatch(addMessage(e)); },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageItem);

const ResponseButton = styled.div`
    display: inline-block;
    margin-bottom: ${props => props.isShow && '15px'};
    max-width: 80px;
    height: 30px;
    cursor: pointer;
    color: #00A0E9;
    font-size: 14px;
    line-height: 30px;
    user-select: none;

    &:hover {
        color: #37C0FF;
    }
`;

const ResponseMessage = styled.div`
    margin: 5px 0 0 40px;
`;

const Info = styled.p`
    color: #666;
    font-size: 14px;

    span {
        color: #00A0E9;
        font-weight: bold;
    }
`;

const Message = styled.pre`
    margin: 0;
    padding: 10px 0;
    color: #303233;
    font-size: 16px;
`;

const MessageItemWrap = styled.div`
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 5px;
    background: #E6E6E6;
    width: 500px;
    box-sizing: border-box;

    p {
        margin: 0;
    }
`;