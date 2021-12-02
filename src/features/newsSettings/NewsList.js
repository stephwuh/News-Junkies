import React from 'react';

const NewsList = (props) =>{

    
    return(
        <div className={props.type}>
          <h3>{props.type}</h3>
          {props.list &&
            props.list.map((source, index) => {
              return (
                <div key={index}>
                  <input type="checkbox" id={source.source} />
                  <label for={source.source}>{source.source}</label>
                </div>
              );
            })}
        </div>
    );
};

export default NewsList;