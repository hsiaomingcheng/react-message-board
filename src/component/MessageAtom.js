import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../redux/action/message';
import styled from 'styled-components';
import InputBox from '../component/InputBox';

class MessageAtom extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isShowInputBox: false,
        }

        this.handleShowInputBox = this.handleShowInputBox.bind(this);
        this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
    }

    handleShowInputBox() {
        const {isShowInputBox} = this.state;
        this.setState({isShowInputBox: !isShowInputBox});
    }

    handleDeleteMessage() {
        const {addMessage, messageList, id, isChild} = this.props;

        const cloneMessageList = Object.assign([], messageList);

        if (isChild) {
            cloneMessageList.map((list, index) => {
                list.responseArray.find((childList, childIndex) => {
                    if (id === childList.id) {
                        cloneMessageList[index].responseArray.splice(childIndex, 1);

                        addMessage(cloneMessageList);

                        return childList;
                    }
                });
            });
        } else {
            cloneMessageList.find((list, index) => {
                if (id === list.id) {
                    cloneMessageList.splice(index, 1);

                    addMessage(cloneMessageList);

                    return list;
                }
            });
        }
    }

    render() {
        const {onSubmitMessage, id, name, time, value, isChild} = this.props;
        const {isShowInputBox} = this.state;
        return (
            <>
                <Info><span>{name}</span> 在 {time} 發佈了這則訊息</Info>
                <Message>{value}</Message>
                <HandleWrap>
                    <HandleButton onClick={this.handleShowInputBox}>編輯訊息</HandleButton>
                    <HandleButton onClick={this.handleDeleteMessage}>刪除訊息</HandleButton>
                </HandleWrap>
                {
                    isShowInputBox && <InputBox
                        isShowInputBox={this.handleShowInputBox}
                        onSubmitMessage={onSubmitMessage} 
                        id={id}
                        propsName={name} 
                        propsValue={value}
                        isChild={isChild}
                        isReset={false}
                    />
                }
            </>
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
)(MessageAtom);

const HandleButton = styled.div`
    margin-left: 10px;
    display: inline-block;
    max-width: 80px;
    height: 30px;
    cursor: pointer;
    color: #00A0E9;
    font-size: 14px;
    line-height: 30px;
    user-select: none;

    &:hover {
        color: #E90000;
    }
`;

const HandleWrap = styled.div`
    text-align: right;
`;

const Message = styled.pre`
    margin: 0;
    padding: 10px 0;
    color: #303233;
    font-size: 16px;
`;

const Info = styled.p`
    color: #666;
    font-size: 14px;

    span {
        color: #00A0E9;
        font-weight: bold;
    }
`;