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
    <>
      <TabButton tabName="textArea" setActiveTab={setActiveTab} activeTab={activeTab} />
      <TabButton tabName="imageUpload" setActiveTab={setActiveTab} activeTab={activeTab} />
      <TabButton tabName="tagsArea" setActiveTab={setActiveTab} activeTab={activeTab} />

      <TabContainer activeTab={activeTab}>
        <Tab tabName="textArea">
          <TextArea />
        </Tab>
        <Tab tabName="imageUpload">
          <ImageUpload />
        </Tab>
        <Tab tabName="tagsArea">
          <TagsArea />
        </Tab>
      </TabContainer>
    </>
  );
}

export default AddEntry;
