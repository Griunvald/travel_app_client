function AboutPreview({ about }) {
  if (!about) return;
  return (
    <div className="absolute w-80 p-4 bg-white border border-gray-300 shadow-lg z-50">
      <p>{about}</p>
    </div>
  );
}

export default AboutPreview;
