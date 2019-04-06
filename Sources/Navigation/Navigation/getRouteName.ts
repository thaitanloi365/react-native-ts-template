import { RouteName } from "../Navigator/Navigator";

export default function getRouteName(navigation: any): RouteName {
  let routeName = navigation ? navigation.state.routeName : "";
  if (Array.isArray(navigation.state.routes)) {
    const child1 = navigation.state.routes[navigation.state.index];
    routeName = child1.routeName;
    if (Array.isArray(child1.routes)) {
      const child2 = child1.routes[child1.index];
      routeName = child2.routeName;

      if (Array.isArray(child2.routes)) {
        const child3 = child2.routes[child2.index];
        routeName = child3.routeName;

        if (Array.isArray(child3.routes)) {
          const child4 = child3.routes[child3.index];
          routeName = child4.routeName;
        }
      }
    }
  }

  return routeName;
}
