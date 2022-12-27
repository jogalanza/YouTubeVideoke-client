import server from "../server";

export default {
  GetApiVersion() {
    return server.post(`system/version`);
  },
  GetCurrentUser() {
    return server.post(`user/current`);
  },
  GetUserAccessMenu(_id) {
    return server.post(`user/menu/${_id}`);
  },
  GetUserSites(_id) {
    return server.post(`user/sites/${_id}`);
  },
  GetUserProducts(_id) {
    return server.post(`user/products/${_id}`);
  },
  GetUserDashboards(_id) {
    return server.post(`user/dashboards/${_id}`);
  },
  UserLogout() {
    return server.post(`user/logout`);
  },
  DashboardCommentGet(info) {
    return server.post(`dashboard/comment/get`, info);
  },
  DashboardCommentGetById(_id) {
    return server.post(`dashboard/comment/get/${_id}`);
  },
  DashboardCommentSave(info) {
    return server.post(`dashboard/comment/save`, info);
  },
  CommentDelete(id) {
    return server.post(`dashboard/comment/delete/${id}`);
  },
  CommentReplyGet(id) {
    return server.post(`dashboard/reply/get/${id}`);
  },
  CommentReplyGetById(id) {
    return server.post(`dashboard/reply/getbyid/${id}`);
  },
  CommentReplySave(info) {
    return server.post(`dashboard/reply/save`, info);
  },
  DashboardAnalyticsGet(_info, _snapshot) {
    return server.post(`dashboard/analytics/get`, {
      info: _info,
      snapshot: _snapshot,
    });
  },
  DashboardAnalyticsAuditGet(_info, _snapshot) {
    return server.post(`dashboard/analytics/audit/get`, {
      info: _info,
      snapshot: _snapshot,
    });
  },
  DashboardAnalyticsGetSingle(_info, _snapshot) {
    return server.post(`dashboard/analytics/single/get`, {
      info: _info,
      snapshot: _snapshot,
    });
  },
  DashboardAnalyticsGetById(_id) {
    return server.post(`dashboard/analytics/get/${_id}`);
  },
  DashboardAnalyticsAuditGetById(_id) {
    return server.post(`dashboard/analytics/audit/get/${_id}`);
  },
  DashboardAnalyticsSave(info) {
    return server.post(`dashboard/analytics/save`, info);
  },
  DashboardAnalyticsRestore(info) {
    return server.post(`dashboard/analytics/restore`, info);
  },
  AnalyticsDelete(id) {
    return server.post(`dashboard/analytics/delete/${id}`);
  },
  DashboardGetAll(_filter) {
    return server.post(`dashboards/getall`, _filter);
  },
  DashboardSave(_info) {
    return server.post(`dashboards/save`, _info);
  },
  DashboardDelete(_info) {
    return server.post(`dashboards/delete`, _info);
  },
  DBGroupGetAll(_filter) {
    return server.post(`dbgroup/getall`, _filter);
  },
  DBGroupSave(_info) {
    return server.post(`dbgroup/save`, _info);
  },
  DBGroupDelete(_info) {
    return server.post(`dbgroup/delete`, _info);
  },
  DashboardUserGetAll(_id, _filter) {
    return server.post(`dashboard/user/getall/${_id}`, _filter);
  },
  DashboardUserSave(_dbid, _id) {
    return server.post(`dashboard/user/save/${_dbid}/${_id}`);
  },
  DashboardUserDelete(_dbid, _id) {
    return server.post(`dashboard/user/delete/${_dbid}/${_id}`);
  },
  FiscalYearsGetAll() {
    return server.post(`snapshot/period/fiscalyears`);
  },
  SnapshotPeriodGetAll(_year) {
    return server.post(`snapshot/period/getall/${_year}`);
  },
  SnapshotPeriodSave(_dbid, _id) {
    return server.post(`snapshot/period/save/${_dbid}/${_id}`);
  },
  SnapshotPeriodDelete(_dbid, _id) {
    return server.post(`snapshot/period/delete/${_dbid}/${_id}`);
  },
  SnapshotTimeGet() {
    return server.post(`snapshot/time/get`);
  },
  SnapshotTimeSave(_info) {
    return server.post(`snapshot/time/save`, {
      label: _info,
    });
  },
  SnapshotPeriodOverride(_info) {
    return server.post(`snapshot/period/override`, _info);
  },
  SnapshotPeriodRevert(_info) {
    return server.post(`snapshot/period/setdefault`, _info);
  },
  SnapshotYears() {
    return server.post(`snapshot/years`);
  },
  DashboardViewerCount(_id) {
    return server.post(`dashboard/viewers/${_id}`);
  },
  DashboardViewers(_id) {
    return server.post(`dashboard/viewers/people/${_id}`);
  },
  //ADMIN - GROUP ACCESS
  GroupAccess_GetAll(_filter) {
    return server.post(`grpaccs/getall`, { filter: _filter });
  },
  GroupAccess_Save(_info, _menu, _user) {
    return server.post(`grpaccs/save`, {
      info: _info,
      menu: _menu,
      userId: _user,
    });
  },
  GroupAccess_Remove(_id) {
    return server.post(`grpaccs/remove`, { id: _id });
  },
  GroupAccess_Menu(_id) {
    return server.post(`grpaccs/menu`, { Id: _id });
  },
  //ADMIN - ROLES
  UserGetAll(_filter) {
    return server.post(`user/all`, _filter);
  },
  UserApproveAccess(id) {
    return server.post(`user/approve/?id=${id}`);
  },
  UserAccessRequest(_info) {
    return server.post(`access/request`, _info);
  },
  UserSave(_info, _roles, _sites, _products, _dashboards) {
    return server.post(`user/save`, {
      User: _info,
      Roles: _roles,
      Sites: _sites,
      Products: _products,
      Dashboards: _dashboards,
    });
  },
  UserDelete(_ids) {
    return server.post(`user/delete`, _ids);
  },
  UserExport(_pagination) {
    return server.post(`user/export`, _pagination, {
      responseType: "blob",
    });
  },
  GetUserHomeItems(_id, _filter) {
    return server.post(`dashboard/user/${_id}`, _filter);
  },
  SetPinnedDashboard(_id, _dbid, _status) {
    return server.post(`dashboard/pin/${_id}/${_dbid}/${_status}`);
  },
  UserRoles(_id) {
    return server.post(`user/roles/${_id}`);
  },
  RoleGetAll(_filter) {
    return server.post(`role/all`, _filter);
  },
  RoleAccessMenu(id) {
    return server.post(`role/access/menu/${id}`);
  },
  RoleSave(role, menu) {
    return server.post(`role/save`, {
      Role: role,
      Access: menu,
    });
  },
  RoleDelete(_ids) {
    return server.post(`role/delete`, _ids);
  },
  //ADMIN - EXCEPTION LOGS
  ExceptionLogs_GetAll(_filter) {
    return server.post(`exceptions/getall`, { filter: _filter });
  },
  //ADMIN - LOCALE
  Locale_GetAll(_filter) {
    return server.post(`locale/getall`, { filter: _filter });
  },
  //ADMIN - WEBHOOKS
  Webhooks_GetAll(_filter) {
    return server.post(`webhook/getall`, { filterOptions: _filter });
  },
  Webhooks_Save(_info) {
    return server.post(`webhook/save`, { info: _info });
  },
  Webhooks_Delete(_info) {
    return server.post(`webhook/delete`, { info: _info });
  },
  Webhooks_GetAllEvents() {
    return server.post(`webhook/events/getall`);
  },
  //PowerBI Reports
  EmbedReports_Get(_uid, _report) {
    return server.post(`report/embed/custom/get`, {
      userId: _uid,
      report: _report,
    });
  },
  EmbedReports_Save(info) {
    return server.post(`report/embed/custom/save`, info);
  },
  EmbedReports_Remove(_id) {
    return server.post(`report/embed/custom/delete`, {
      ID: _id,
    });
  },
};
