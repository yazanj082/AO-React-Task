/* eslint-disable @typescript-eslint/no-explicit-any */

export const getAllModulesRoutes = (): any => {
  const routesFiles: [string, { default: any }][] = Object.entries(import.meta.glob('/src/**/routes.tsx', { eager: true }));
  const routes: any = [];
  routesFiles.forEach((fileRoutes: any) => {
    routes.push(...fileRoutes[1].default);
  });

  return routes;
};
