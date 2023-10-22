import { useState } from 'react';
import TabButton from '../common/TabButton';
import TextArea from '../common/TextArea';
import ImageUpload from '../common/ImageUpload';
import TabContainer from '../common/TabContainer';
import Tab from '../common/Tab';
import TagsArea from '../common/TagsArea';

function AddEntry(){
      const [activeTab, setActiveTab] = useState('textArea');

  return (
    <div className="w-full md:w-[800px] mx-auto pt-4 md:pt-6 mb-4 border border-2 shadow-soft p-2">
      <TabButton tabName="textArea" setActiveTab={setActiveTab} activeTab={activeTab} />
      <TabButton tabName="imageUpload" setActiveTab={setActiveTab} activeTab={activeTab} />

      <TabContainer activeTab={activeTab}>
        <Tab tabName="textArea">
          <TextArea />
        </Tab>
        <Tab tabName="imageUpload">
          <ImageUpload />
        </Tab>
      </TabContainer>
      <TagsArea />
    </div>
  );
}

export default AddEntry;
