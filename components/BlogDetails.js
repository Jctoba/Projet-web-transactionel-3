function BlogDetails(props) {
    const { blogId } = props;
    const [blog, setBlog] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const commentListRef = React.useRef();

    React.useEffect(() => {
        if (!blogId) {
            setError('ID du blog non défini');
            setIsLoading(false);
            return;
        }

        fetch(`http://localhost:3000/publications/${blogId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du blog');
                }
                return response.json();
            })
            .then(data => {
                setBlog(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [blogId]);

    const handleCommentAdded = () => {
        // Rafraîchir la liste des commentaires
        if (commentListRef.current) {
            commentListRef.current.refreshComments();
        }
    };

    if (isLoading) {
        return (
            <div className="modal-content p-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="modal-content p-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="modal-content p-4">
                <div className="alert alert-warning" role="alert">
                    Blog non trouvé
                </div>
            </div>
        );
    }

    return (
        <div className="modal-content p-4">
            <h5 className="modal-title text-dark">{blog.titre}</h5>
            <div className="modal-date text-secondary">{blog.date}</div>
            
            <div className="modal-body text-dark">
                <p><strong>Auteur :</strong> {blog.auteur}</p>
                <p>{blog.contenu}</p>
                {blog.img && (
                    <img 
                        src={blog.img} 
                        alt={blog.alt || 'Image du blog'} 
                        className="img-fluid mb-3"
                    />
                )}
            </div>
            
            <CommentList ref={commentListRef} blogId={blogId} />
            <AddComment blogId={blogId} onCommentAdded={handleCommentAdded} />

            <div className="modal-footer mt-3">
                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={props.onClose}
                >
                    Fermer
                </button>
            </div>
        </div>
    );
}
