import React from "react"

const Footer = () => <footer className="page-footer font-small pt-4">
    <div className="container-fluid text-center text-md-left footer">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">BookJacker</h5>
                <p>
                “A room without books is like a body without a soul.”
― Marcus Tullius Cicero</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Support</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Contact</a></li>
                    <li><a href="#!">FAQS</a></li>
                    <li><a href="#!">Terms And Condition</a></li>
                    <li><a href="#!">Privacy</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">BookJacker</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">About Us</a></li>
                    <li><a href="https://www.facebook.com/CrazyHaider">Tanvir Ahmed</a></li>
                    <li><a href="https://www.facebook.com/mishurahman70">Mishu Rahman</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2022: BookJacker
        <a href="#"> </a>
    </div>

</footer>

export default Footer