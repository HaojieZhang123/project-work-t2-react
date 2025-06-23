
const Footer = () => {
    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-12 col-md-8 mb-3 mb-md-0">
                    <ul className='footer-list d-flex justify-content-between flex-wrap me-5'>
                        <li>
                            <a href="#">Privacy</a>
                        </li>
                        <li>
                            <a href="#">Contacts</a>
                        </li>
                        <li>
                            <a href="#">Recess rights</a>
                        </li>
                        <li>
                            <a href="#">Sell condition</a>
                        </li>
                        <li>
                            <a href="#">Compliance & Whistleblowing</a>
                        </li>
                        <li>
                            <a href="#">Cookie policy</a>
                        </li>
                    </ul>
                </div>

                <div className="col-12 col-md-4 d-flex justify-content-end pt-1">
                    <div className='text-end'>
                        &copy; 2025 Boolean Italia S.p.A.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
