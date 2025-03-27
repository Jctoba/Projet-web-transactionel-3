function Blog() {
    const [selectedBlogId, setSelectedBlogId] = React.useState(null);

    const handleBlogSelect = (id) => {
        setSelectedBlogId(id);
    };

    return (
        <div className="container-fluid">
            {/* Barre de recherche et filtres */}
            <div className="p-4">
                <div className="row">
                    <div className="col-12 col-sm-10 col-md-8 mb-3 mb-sm-0">
                        <form role="search">
                            <input className="form-control w-100" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                    <div className="col-12 col-sm-2 col-md-4 d-flex align-items-center">
                        <span className="me-2">Triée par:</span>
                        <select name="Select" className="form-select w-100">
                            <option value="">Nom</option>
                            <option value="">Date</option>
                            <option value="">Numéro</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Liste des blogs ou détails d'un blog */}
            {selectedBlogId ? (
                <div className="modal fade show" 
                    style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setSelectedBlogId(null)}
                                ></button>
                            </div>
                            <BlogDetails blogId={selectedBlogId} />
                        </div>
                    </div>
                </div>
            ) : (
                <BlogList onBlogSelect={handleBlogSelect} />
            )}
        </div>
    );
}
