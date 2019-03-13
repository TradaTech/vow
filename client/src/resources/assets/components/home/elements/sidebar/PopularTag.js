import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

const tagslist = ['love', 'travel', 'honeymoon', 'relax', 'sweet']

class PopularTag extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  showTags = () => {
    if(tagslist && tagslist.length > 0){
      const show = tagslist.map((item, index) => {
        return(
          <label key={index}>#<input className="tags_item" type="button" value={item} onClick={() => this.searchTags(item)}/></label>
        )
      })
      return show;
    }
  }

  searchTags = (tags) => {
    axios.get(`/api/memory/list?proposeId=0&tags.includes=${tags}`)
    .then(res => {
      PubSub.publish('filterTasg', res.data.data)
    })
    
  }
  
  render() {
    return (
      <div className="popular_tags">
        <h3 className="title title_promises">Popular Tag</h3>
        <div className="popular_tags__list">
          { this.showTags() }
        </div>
      </div>
    );
  }
}

export default PopularTag;