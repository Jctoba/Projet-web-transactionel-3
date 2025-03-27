function CommentList(props) {
    const { blogId } = props;
    const [comments, setComments] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (!blogId) {
            setError('ID du blog non défini');
            setIsLoading(false);
            return;
        }

        fetch(`http://localhost:3000/comments?postId=${blogId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des commentaires');
                }
                return response.json();
            })
            .then(data => {
                setComments(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [blogId]);

    // Fonction pour rafraîchir les commentaires
    const refreshComments = () => {
        setIsLoading(true);
        fetch(`http://localhost:3000/comments?postId=${blogId}`)
            .then(response => response.json())
            .then(data => {
                setComments(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return (
            <div className="text-center my-3">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="comments-section mt-4">
            <h6>Commentaires ({comments.length})</h6>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    author={comment.auteur}
                    content={comment.contenu}
                    date={comment.date}
                />
            ))}
        </div>
    );
}
