function BlogList({ onBlogSelect }) {
    const [blogs, setBlogs] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch('http://localhost:3000/publications')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des blogs');
                }
                return response.json();
            })
            .then(data => {
                setBlogs(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="container-fluid">
                <div className="text-center p-5">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-fluid">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row px-3">
                {blogs.map((blog) => (
                    <BlogCard 
                        key={blog.id}
                        id={blog.id}
                        title={blog.titre}
                        description={blog.description}
                        author={blog.auteur}
                        date={blog.date}
                        content={blog.contenu}
                        onSelect={onBlogSelect}
                    />
                ))}
            </div>
        </div>
    );
}