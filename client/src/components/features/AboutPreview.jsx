import Link from '../common/Link';

function AboutPreview({ about, leader }) {
  if (!about) return null;

  const truncatedAbout = about.length > 70 ? `${about.substring(0, 70)}...` : about;

  return (
    <div className="absolute w-80 p-4 bg-white border border-gray-300 shadow-lg z-50">
      <p>{truncatedAbout}</p>
      {about.length > 70 && (
        <Link name="Read more" path={`/public-profile/${leader}`} />
      )}
    </div>
  );
}

export default AboutPreview;

