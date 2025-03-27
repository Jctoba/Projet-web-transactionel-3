function AddComment(props) {
    const { blogId, onCommentAdded } = props;
    const [comment, setComment] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        setError(null);

        const newComment = {
            publicationId: blogId,
            contenu: comment,
            auteur: "Utilisateur", 
            date: new Date().toISOString()
        };

        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout du commentaire');
                }
                return response.json();
            })
            .then(data => {
                setComment('');
                setIsSubmitting(false);
                if (onCommentAdded) {
                    onCommentAdded(data);
                }
            })
            .catch(error => {
                setError(error.message);
                setIsSubmitting(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="form-group">
                <label htmlFor="commentText" className="text-dark">Nouveau commentaire</label>
                <textarea 
                    id="commentText"
                    className="form-control mb-3" 
                    placeholder="Écrire un commentaire..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
            </div>
            <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Envoi...' : 'Ajouter un commentaire'}
            </button>
        </form>
    );
}
