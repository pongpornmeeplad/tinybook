import React, { useEffect, useState } from 'react';
import axios from 'axios';
import zlib from 'react-zlib-js'
function AlbumPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getTimestampPlusOneYear = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000);  // Get current Unix timestamp
    const oneYearInSeconds = 365 * 24 * 60 * 60;  // One year in seconds (365 days)
    return currentTimestamp + oneYearInSeconds;  // Add one year to the current timestamp
};

// Generate the future timestamp (current + 1 year)
const futureTimestamp = getTimestampPlusOneYear();
  useEffect(() => {
    // Function to fetch Instagram images
    const fetchInstagramImages = async () => {
      try {
       

        // Making request to Instagram API
        const targetUrl = 'http://localhost:7221/instagram-images';
        
        const response = await axios.get(targetUrl)
        
        
        // Handle compressed responses


        // Parse the response

        // Extract images from the response
        console.log('response', response)
        const fetchedImages = response?.data?.data.top?.sections.flatMap(section => 
          section.layout_content.medias?.map(mediaItem => ({
            src: mediaItem?.media?.image_versions2?.candidates?.[0]?.url || '',  // Ensure a valid URL
            alt: mediaItem?.media?.accessibility_caption || 'Instagram Image',  // Provide a default alt text
          })) || []  // Return an empty array if `medias` is undefined
        );
        
        console.log('fetchedImages', fetchedImages)
        setImages(fetchedImages || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Instagram images:', error);
        setError('Error fetching images.');
        setLoading(false);
      }
    };

    fetchInstagramImages();
  }, []);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#510808",
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      fontFamily: "'Kanit', sans-serif",
      position: 'relative',
      alignItems: "center"
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px',
        backgroundColor: '#4b0d0d',
        width: '100%',
        maxWidth: '1000px',
        boxSizing: "border-box",
        padding: "1rem",
        marginInline: "auto",
        height: "100%",
        overflowY: "scroll"
      }}>
        {images.map((image, index) => (
          <div key={index} style={{
            gridRow: (index === 7 || index % 10 === 0) ? "span 2" : "auto"
          }}>
            <img  crossOrigin='anonymous'  style={{ width: "100%", height: "100%", objectFit: "cover" }} src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumPage;
