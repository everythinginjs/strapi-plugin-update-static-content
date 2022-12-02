import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import PluginPage from '../PluginPage';
import pluginId from '../../../../utils/pluginId';
import SettingPage from '../SettingPage';

const PluginRoute = () => {
  return (
    <div>
      <Switch>
        <Route path={`/settings/${pluginId}`} component={PluginPage} exact />
        <Route path={`/plugins/${pluginId}`} component={SettingPage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default PluginRoute;
