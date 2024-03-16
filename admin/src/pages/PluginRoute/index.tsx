//TODO Check ts ignore error which seems to be an inconsistancy between react-dom and strapi.
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import PluginPage from '../PluginPage';
import pluginId from '../../pluginId';
import SettingPage from '../SettingPage';

export default function PluginRoute() {
  return (
    <div>
      {/* @ts-ignore */}
      <Switch>
        {/* @ts-ignore */}
        <Route path={`/settings/${pluginId}`} component={SettingPage} exact />
        {/* @ts-ignore */}
        <Route path={`/plugins/${pluginId}`} component={PluginPage} exact />
        {/* @ts-ignore */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
