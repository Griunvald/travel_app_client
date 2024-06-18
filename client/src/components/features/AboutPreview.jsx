import { useNavigate } from 'react-router-dom';
function AboutPreview({ about, leader }) {
  if (!about) return null;
  const navigate = useNavigate();

  const truncatedAbout = about.length > 70 ? `${about.substring(0, 70)}...` : about;

  const handleReadMoreClick = () => {
    navigate(`/public-profile/${leader}`, { state: { from: window.location.pathname } });
  };

  return (
    <div className="absolute w-80 p-4 bg-white border border-gray-300 shadow-lg z-50">
      <p>{truncatedAbout}</p>
      {about.length > 70 && (
       <button onClick={handleReadMoreClick} className="underline decoration-solid font-medium">Read more</button>
      )}
    </div>
  );
}

export default AboutPreview;

