import { Children } from 'react';

function TabContainer({ activeTab, children }) {
  return (
    <div>
      {Children.map(children, (child) => {
        if (child.props.tabName === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
}

export default TabContainer;
