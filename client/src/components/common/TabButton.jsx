function TabButton({ tabName, setActiveTab, activeTab }) {
  const baseClasses = 'max-w-max px-8 py-2 text-base font-medium bg-inherit text-gray-900';
  const activeClasses = activeTab === tabName ? 'underline decoration-solid' : '';

  return (
    <button 
      className={`${baseClasses} ${activeClasses}`}
      onClick={() => setActiveTab(tabName)}
    >
      {tabName}
    </button>
  );
}

export default TabButton;

