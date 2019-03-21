import React from 'react';
import {MyRoutes} from './routes';


export const getPath = function(component : React.ComponentProps<any>): any | undefined {
    const routes: any = { ...MyRoutes };
    for (let property in routes) {
        if (routes.hasOwnProperty(property)) {
            if (routes[property].component === component) {
                return routes[property].path;
            }
        }
    }
}

export const getTitle = function (component: React.ComponentProps<any>) : string | undefined{
    const routes: any = { ...MyRoutes };
    for (let property in routes) {
        if (routes.hasOwnProperty(property)) {
            if (routes[property].component === component) {
                return routes[property].title;
            }
        }
    }
}