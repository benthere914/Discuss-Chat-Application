import React from 'react';
import './guildChannelBar.css'

const GuildChannelBar = () => {
  return (
      <div className=".channelNameHolder" id="guildChannelBar">
        <h3 className="serverName">Discover</h3>
        <div className="homeSearch">
            <div className="searchCompass">
                <i className="fas fa-compass"></i>
            </div>
            <h5>Home</h5>
        </div>
      </div>
  );
}

export default GuildChannelBar;
