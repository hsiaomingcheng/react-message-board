import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../redux/action/message';
import styled from 'styled-components';
import InputBox from '../component/InputBox';
import MessageAtom from '../component/MessageAtom';

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isShowResponse: false,
        }

        this.handleSumbitMessage = this.handleSumbitMessage.bind(this);
        this.handleToggleResponse = this.handleToggleResponse.bind(this);
        this.handleEditMessage = this.handleEditMessage.bind(this);
    }

    handleSumbitMessage(e) {
        const { addMessage, messageList, id } = this.props;

        const cloneMessageList = Object.assign([], messageList);

        cloneMessageList.find((element) => {
            if (id === element.id) {
                element.responseArray = [
                    ...element.responseArray,
                    {
                        id: Date.now(),
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
        const {isShowResponse} = this.state;
        this.setState({isShowResponse: !isShowResponse});
    }

    handleEditMessage(e, isChild, id) {
        const { addMessage, messageList } = this.props;

        const cloneMessageList = Object.assign([], messageList);

        if (isChild) {
            cloneMessageList.map(list => {
                list.responseArray.find(childList => {
                    if (id === childList.id) {
                        childList.text = e.text;
                        childList.time = e.time;
                    }
                });
            });
        } else {
            cloneMessageList.find(list => {
                if (id === list.id) {
                    list.text = e.text;
                    list.time = e.time;
                }
            });
        }

        addMessage(cloneMessageList);
    }
    
    render(){
        const {responseArray, name, time, value, id} = this.props
        const {isShowResponse} = this.state;
        return (
            <MessageItemWrap>
                <MessageAtom id={id} name={name} time={time} value={value} onSubmitMessage={this.handleEditMessage} />

                {
                    responseArray && responseArray.map((element, index) => {
                        return (
                            <ResponseMessage key={index}>
                                <MessageAtom id={element.id} name={element.name} time={element.time} value={element.text} onSubmitMessage={this.handleEditMessage} isChild={true} />
                            </ResponseMessage>
                        );
                    })
                }
    
                <ResponseButton isShow={isShowResponse} onClick={this.handleToggleResponse}>發表回應</ResponseButton>

                {
                    isShowResponse && <InputBox isShowInputBox={this.handleToggleResponse} onSubmitMessage={this.handleSumbitMessage} />
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