import React from 'react'

const Footer = () => {
    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-12 col-md-8 mb-3 mb-md-0">
                    <ul className='footer-list d-flex justify-content-between flex-wrap me-5'>
                        <li>Privacy</li>
                        <li>Contacts</li>
                        <li>Recess rights</li>
                        <li>Sell condition</li>
                        <li>Compliance & Whistleblowing</li>
                        <li>Cookie policy</li>
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
