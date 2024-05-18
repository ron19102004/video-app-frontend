import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/auth.context";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AddVideo from "./AddVideo";

const VideoAdminPage: React.FC = () => {
  const { userCurrent } = useContext(AuthContext);
  return (
    <section>
      <Tabs position="relative" variant="unstyled">
        <TabList className="font-semibold">
          <Tab >Videos details</Tab>
          <Tab>Add video</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          borderRadius="1px"
          className="bg-primary-content-color"
        />
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <AddVideo />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
};

export default VideoAdminPage;
