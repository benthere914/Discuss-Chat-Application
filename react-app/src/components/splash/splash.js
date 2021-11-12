import React, { useEffect } from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './splash.css';

function SplashPage() {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (user) {
            history.push('/channels')
        }
    }, [user, history])

    if (user) {
        return <Redirect to="/channels" />;
    }

    return (
        <>
            <div className="homeTop">
                <header>
                    <NavLink to="/" className="mainIcon">
                        <div className="logoContainer">
                            <i id="discordIcon" className="fab fa-discord"></i>
                            <div className="discussName">Discuss</div>
                        </div>
                    </NavLink>
                    <NavLink to="/login" className="loginButton"><div>Login</div></NavLink>
                </header>
                <div className="topContent">
                    <h1>IMAGINE A PLACE...</h1>
                    <h2>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</h2>
                    <div className="loginSignUpButtons">
                        <NavLink to="/login" className="loginButton"><div>Login</div></NavLink>
                        <NavLink to="/sign-up" className="loginButton" id="signUpButton"><div>Sign Up for Discuss</div></NavLink>
                    </div>
                </div>
            </div>
            <div className="homeContent">
                <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636049154/Discuss/pic1_ou39z4.png" alt="Group Chat"/>
                <div className="homeContentWords">
                    <h3>Create an invite-only place where you belong</h3>
                    <h4>Discuss servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</h4>
                </div>
            </div>
            <div id="difBackColor">
                <div className="homeContent">
                    <div className="homeContentWords" id="shiftRight">
                        <h3>Where hanging out is easy</h3>
                        <h4>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</h4>
                    </div>
                    <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636049154/Discuss/pic2_mxvc9d.png" alt="Group Chat"/>
                </div>
            </div>
            <div className="homeContent">
                <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636049154/Discuss/pic3_fz7chc.png" alt="Group Chat"/>
                <div className="homeContentWords">
                    <h3>From few to a fandom</h3>
                    <h4>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</h4>
                </div>
            </div>
            <div className="bottomContent">
                <h3>RELIABLE TECH FOR STAYING CLOSE</h3>
                <h4>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</h4>
                <img id="vidChatImg" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/c_scale,w_1044/v1636054864/Discuss/pic_ip3qru.png" alt="Group Chat"/>
                <div className="readyDiv">
                    <h5>Ready to start your journey?</h5>
                </div>
                <NavLink to="/sign-up" className="readyButton"><div>Sign Up for Discuss</div></NavLink>
            </div>
            <footer>
            <div className="developers">
                    <div id="devLinks">
                        <a href="https://www.linkedin.com/in/kiara-mendaros-9761101b8/" target="_blank" rel="noreferrer">
                            <div className="footer-icon">
                                <i className="fab fa-linkedin"></i>
                            </div>
                        </a>
                        <a href="https://github.com/Keipara" target="_blank" rel="noreferrer">
                            <div className="footer-icon" id="githubIcon">
                                <i className="fab fa-github"></i>
                            </div>
                        </a>
                    </div>
                    <p>Kiara Mendaros</p>
                </div>
                <div className="developers">
                    <div id="devLinks">
                        <a href="https://www.linkedin.com/in/jackpercival7/" target="_blank" rel="noreferrer">
                            <div className="footer-icon">
                                <i className="fab fa-linkedin"></i>
                            </div>
                        </a>
                        <a href="https://github.com/JackPercival" target="_blank" rel="noreferrer">
                            <div className="footer-icon" id="githubIcon">
                                <i className="fab fa-github"></i>
                            </div>
                        </a>
                    </div>
                    <p>Jack Percival</p>
                </div>
                <div className="developers">
                    <div id="devLinks">
                        <a href="https://www.linkedin.com/in/valeria-reynoso-castellanos-b89210149/" target="_blank" rel="noreferrer">
                            <div className="footer-icon">
                                <i className="fab fa-linkedin"></i>
                            </div>
                        </a>
                        <a href="https://github.com/valeriareynososf" target="_blank" rel="noreferrer">
                            <div className="footer-icon" id="githubIcon">
                                <i className="fab fa-github"></i>
                            </div>
                        </a>
                    </div>
                    <p>Valeria Reynoso Castellanos</p>
                </div>
                <div className="developers">
                    <div id="devLinks">
                        <a href="https://www.linkedin.com/in/benjamin-rose-0a6880202/" target="_blank" rel="noreferrer">
                            <div className="footer-icon">
                                <i className="fab fa-linkedin"></i>
                            </div>
                        </a>
                        <a href="https://github.com/benthere914" target="_blank" rel="noreferrer">
                            <div className="footer-icon" id="githubIcon">
                                <i className="fab fa-github"></i>
                            </div>
                        </a>
                    </div>
                    <p>Benjamin Rose</p>
                </div>

            </footer>
        </>
    )
}

export default SplashPage;
