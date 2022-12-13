const Message = ({ mine , name, mes }) => {
    return mine ? (
        <p className="message-owner">
            <div className="message-content">{mes}</div>
            <div>{name}</div>
        </p>
    ) : (
        <p className="message-user">
            <div>{name}</div>
            <div className="message-content">{mes}</div>
        </p>
    );
};

export default Message;
