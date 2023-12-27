import { styled } from '@mui/system';
import { Tabs as BaseTabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

export function UnstyledTabsVertical() {
  return (
    <Tabs defaultValue={0} orientation="vertical">
      <TabsList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabsList>
      <TabPanel value={0}>First page</TabPanel>
      <TabPanel value={1}>Second page</TabPanel>
      <TabPanel value={2}>Third page</TabPanel>
    </Tabs>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#2237FF',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

export const Tab = styled(BaseTab)`
  font-family: 'Manrope', sans-serif;
  color: black;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 400;
  background-color: transparent;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 7px;
  display: flex;
  text-align: left;
  ${'' /* justify-content: center; */}
  border-left: 1px solid #C5C5C5;
  border-radius: 0;

  &:hover {
    color: ${blue[500]};
  }

  &:focus {
    color: #fff;
    outline: none;
  }

  &.${buttonClasses.focusVisible} {
    background-color: #fff;
    color: ${blue[600]};
    
  }

  &.${tabClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
    border-left: 2px solid #2237FF;
    border-radius: 0px;
  }
`;

export const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'Manrope', sans-serif;
  font-size: 0.875rem;
  min-width: 50vw;
`;

export const Tabs = styled(BaseTabs)`
  display: flex;
  gap: 16px;
`;

export const TabsList = styled(BaseTabsList)(
  () => `
  min-width: 180px;
  text-align: left;
  background-color: #fff;
  display: flex;
  padding: 6px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `,
);
