import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './RelatedVideosComponent.css'
import { PiBarbellLight } from "react-icons/pi";



const RelatedVideosComponent = ({ exerciseName }) => {

const [videos, setVideos] = useState([]);

useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: 'snippet',
              q: `${exerciseName} ejercicio tutorial`,
              type: 'video',
              maxResults: 4,
              key: 'AIzaSyCPgUyEjwbFVtyHsah7B74yJB-V87isu9U',
              order: 'relevance',
              videoDuration:'medium'
            }
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos from YouTube', error);
      }
    };

    fetchVideos();
  }, [exerciseName]);

  return (
    <div>
    <div className="videos-grid">
      {videos.map((video) => (
        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noreferrer">
            <div key={video.id.videoId} className="video-card">
                <div className="video-card-thumbnail">
                    <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                </div>
                <div className="video-card-specs">
                    <h3>{video.snippet.title}</h3>
                    <h4>{video.snippet.channelTitle}</h4>
                </div>
                <div className="video-card-logo">
                <PiBarbellLight size={50} color='#0099ff'/>
                </div>
            </div>
        </a>
      ))}
    </div>
  </div>
  )
}

export default RelatedVideosComponent