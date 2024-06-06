import loadable, { DefaultComponent } from "@loadable/component";
import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import { LoadingPage } from "./components/LoadingPage";
import { PATHS } from "../constants/paths";

const LoadingByTemplate: React.FC = () => {
  const history = useHistory();
  if (history.location.pathname.includes(PATHS.default)) {
    return <LoadingPage />;
  }
  return <LoadingPage />;
};

export function loadableWFallback(
  loadFn: (props: object) => Promise<DefaultComponent<object>>
) {
  return loadable(loadFn, {
    fallback: <LoadingByTemplate />,
  });
}

const HomePage = loadableWFallback(() => import("../pages/HomePage"));

export const Components = (block: any) => {
  if (typeof Components[block.component] !== "undefined") {
    return React.createElement(Components[block.component], {
      key: block._uid,
      block: block,
    });
  }
  return React.createElement(() => <div></div>, { key: block._uid });
};

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path={PATHS.default} component={HomePage} />

        <Redirect path="*" to={PATHS.notFound} />
      </Switch>
    </>
  );
};

export default Routes;
