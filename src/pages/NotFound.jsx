
const NotFound = () => {
    return (
        <>
            <div className="container">
                <div className="notFound-banner">
                    <img src="./public/not-found-banner.PNG" alt="Not Found Banner" className="notFound-banner-image" />
                </div>

                <div className='notFound-text'>
                    <h1>Oops! Something went wrong.</h1>
                    <h5 className='color-main-subtle'>We can't find the page you are looking for</h5>
                </div>

            </div>
        </>
    )
}

export default NotFound