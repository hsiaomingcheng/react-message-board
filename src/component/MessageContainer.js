import React from 'react';
import styled from 'styled-components';
import MessageItem from '../component/MessageItem';

export default class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const {messageList} = this.props;

        return (
            <MessageWrap>
                {
                    messageList.map((element, index) => {
                        return <MessageItem 
                            key={index}
                            id={element.id}
                            name={element.name} 
                            value={element.text} 
                            time={element.time}
                            responseArray={element.responseArray}
                        />
                    })
                }
            </MessageWrap>
        );
    }
}

const MessageWrap = styled.div`
    margin: 0 auto;
    padding: 10px;
    width: 500px;
    min-height: 300px;
`;