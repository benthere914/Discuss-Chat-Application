import { Link } from 'react-router-dom';

import './PageNotFound.css'

function PageNotFound() {
    return (
        <div className="container404">
            <div className="content404">
                <div className="left404">
                    <img className="header404" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636753081/Discuss/404header_awbxwd.png" alt="404 Header" />
                    <h2>WIZARDS BEHIND CURTAINS?</h2>
                    <p>That's so 1939. Discuss is secretly powered by quantum robot hamsters. Technology is wild, isn't it? Anyway, you look lost. Here are a few suggested pages.</p>
                    <div className="suggestedPages">
                        <Link to="/channels">Home</Link>
                        <Link to="/guild-discovery">Search</Link>
                    </div>
                </div>
                <img className="img404" id="pageNotFound404" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636750819/Discuss/404_wivlju.png" alt="Page Not Found" />
            </div>
        </div>
    )
}

export default PageNotFound;
