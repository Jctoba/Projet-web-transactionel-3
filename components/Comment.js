function Comment(props) {
    const { author, content, date } = props;
    
    return (
        <div className="comment mb-3 p-3 border-bottom bg-light">
            <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="mb-0 text-dark">{author}</h6>
                <h6 className="text-secondary">{date}</h6>
            </div>
            <p className="mb-0 text-dark">{content}</p>
        </div>
    );
}