/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import PluginPage from '../PluginPage';
import SettingPage from '../SettingPage';
import AddNewWorkflow from '../SettingPage/addWorkflow';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/settings/${pluginId}`} exact>
          <SettingPage />
        </Route>
        <Route path={`/plugins/${pluginId}`} exact>
          <PluginPage />
        </Route>
        <Route path={`/settings/${pluginId}/new-workflow`}>
          <AddNewWorkflow />
        </Route>
        <Route>
          <AnErrorOccurred />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
