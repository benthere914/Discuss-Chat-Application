import React from 'react';
import './guildDiscovery.css'

const GuildDiscovery = () => {
  return (
      <div className="mainSearchContent">
          <div className="topSearchBG">
            <div className="topSearchContent">
              <h3>Find your community on Discuss</h3>
              <h5>From gaming, to music, to learning, there's a place for you.</h5>
                <form>
                  <div className="searchGuildForm">
                    <input
                    className="searchInput"
                    type="text"
                    placeholder="Explore communities"
                    />
                    <button className="searchCompassButton">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </form>
            </div>
            <img className="searchBGImage" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636571660/Discuss/guildDiscovery_joyfnj.png" alt ="Search BG"/>
          </div>
          <div className="featuredContainer">
            <h4>
              Featured communities
            </h4>
          </div>
      </div>
  );
}

export default GuildDiscovery;
