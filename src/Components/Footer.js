import React, {Component} from 'react'

export default class Footer extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="footer-main-container">
                <p className="footer-credit">UI/UX:  <a
                    href="https://www.linkedin.com/in/anienglish/"
                    rel="noopener noreferrer"
                    target="_blank">Anita English</a>
                </p>
                <p className="footer-credit">Website: <a
                    href="https://www.linkedin.com/in/zach-springer/"
                    rel="noopener noreferrer"
                    target="_blank">Zachary Springer</a></p>
            </div>
        )
    }
}

