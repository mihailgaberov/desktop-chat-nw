import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Participants from "../Participants/Participants";
import Conversation from "../Conversation/Conversation";
import { fetchGroupConversations, getUsersList, init, login } from '../../actions';
import { readRecord } from '../../utils/localStorageService';
import "./ChatPane.css";

const ChatPane = ({ init, login, getUsersList, fetchGroupConversations, messages }) => {
    const [usersList, setUsersList] = useState([]);
    const [groupConversations, setGroupConversations] = useState([]);

    useEffect(() => {
        init().then(login(readRecord('username')).then(() => {
            getUsersList().then(usersList => setUsersList(usersList));
            fetchGroupConversations().then(conversationsData => setGroupConversations(conversationsData));
        }));
    }, [getUsersList, login, init, fetchGroupConversations]);

    useEffect(() => {
        setGroupConversations(messages);
    }, [messages]);
    return (
        <div className="chat-pane">
            <Participants list={usersList}/>
            <Conversation groupConversations={groupConversations} />
        </div>);
};

const mapStateToProps = (state) => ({
    messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
    init: () => dispatch(init()),
    login: (username) => dispatch(login(username)),
    getUsersList: () => dispatch(getUsersList()),
    fetchGroupConversations: () => dispatch(fetchGroupConversations())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPane);
