import server from "../server";

export default {
  GetSites() {
    return server.post(`opts/sites`);
  },
  GetProducts() {
    return server.post(`opts/products`);
  },
  GetDashboards() {
    return server.post(`opts/dashboards`);
  },
  GetNotifs(){
    return server.post("lookup/notifs")
  }
};
