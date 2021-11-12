import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchServer } from '../../store/search';
import { loadUserServers } from '../../store/server';
import ServerCard from './featuredServerCard';
import ServerSearchCard from './resultServerCard';

import './guildDiscovery.css'

const GuildDiscovery = () => {
  const dispatch = useDispatch();

  const results = useSelector(state => Object.values(state.search));
  const user = useSelector(state => state.session.user);
  const servers = useSelector(state => Object.values(state.servers));

  const [searchParameters, setSearchParamters] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDefault, setShowDefault] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [finalSearch, setFinalSearch] = useState('')
  const [finalResults, setFinalResults] = useState({})


  useEffect(() => {
    dispatch(searchServer('$$default$$'))

    if (user?.id) {
      dispatch(loadUserServers(user?.id)).then(() => setIsLoaded(true));
  }

    return () => {
        setIsLoaded(false)
    }

}, [dispatch, user])


const search = async (e) => {
  e.preventDefault();
  if (searchParameters.length === 0) {
    return;
  }

  //Clean the search parameters
  const finalParameters = searchParameters.split('%').join("%25").split(" ").join("%20")

  //Dispatch
  const theResults = await dispatch(searchServer(finalParameters))
  setFinalResults(Object.values(theResults));

  setFinalSearch(searchParameters)
  setShowDefault(false)
  setShowResults(true)
}

const handleClose = () => {
  dispatch(searchServer('$$default$$'))
  .then(() => setShowResults(false))
  .then(() => setSearchParamters(''))
  .then(() => setShowDefault(true))
}

  return (
      <div className="mainSearchContent">
        {isLoaded && (
          <>
            {showDefault && (
              <>
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
                          autoComplete="off"
                          value={searchParameters}
                          onChange={(e) => setSearchParamters(e.target.value)}

                          />
                          <button className="searchCompassButton" onClick={search}>
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </form>
                  </div>
                  <img className="searchBGImage" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636571660/Discuss/guildDiscovery_joyfnj.png" alt ="Search BG"/>
                </div>
                <div className="featuredContainer">
                    <h4>Featured communities</h4>
                    <div className="serverResultsContainer">
                      {results?.map((server, index) =>
                        <ServerCard user={user} server={server} userServers={servers} key={`server_${index}`}/>
                      )}
                    </div>
                </div>
            </>
            )}
            {showResults && (
              <>
                <div className="searchResultContainer">
                  <div className="topResultsBar">
                    <div className="backArrow" onClick={handleClose}>
                      <i className="fas fa-arrow-left"></i>
                    </div>
                    {results?.length === 1? (
                        <h3>{`1 community for "${finalSearch}"`}</h3>
                    ):(
                        <h3>{`${results?.length} communities for "${finalSearch}"`}</h3>
                    )}
                  </div>
                </div>
                <form>
                  <div className="searchGuildForm" id="searchAgainForm">
                    <input
                    className="searchInput"
                    id="searchAgainInput"
                    type="text"
                    placeholder="Explore communities"
                    autoComplete="off"
                    value={searchParameters}
                    onChange={(e) => setSearchParamters(e.target.value)}

                    />
                    <button className="searchCompassButton" onClick={search}>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="serverActualResultsContainer">
                  {results?.length === 0? (
                    <div className="noResultsContainer">
                      <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636603006/Discuss/noResults_fle95m.png" alt="No Results" />
                      <h5>No results found</h5>
                      <h6>Try searching for something else.</h6>
                    </div>
                  ) : (
                    <>
                      {finalResults?.map((server, index) =>
                        <ServerSearchCard user={user} server={server} userServers={servers} key={`result_${index}`}/>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
  );
}

export default GuildDiscovery;
