(() => {
  var e = {
      9213: (e, t, s) => {
        "use strict";
        var r = s(1957),
          a = s(1947),
          o = s(499),
          n = s(9835);
        function i(e, t, s, r, a, o) {
          const i = (0, n.up)("router-view");
          return (0, n.wg)(), (0, n.j4)(i);
        }
        var l = s(9302),
          u = s(4006),
          d = s(6144),
          c = s(5496),
          p = s(9085),
          h = s(8339),
          v = (s(6890), s(6089));
        const m = {
          GetSites() {
            return v.Z.post("opts/sites");
          },
          GetProducts() {
            return v.Z.post("opts/products");
          },
          GetDashboards() {
            return v.Z.post("opts/dashboards");
          },
          GetNotifs() {
            return v.Z.post("lookup/notifs");
          },
        };
        var b = s(1163),
          f = s(1809);
        const g = (0, f.Q_)("options", {
          state: () => ({
            sites: [],
            products: [],
            dashboards: [],
            dbgroup: [],
            salesTrendAccts: [
              "Sales Total",
              "Trade Sales",
              "Intercompany Sales",
            ],
            fiscalYears: [],
          }),
          getters: {
            Sites: (e) => [...e.sites],
            Products: (e) => [...e.products],
            Dashboards: (e) => [...e.dashboards],
            DBGroup: (e) => [...e.dbgroup],
            Plant(e) {
              return null === e.plant
                ? [{ label: "Loading...", value: -1 }]
                : [...e.plant];
            },
            SalesTrendAccts: (e) => [...e.salesTrendAccts],
            FiscalYears: (e) => [...e.fiscalYears],
          },
          actions: {
            LoadOptions() {
              this.GetSites(),
                this.GetProducts(),
                this.GetDashboards(),
                this.GetDBGroup(),
                this.GetFiscalYears();
            },
            GetSites() {
              return new Promise((e) => {
                m.GetSites()
                  .then((t) => {
                    (this.sites = [...t.data]), e();
                  })
                  .catch(() => {
                    e();
                  });
              });
            },
            GetProducts() {
              return new Promise((e) => {
                m.GetProducts()
                  .then((t) => {
                    (this.products = [...t.data]), e();
                  })
                  .catch(() => {
                    e();
                  });
              });
            },
            GetDashboards() {
              return new Promise((e) => {
                m.GetDashboards()
                  .then((t) => {
                    (this.dashboards = [...t.data]), e();
                  })
                  .catch(() => {
                    e();
                  });
              });
            },
            GetDBGroup() {
              return new Promise((e) => {
                b.Z.DBGroupGetAll()
                  .then((t) => {
                    (this.dbgroup = [...t.data.payload.data]),
                      this.dbgroup.unshift({ value: 0, label: "Ungrouped" }),
                      e();
                  })
                  .catch(() => {
                    e();
                  });
              });
            },
            GetFiscalYears() {
              return new Promise((e) => {
                b.Z.FiscalYearsGetAll()
                  .then((t) => {
                    (this.fiscalYears = [...t.data]), e();
                  })
                  .catch(() => {
                    e();
                  });
              });
            },
          },
        });
        var y = s(3878),
          j = s.n(y);
        const w = (0, f.Q_)("notifs", {
          state: () => ({ items: [] }),
          getters: { count: (e) => e.items.length },
          actions: {
            GetItems() {
              var e = this;
              m.GetNotifs().then((t) => {
                e.items = [...t.data.payload];
              });
            },
            AddItem(e) {
              (e.timestamp = j()().format("MM/DD/yyyy HH:mm:ss")),
                this.items.unshift(e);
            },
            Remove(e) {
              this.items.splice(e, 1);
            },
            ClearAll() {
              this.items = [];
            },
          },
        });
        var S = s(5268);
        const A = {
          name: "App",
          created() {
            window.addEventListener("beforeinstallprompt", this.beforeInstall),
              window.addEventListener("appinstalled", this.appInstalled),
              window.addEventListener("appnewupdates", this.updateAvailable, {
                once: !0,
              }),
              navigator.serviceWorker &&
                navigator.serviceWorker.addEventListener(
                  "controllerchange",
                  () => {
                    this.refreshing ||
                      ((this.refreshing = !0), window.location.reload());
                  }
                );
          },
          setup() {
            const e = (0, l.Z)(),
              t = (0, d.a)(),
              s = g(),
              r = (0, h.yj)(),
              a = (0, h.tv)(),
              { hasKey: i, NotifyUser: v } = (0, c.Z)(),
              { navigateTo: m } = (0, S.k)(),
              b = (0, n.f3)("eventBus"),
              f = (0, p.h)(),
              y = w(),
              j = (0, n.f3)("HubSend"),
              A = (0, o.iH)(!1),
              D = (0, o.iH)(!1),
              k = (0, o.iH)(!1),
              Z = (0, o.iH)({}),
              I = (0, o.iH)(null),
              U = (0, n.Fl)(() => k.value);
            (0, n.YP)(
              () => t.GroupMenu,
              (e) => {
                null !== e &&
                  void 0 !== r.meta.key &&
                  (i(t.GroupMenu, r.meta.key) || m({ name: "Unauthorized" }));
              }
            ),
              (0, n.YP)(
                () => t.ActiveUser,
                (e) => {
                  void 0 !== e.ID && O();
                },
                { deep: !0 }
              );
            const G = (e, t) => t,
              P = (e) => null !== t.GroupMenu && i(t.GroupMenu, e),
              _ = (t) => {
                t.preventDefault();
                var s = e.cookies.get("install-finx-pwa");
                s || (f.SetInstallPrompt(t), f.SetInstallable(!0));
              },
              M = () => {
                f.SetInstallPrompt(null), f.SetInstallable(!1);
              },
              E = (e) => {
                console.warn("updateAvailable", e), f.SetAppUpdate(e.detail);
              };
            (0, n.JJ)("GetLocaleString", G),
              (0, n.JJ)("IsMenuOK", P),
              (0, n.JJ)("HubConnected", U),
              (0, n.JJ)("navigateTo", m);
            const R = (e) => {
                (k.value = !0),
                  (Z.value = e),
                  (0, n.Y3)(() => {
                    O();
                  });
              },
              O = () => {
                if (!D.value && k.value && void 0 !== t.ActiveUser.ID) {
                  var e = { id: t.ActiveUser.ID, connection: Z.value };
                  j({ method: "register-user", payload: JSON.stringify(e) }),
                    (D.value = !0),
                    Y();
                }
              },
              C = (e) => {
                var t = JSON.parse(e);
                if ((t.noCache || y.AddItem(t), t.showNotif)) {
                  var s =
                    t.message.length > 100
                      ? `${t.message.substring(0, 100)}...`
                      : t.message;
                  v({ success: !0, message: s }, void 0, {
                    icon: t.icon,
                    position: "bottom-left",
                    type: t.type,
                    multiLine: !0,
                  });
                }
              },
              Y = () => {
                k.value &&
                  void 0 !== t.ActiveUser.ID &&
                  j({ method: "update-hub-session", payload: t.ActiveUser.ID });
              },
              T = (e) => {
                f.SyncAppSessionInfo(e);
              },
              $ = () => {
                s.GetDashboards(), t.GetUserDashboards();
              },
              B = () => {
                console.warn("InitDashboardFilter", f.DashboardFilter);
                var e = { ...f.DashboardFilter };
                null === e.Year && (e.Year = new Date().getFullYear()),
                  f.SyncDashboardFilter(e);
              };
            return (
              (0, n.bv)(() => {
                s.LoadOptions(),
                  B(),
                  b.$on("hub-connected", R),
                  b.$on("hub-app-notif", C),
                  b.$on("hub-update-dashboards", $),
                  b.$on("hub-session-users", T),
                  (window.onbeforeunload = function () {
                    try {
                      SetDashboardOut();
                    } catch {}
                  }),
                  (I.value = setInterval(() => {
                    Y();
                  }, 1e3 * (window.finx && void 0 !== window.finx.sessionInterval ? window.finx.sessionInterval : 60)));
                window.localStorage.getItem("finx_locale");
                const e = u.Z.get("_finxrdr");
                var t = window.localStorage.getItem("finx_last");
                if (e) {
                  u.Z.remove("_finxrdr"),
                    console.warn("Parse redirect object", e, e.route, e.query);
                  try {
                    a.replace({ name: e.route, query: { ...e.query } });
                  } catch {
                    m({ name: "Home" });
                  }
                } else
                  t && -1 === ["RequestAccess", "Unauthorized"].indexOf(t)
                    ? m({ name: t })
                    : m({ name: "Home" });
              }),
              (0, n.Jd)(() => {
                b.$off("hub-connected", R),
                  b.$off("hub-app-notif", C),
                  b.$off("hub-update-dashboards", $),
                  b.$off("hub-session-users", T),
                  clearInterval(I.value);
              }),
              {
                beforeInstall: _,
                appInstalled: M,
                updateAvailable: E,
                refreshing: A,
                HubConnected: U,
              }
            );
          },
        };
        var D = s(1639);
        const k = (0, D.Z)(A, [["render", i]]),
          Z = k;
        var I = s(3340);
        const U = (0, I.h)(() => {
          const e = (0, f.WB)();
          return e;
        });
        var G = s(1249);
        async function P(e, t) {
          const s = e(Z);
          s.use(a.Z, t);
          const r = "function" === typeof U ? await U({}) : U;
          s.use(r);
          const n = (0, o.Xl)(
            "function" === typeof G.Z ? await (0, G.Z)({ store: r }) : G.Z
          );
          return (
            r.use(({ store: e }) => {
              e.router = n;
            }),
            { app: s, store: r, router: n }
          );
        }
        const _ = { config: {}, plugins: { Cookies: u.Z } },
          M = "/clientapp/dist/pwa/",
          E = /\/\//,
          R = (e) => (M + e).replace(E, "/");
        async function O({ app: e, router: t, store: s }, r) {
          let a = !1;
          const o = (e) => {
              try {
                return R(t.resolve(e).href);
              } catch (s) {}
              return Object(e) === e ? null : e;
            },
            n = (e) => {
              if (((a = !0), "string" === typeof e && /^https?:\/\//.test(e)))
                return void (window.location.href = e);
              const t = o(e);
              null !== t &&
                ((window.location.href = t), window.location.reload());
            },
            i = window.location.href.replace(window.location.origin, "");
          for (let u = 0; !1 === a && u < r.length; u++)
            try {
              await r[u]({
                app: e,
                router: t,
                store: s,
                ssrContext: null,
                redirect: n,
                urlPath: i,
                publicPath: M,
              });
            } catch (l) {
              return l && l.url
                ? void n(l.url)
                : void console.error("[Quasar] boot error:", l);
            }
          !0 !== a && (e.use(t), e.mount("#q-app"));
        }
        P(r.ri, _).then((e) => {
          const [t, r] =
            void 0 !== Promise.allSettled
              ? [
                  "allSettled",
                  (e) =>
                    e.map((e) => {
                      if ("rejected" !== e.status) return e.value.default;
                      console.error("[Quasar] boot error:", e.reason);
                    }),
                ]
              : ["all", (e) => e.map((e) => e.default)];
          return Promise[t]([
            Promise.resolve().then(s.bind(s, 6288)),
            Promise.resolve().then(s.bind(s, 1569)),
            Promise.resolve().then(s.bind(s, 1173)),
          ]).then((t) => {
            const s = r(t).filter((e) => "function" === typeof e);
            O(e, s);
          });
        });
      },
      1163: (e, t, s) => {
        "use strict";
        s.d(t, { Z: () => a });
        var r = s(6089);
        const a = {
          GetApiVersion() {
            return r.Z.post("system/version");
          },
          GetCurrentUser() {
            return r.Z.post("user/current");
          },
          GetUserAccessMenu(e) {
            return r.Z.post(`user/menu/${e}`);
          },
          GetUserSites(e) {
            return r.Z.post(`user/sites/${e}`);
          },
          GetUserProducts(e) {
            return r.Z.post(`user/products/${e}`);
          },
          GetUserDashboards(e) {
            return r.Z.post(`user/dashboards/${e}`);
          },
          UserLogout() {
            return r.Z.post("user/logout");
          },
          DashboardCommentGet(e) {
            return r.Z.post("dashboard/comment/get", e);
          },
          DashboardCommentGetById(e) {
            return r.Z.post(`dashboard/comment/get/${e}`);
          },
          DashboardCommentSave(e) {
            return r.Z.post("dashboard/comment/save", e);
          },
          CommentDelete(e) {
            return r.Z.post(`dashboard/comment/delete/${e}`);
          },
          CommentReplyGet(e) {
            return r.Z.post(`dashboard/reply/get/${e}`);
          },
          CommentReplyGetById(e) {
            return r.Z.post(`dashboard/reply/getbyid/${e}`);
          },
          CommentReplySave(e) {
            return r.Z.post("dashboard/reply/save", e);
          },
          DashboardAnalyticsGet(e, t) {
            return r.Z.post("dashboard/analytics/get", {
              info: e,
              snapshot: t,
            });
          },
          DashboardAnalyticsAuditGet(e, t) {
            return r.Z.post("dashboard/analytics/audit/get", {
              info: e,
              snapshot: t,
            });
          },
          DashboardAnalyticsGetSingle(e, t) {
            return r.Z.post("dashboard/analytics/single/get", {
              info: e,
              snapshot: t,
            });
          },
          DashboardAnalyticsGetById(e) {
            return r.Z.post(`dashboard/analytics/get/${e}`);
          },
          DashboardAnalyticsAuditGetById(e) {
            return r.Z.post(`dashboard/analytics/audit/get/${e}`);
          },
          DashboardAnalyticsSave(e) {
            return r.Z.post("dashboard/analytics/save", e);
          },
          DashboardAnalyticsRestore(e) {
            return r.Z.post("dashboard/analytics/restore", e);
          },
          AnalyticsDelete(e) {
            return r.Z.post(`dashboard/analytics/delete/${e}`);
          },
          DashboardGetAll(e) {
            return r.Z.post("dashboards/getall", e);
          },
          DashboardSave(e) {
            return r.Z.post("dashboards/save", e);
          },
          DashboardDelete(e) {
            return r.Z.post("dashboards/delete", e);
          },
          DBGroupGetAll(e) {
            return r.Z.post("dbgroup/getall", e);
          },
          DBGroupSave(e) {
            return r.Z.post("dbgroup/save", e);
          },
          DBGroupDelete(e) {
            return r.Z.post("dbgroup/delete", e);
          },
          DashboardUserGetAll(e, t) {
            return r.Z.post(`dashboard/user/getall/${e}`, t);
          },
          DashboardUserSave(e, t) {
            return r.Z.post(`dashboard/user/save/${e}/${t}`);
          },
          DashboardUserDelete(e, t) {
            return r.Z.post(`dashboard/user/delete/${e}/${t}`);
          },
          FiscalYearsGetAll() {
            return r.Z.post("snapshot/period/fiscalyears");
          },
          SnapshotPeriodGetAll(e) {
            return r.Z.post(`snapshot/period/getall/${e}`);
          },
          SnapshotPeriodSave(e, t) {
            return r.Z.post(`snapshot/period/save/${e}/${t}`);
          },
          SnapshotPeriodDelete(e, t) {
            return r.Z.post(`snapshot/period/delete/${e}/${t}`);
          },
          SnapshotTimeGet() {
            return r.Z.post("snapshot/time/get");
          },
          SnapshotTimeSave(e) {
            return r.Z.post("snapshot/time/save", { label: e });
          },
          SnapshotPeriodOverride(e) {
            return r.Z.post("snapshot/period/override", e);
          },
          SnapshotPeriodRevert(e) {
            return r.Z.post("snapshot/period/setdefault", e);
          },
          SnapshotYears() {
            return r.Z.post("snapshot/years");
          },
          DashboardViewerCount(e) {
            return r.Z.post(`dashboard/viewers/${e}`);
          },
          DashboardViewers(e) {
            return r.Z.post(`dashboard/viewers/people/${e}`);
          },
          GroupAccess_GetAll(e) {
            return r.Z.post("grpaccs/getall", { filter: e });
          },
          GroupAccess_Save(e, t, s) {
            return r.Z.post("grpaccs/save", { info: e, menu: t, userId: s });
          },
          GroupAccess_Remove(e) {
            return r.Z.post("grpaccs/remove", { id: e });
          },
          GroupAccess_Menu(e) {
            return r.Z.post("grpaccs/menu", { Id: e });
          },
          UserGetAll(e) {
            return r.Z.post("user/all", e);
          },
          UserApproveAccess(e) {
            return r.Z.post(`user/approve/?id=${e}`);
          },
          UserAccessRequest(e) {
            return r.Z.post("access/request", e);
          },
          UserSave(e, t, s, a, o) {
            return r.Z.post("user/save", {
              User: e,
              Roles: t,
              Sites: s,
              Products: a,
              Dashboards: o,
            });
          },
          UserDelete(e) {
            return r.Z.post("user/delete", e);
          },
          UserExport(e) {
            return r.Z.post("user/export", e, { responseType: "blob" });
          },
          GetUserHomeItems(e, t) {
            return r.Z.post(`dashboard/user/${e}`, t);
          },
          SetPinnedDashboard(e, t, s) {
            return r.Z.post(`dashboard/pin/${e}/${t}/${s}`);
          },
          UserRoles(e) {
            return r.Z.post(`user/roles/${e}`);
          },
          RoleGetAll(e) {
            return r.Z.post("role/all", e);
          },
          RoleAccessMenu(e) {
            return r.Z.post(`role/access/menu/${e}`);
          },
          RoleSave(e, t) {
            return r.Z.post("role/save", { Role: e, Access: t });
          },
          RoleDelete(e) {
            return r.Z.post("role/delete", e);
          },
          ExceptionLogs_GetAll(e) {
            return r.Z.post("exceptions/getall", { filter: e });
          },
          Locale_GetAll(e) {
            return r.Z.post("locale/getall", { filter: e });
          },
          Webhooks_GetAll(e) {
            return r.Z.post("webhook/getall", { filterOptions: e });
          },
          Webhooks_Save(e) {
            return r.Z.post("webhook/save", { info: e });
          },
          Webhooks_Delete(e) {
            return r.Z.post("webhook/delete", { info: e });
          },
          Webhooks_GetAllEvents() {
            return r.Z.post("webhook/events/getall");
          },
          EmbedReports_Get(e, t) {
            return r.Z.post("report/embed/custom/get", {
              userId: e,
              report: t,
            });
          },
          EmbedReports_Save(e) {
            return r.Z.post("report/embed/custom/save", e);
          },
          EmbedReports_Remove(e) {
            return r.Z.post("report/embed/custom/delete", { ID: e });
          },
        };
      },
      1569: (e, t, s) => {
        "use strict";
        s.r(t), s.d(t, { api: () => n, default: () => i });
        var r = s(3340),
          a = s(9981),
          o = s.n(a);
        const n = o().create({ baseURL: "https://api.example.com" }),
          i = (0, r.xr)(({ app: e }) => {
            (e.config.globalProperties.$axios = o()),
              (e.config.globalProperties.$api = n);
          });
      },
      1173: (e, t, s) => {
        "use strict";
        s.r(t), s.d(t, { default: () => l, eventBus: () => i });
        var r = s(3340),
          a = s(4287),
          o = s.n(a);
        const n = new (o())(),
          i = {
            $on: (...e) => n.on(...e),
            $once: (...e) => n.once(...e),
            $off: (...e) => n.off(...e),
            $emit: (...e) => n.emit(...e),
          },
          l = (0, r.xr)(({ app: e }) => {
            (e.config.globalProperties.$eventBus = i), e.provide("eventBus", i);
          });
      },
      6288: (e, t, s) => {
        "use strict";
        s.r(t), s.d(t, { default: () => i });
        var r = s(3340),
          a = s(7712);
        const o = { failed: "Action failed", success: "Action was successful" },
          n = { "en-US": o },
          i = (0, r.xr)(({ app: e }) => {
            const t = (0, a.o)({
              locale: "en-US",
              globalInjection: !0,
              messages: n,
            });
            e.use(t);
          });
      },
      5268: (e, t, s) => {
        "use strict";
        s.d(t, { k: () => a });
        s(9665);
        var r = s(1249);
        function a() {
          const e = (e, t = !1) => {
            if (e.name) {
              const s = (0, r.Z)();
              console.warn("navigatTo", s), t ? s.replace(e) : s.push(e);
            }
          };
          return { navigateTo: e };
        }
      },
      5496: (e, t, s) => {
        "use strict";
        s.d(t, { Z: () => h });
        s(9665);
        var r = s(1249),
          a = s(6827),
          o = s(919),
          n = s(9302),
          i = s(3878),
          l = s.n(i),
          u = s(9835);
        const d = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }),
          c = new Intl.NumberFormat("en-US"),
          p = (0, n.Z)();
        function h() {
          const e = (0, u.Fl)(() => p.screen.width < 600);
          function t(e, t = !1) {
            e.name && (t ? r.Z.replace(e) : r.Z.push(e));
          }
          function s(e, t, s) {
            a.Z.create({
              type:
                void 0 !== s && void 0 !== s.type
                  ? s.type
                  : e.success
                  ? "positive"
                  : "negative",
              message: e.message,
              multiLine: void 0 !== s && void 0 !== s.multiLine && s.multiLine,
              position:
                void 0 !== s && void 0 !== s.position ? s.position : "bottom",
              icon: void 0 !== s && void 0 !== s.icon ? s.icon : void 0,
              html: !0,
              actions: void 0 !== t ? t : void 0,
              progress: void 0 !== s && void 0 !== s.progress && s.progress,
              timeout: void 0 !== s && void 0 !== s.timeout ? s.timeout : 6e3,
            });
          }
          function n(e, t) {
            o.Z.create({
              title: "Confirm",
              message: `Would you like to delete ${
                e > 1 ? "these" : "this"
              } record${e > 1 ? "s" : ""}?`,
              cancel: !0,
              ok: { label: "Yes" },
              persistent: !0,
            }).onOk(() => {
              t();
            });
          }
          function i(e, t) {
            o.Z.create({
              title: "Confirm",
              message: e,
              cancel: !0,
              ok: { label: "Yes" },
              persistent: !0,
            }).onOk(() => {
              t();
            });
          }
          function h() {
            var e = window.localStorage.getItem("app_theme");
            return null !== e && "1" === e;
          }
          function v(e, t, s) {
            var r = null,
              a = !1;
            return (
              void 0 !== s &&
                null !== s &&
                e.forEach((e) => {
                  (void 0 === t ? e : e[t]) !== s || a || ((r = e), (a = !0));
                }),
              r
            );
          }
          function m(e, t, s, r) {
            var a = "",
              o = !1;
            return (
              void 0 !== s &&
                null !== s &&
                e.forEach((e) => {
                  void 0 !== e[t] &&
                    (e[t] !== s ||
                      o ||
                      (void 0 !== e[r] && (a = e[r]), (o = !0)));
                }),
              a
            );
          }
          function b(e) {
            var t = !1;
            return e.every((e) => !e.isSelected || ((t = !0), !1)), t;
          }
          function f(e) {
            return d.format(parseFloat(e));
          }
          function g(e) {
            return c.format(parseFloat("0" | e));
          }
          function y() {
            return l()();
          }
          function j(e, t = "DD MMM YYYY") {
            return (
              (void 0 !== t && null !== t) || (t = "DD MMM YYYY"),
              e &&
              null != e &&
              "/Date(-62135596800000)/" != e &&
              l()(e).isValid()
                ? l()(e).format(t)
                : ""
            );
          }
          function w(e, t) {
            return void 0 !== t && void 0 !== t.type && "date" === t.type
              ? j(e, t.dateFormat)
              : e;
          }
          function S(e) {
            e.map((e) => {
              e.isSelected = !0;
            });
          }
          function A(e) {
            e.map((e) => {
              e.isSelected = !1;
            });
          }
          function D() {
            var e = window.localStorage.getItem("app_theme");
            "1" === e
              ? window.localStorage.setItem("app_theme", "0")
              : window.localStorage.setItem("app_theme", "1");
          }
          function k(e, t) {
            var s = !1;
            return (
              void 0 !== t
                ? e.every(
                    (e) =>
                      e.toLowerCase().substring(0, t.length) !==
                        t.toLowerCase() || ((s = !0), !1)
                  )
                : (s = !0),
              s
            );
          }
          function Z(e) {
            let t = new RegExp("(?=.{8,})");
            return t.test(e);
          }
          function I(e) {
            let t = new RegExp("(?=.*[A-Z])");
            return t.test(e);
          }
          function U(e) {
            let t = new RegExp("(?=.*[a-z])");
            return t.test(e);
          }
          function G(e) {
            let t = new RegExp("(?=.*[0-9])");
            return t.test(e);
          }
          function P(e, t) {
            return e === t;
          }
          function _(e) {
            if (void 0 === e) return "";
            var t = e.split(" ");
            return t.length > 1
              ? t[0].substring(0, 1) + t[1].substring(0, 1)
              : t[0].substring(0, 2);
          }
          function M(e, t, s) {
            if (e) {
              var r = e.indexOf(s ? t[s] : t);
              -1 === r ? e.push(s ? t[s] : t) : e.splice(r, 1);
            }
          }
          function E(e, t, s, r) {
            e &&
              t &&
              t.forEach((t) => {
                console.warn("FillArr", e, e.indexOf(void 0 !== s ? t[s] : t)),
                  -1 == e.indexOf(void 0 !== s ? t[s] : t) &&
                    (void 0 !== r && r.pushObj
                      ? e.push(t)
                      : e.push(s ? t[s] : t));
              });
          }
          function R(e, t, s, r = !0) {
            var a = [];
            return (
              void 0 !== s &&
                null !== s &&
                s.forEach((s) => {
                  e.forEach((e) => {
                    ((void 0 !== t && void 0 !== e[t] ? e[t] : e) ===
                      (void 0 !== t && void 0 !== s[t] ? s[t] : s) ||
                      (r &&
                        (void 0 === t ? e : e[t]).toString() ===
                          s.toString())) &&
                      a.push(e);
                  });
                }),
              a
            );
          }
          function O(e) {
            var t = "";
            try {
              const s = /<([^</> ]+)[^<>]*?>[^<>]*?<\/\1> */gi;
              t = e.replaceAll(s, "");
            } catch {}
            return t;
          }
          return {
            mobileView: e,
            navigateTo: t,
            getObjValue: v,
            getObjLabel: m,
            getMoment: y,
            NotifyUser: s,
            ConfirmDelete: n,
            hasSelectedItem: b,
            formatCurrency: f,
            selectAll: S,
            unSelectAll: A,
            formatDate: j,
            UseLightTheme: h,
            formatValue: w,
            toggleDarkMode: D,
            ConfirmAction: i,
            hasKey: k,
            pwMinChars: Z,
            pwUppercase: I,
            pwLowercase: U,
            pwHasDigit: G,
            pwMatch: P,
            formatNumber: g,
            ParseName: _,
            SetValueToArr: M,
            FillArr: E,
            getMultiObjValue: R,
            StripHTML: O,
          };
        }
      },
      1249: (e, t, s) => {
        "use strict";
        s.d(t, { Z: () => i });
        var r = s(3340),
          a = s(8339);
        const o = [
            {
              path: "/",
              component: () =>
                Promise.all([s.e(736), s.e(288)]).then(s.bind(s, 1288)),
              children: [
                {
                  name: "Home",
                  path: "",
                  component: () =>
                    Promise.all([s.e(736), s.e(944)]).then(s.bind(s, 1944)),
                },
              ],
            },
            {
              path: "/:catchAll(.*)*",
              component: () =>
                Promise.all([s.e(736), s.e(862)]).then(s.bind(s, 1862)),
            },
          ],
          n = o,
          i = (0, r.BC)(function () {
            const e = a.r5,
              t = (0, a.p7)({
                scrollBehavior: () => ({ left: 0, top: 0 }),
                routes: n,
                history: e("/clientapp/dist/pwa/"),
              });
            return t;
          });
      },
      6089: (e, t, s) => {
        "use strict";
        s.d(t, { Z: () => i });
        var r = s(9981),
          a = s.n(r),
          o = s(4006),
          n = "/";
        (a().defaults.baseURL =
          window.pettycash && window.pettycash.serverAddress
            ? window.pettycash.serverAddress
            : n),
          (a().defaults.withCredentials = !1),
          a().interceptors.request.use(function (e) {
            return (
              "user/auth" !== e.url &&
                o.Z.set("_t", "a", {
                  expires:
                    void 0 !== window.pettycash.to &&
                    null !== window.pettycash.to
                      ? window.pettycash.to
                      : "5m",
                }),
              e
            );
          });
        const i = a();
      },
      9085: (e, t, s) => {
        "use strict";
        s.d(t, { h: () => o });
        s(9665);
        var r = s(1163),
          a = s(1809);
        const o = (0, a.Q_)("main", {
          state: () => ({
            boardTitle: "",
            SAPAutoPostIntervals: [
              { label: "10 minutes", value: 10 },
              { label: "15 minutes (default)", value: 15 },
              { label: "30 minutes", value: 30 },
              { label: "45 minutes", value: 45 },
              { label: "1 hour", value: 60 },
            ],
            darkMode: 0,
            installable: !1,
            installPrompt: null,
            connectionInfo: null,
            wsConnected: !1,
            wsName: null,
            appNewUpdates: null,
            hasNewUpdates: !1,
            currentPeriod: null,
            partners: [],
            partnerEmails: [],
            dashboardFilter: {
              Year: null,
              Month: null,
              Site: [],
              SBU: [],
              BusinessLine: [],
              ProductFamily: [],
              Function: [],
            },
            activeDashboard: {},
            activeBoards: [],
            activeRole: {},
            snapshot: { Enabled: !1, Month: 1, Year: 0 },
            snapshotYears: [],
            snapshotMonths: [],
            appSessionInfo: { Users: 0, Sessions: 0 },
            serverResources: { CPU: "N/A", RAM: "N/A" },
          }),
          getters: {
            ActiveDashboard: (e) => ({ ...e.activeDashboard }),
            ActiveBoards: (e) => ({ ...e.activeBoards }),
            DashboardFilter: (e) => e.dashboardFilter,
            getAppName: () => "App Name",
            BoardTitle: (e) => e.boardTitle,
            Years() {
              var e = new Date().getFullYear(),
                t = [e - 1, e, e + 1];
              return t;
            },
            SnapshotYears: (e) => [...e.snapshotYears],
            SelectYears: (e) => {
              var t = new Date().getFullYear(),
                s = [t - 1, t, t + 1];
              return (
                e.snapshot.Enabled &&
                  (s = [
                    e.snapshot.Year - 1,
                    e.snapshot.Year,
                    e.snapshot.Year + 1,
                  ]),
                s
              );
            },
            Months() {
              return [
                { label: "January", value: 1 },
                { label: "February", value: 2 },
                { label: "March", value: 3 },
                { label: "April", value: 4 },
                { label: "May", value: 5 },
                { label: "June", value: 6 },
                { label: "July", value: 7 },
                { label: "August", value: 8 },
                { label: "September", value: 9 },
                { label: "October", value: 10 },
                { label: "November", value: 11 },
                { label: "December", value: 12 },
              ];
            },
            Weeks() {
              var e = [],
                t = 1;
              while (t <= 53) e.push(t), t++;
              return e;
            },
            Quarters() {
              var e = [],
                t = 1;
              while (t <= 53) e.push(t), t++;
              return [
                { label: "Q1", value: 1 },
                { label: "Q2", value: 2 },
                { label: "Q3", value: 3 },
                { label: "Q4", value: 4 },
              ];
            },
            Snapshot: (e) => ({ ...e.snapshot }),
            AppSessionInfo(e) {
              return { ...e.appSessionInfo };
            },
            ServerResources(e) {
              return { ...e.serverResources };
            },
            DarkMode(e) {
              return 1 == e.darkMode;
            },
            Installable(e) {
              return e.installable;
            },
            InstallPrompt(e) {
              return e.installPrompt;
            },
            ConnectionInfo(e) {
              return e.connectionInfo;
            },
            CurrentPeriod(e) {
              return e.currentPeriod;
            },
          },
          actions: {
            SetActiveDashboard(e) {
              return new Promise((t) => {
                (this.activeDashboard = { ...e }), t();
              });
            },
            SyncDashboardFilter(e) {
              return new Promise((t) => {
                (this.dashboardFilter = { ...e }), t();
              });
            },
            AddActiveBoard(e) {
              return new Promise((t) => {
                this.activeBoards.push({ ...e }), t();
              });
            },
            GetSnapshotYears() {
              return new Promise((e, t) => {
                r.Z.SnapshotYears()
                  .then((t) => {
                    (this.snapshotYears = [...t.data]),
                      0 === this.snapshot.Year &&
                        this.snapshotYears.length > 0 &&
                        (this.snapshot.Year = this.snapshotYears[0]),
                      e();
                  })
                  .catch(() => {
                    t();
                  });
              });
            },
            GetSnapshotMonths() {
              return new Promise((e, t) => {
                r.Z.SnapshotYears()
                  .then((t) => {
                    (this.snapshotYears = [...t.data]),
                      0 === this.snapshot.Year &&
                        this.snapshotYears.length > 0 &&
                        (this.snapshot.Year = this.snapshotYears[0]),
                      e();
                  })
                  .catch(() => {
                    t();
                  });
              });
            },
            SyncSnapshot(e) {
              this.snapshot = { ...e };
            },
            SyncAppSessionInfo(e) {
              this.appSessionInfo = { ...e };
            },
            SyncServerResources(e) {
              this.serverResources = { ...e };
            },
            UpdateBoardTitle(e) {
              this.boardTitle = e;
            },
            UpdateDarkMode(e) {
              (this.darkMode = e), window.localStorage.setItem("darkMode", e);
            },
            SetInstallPrompt(e) {
              this.installPrompt = e;
            },
            SetInstallable(e) {
              this.installable = e;
            },
            GetCurrentPeriod() {
              r.Z.GetCurrentPeriod().then((e) => {
                null === e.data
                  ? (this.currentPeriod = null)
                  : ((this.currentPeriod = { ...e.data }),
                    (this.currentPeriod.Quarter = Math.ceil(
                      this.currentPeriod.Month / 3
                    )));
              });
            },
            UpdateSocketStatus(e) {
              (this.wsConnected = e), e || (this.wsName = null);
            },
            UpdateSocketName(e) {
              this.wsName = e;
            },
            SetAppUpdate(e) {
              (this.appNewUpdates = e), (this.hasNewUpdates = !0);
            },
            SetHasNewUpdates(e) {
              this.hasNewUpdates = e;
            },
            SetActiveRole(e) {
              this.activeRole = { ...e };
            },
          },
        });
      },
      6144: (e, t, s) => {
        "use strict";
        s.d(t, { a: () => o });
        s(9665);
        var r = s(1163),
          a = s(1809);
        const o = (0, a.Q_)("user", {
          state: () => ({
            activeUser: null,
            homefilter: { key: null },
            groupMenu: null,
            viewerMenu: [
              {
                label: "Home",
                key: "HOME",
                always: null,
                langkey: "HOME",
                icon: "o_home",
                link: "/",
                route: { name: "Home" },
              },
              {
                label: "Recent Dashboard",
                key: "DB",
                always: null,
                langkey: "DASHBOARD",
                icon: "o_dashboard",
                link: "/dashboard",
                route: { name: "Dashboard" },
              },
              {
                label: "Accounts and Roles",
                key: "AR",
                langkey: "ACCT_ROLES",
                icon: "r_supervised_user_circle",
                route: { name: "Accounts" },
                ignoreItems: !0,
                link: "/admin/accounts",
                items: [
                  {
                    label: "View",
                    key: "AR_VIEW",
                    langkey: "VIEW",
                    icon: "r_visibility",
                  },
                  {
                    label: "Edit",
                    key: "AR_EDIT",
                    langkey: "EDIT",
                    icon: "r_edit",
                  },
                  {
                    label: "Add Roles and Access",
                    key: "AR_ADD_ROLES",
                    langkey: "ADD_ROLES",
                    icon: "r_add",
                  },
                ],
              },
              {
                label: "Dashboards",
                key: "PBI",
                langkey: "PBI_OBJS",
                icon: "o_leaderboard",
                route: { name: "PowerBI" },
                ignoreItems: !0,
                link: "/admin/pbi",
                items: [
                  {
                    label: "View",
                    key: "PBI_VIEW",
                    langkey: "VIEW",
                    icon: "r_visibility",
                  },
                  {
                    label: "Edit",
                    key: "PBI_EDIT",
                    langkey: "EDIT",
                    icon: "r_edit",
                  },
                  {
                    label: "Add Roles and Access",
                    key: "PBI_ADD_GROUP",
                    langkey: "ADD_GROUP",
                    icon: "r_add",
                  },
                ],
              },
              {
                label: "Snapshot",
                key: "SNAPSHOT",
                langkey: "SNAPSHOT",
                icon: "o_date_range",
                route: { name: "SnapshotSettings" },
                ignoreItems: !0,
                link: "/admin/snapshot",
                items: [
                  {
                    label: "View",
                    key: "SNAPSHOT_VIEW",
                    langkey: "VIEW",
                    icon: "r_visibility",
                  },
                  {
                    label: "Edit",
                    key: "SNAPSHOT_EDIT",
                    langkey: "EDIT",
                    icon: "r_edit",
                  },
                ],
              },
              {
                label: "System Stats",
                key: "STAT",
                langkey: "STA",
                icon: "o_monitor_heart",
                route: { name: "SystemStats" },
                ignoreItems: !0,
                link: "/admin/stat",
                items: [
                  {
                    label: "View",
                    key: "STAT_VIEW",
                    langkey: "VIEW",
                    icon: "r_visibility",
                  },
                ],
              },
            ],
            genMenu: [
              {
                label: "Preferences",
                langkey: "PREF",
                icon: "r_style",
                route: { name: "Preferences" },
                link: "main/preferences",
              },
            ],
            sites: [],
            sbu: [
              { label: "Commercial", value: 1 },
              { label: "Defense & Aerospace", value: 2 },
            ],
            businessLine: [],
            productFamily: [
              { label: "Asslar", value: 1 },
              { label: "Boulder", value: 2 },
              { label: "Billerica", value: 3 },
              { label: "Montreal", value: 4 },
            ],
            functions: [
              { label: "Human Resources", value: 1 },
              { label: "General and Admin", value: 2 },
            ],
            dashboards: [],
            loadingDashboard: !1,
          }),
          getters: {
            Sites: (e) => [...e.sites],
            SBU: (e) => [...e.sbu],
            BusinessLine: (e) => [...e.businessLine],
            ProductFamily: (e) => [...e.productFamily],
            Functions: (e) => [...e.functions],
            Dashboards: (e) => [...e.dashboards],
            Menu: (e) => {
              for (
                var t = [], s = [...e.viewerMenu], r = 0;
                r < e.viewerMenu.length;
                r++
              ) {
                var a = { ...e.viewerMenu[r] },
                  o = { ...a };
                if (
                  (void 0 !== o.items && (o.items = []),
                  void 0 !== a.items && a.items.length > 0)
                )
                  for (var n = 0; n < a.items.length; n++) {
                    var i = { ...a.items[n] };
                    o.items.push(i);
                  }
                t.push(o);
              }
              return (s = [...t]), s;
            },
            ManageMenu: (e) => {
              for (var t = [], s = 0; s < e.viewerMenu.length; s++) {
                var r = { ...e.viewerMenu[s] };
                if (void 0 !== r.key && void 0 === r.always) {
                  var a = { ...r };
                  if (
                    (void 0 !== a.items && (a.items = []),
                    void 0 !== r.items && r.items.length > 0)
                  )
                    for (var o = 0; o < r.items.length; o++)
                      if (
                        void 0 !== r.items[o].key &&
                        void 0 === r.items[o].always
                      ) {
                        var n = { ...r.items[o] };
                        a.items.push(n);
                      }
                  t.push(a);
                }
              }
              return t;
            },
            GroupMenu: (e) => e.groupMenu,
            ActiveUser: (e) =>
              null === e.activeUser
                ? { Name: "Loading user ..." }
                : e.activeUser,
            IsAdmin: (e) =>
              null !== e.activeUser && 1 === e.activeUser.AccessRoleID,
            Role: (e) => (
              console.warn("USER", e, e.activeUser),
              null !== e.activeUser && void 0 !== e.activeUser.AccessRoleID
                ? e.activeUser.AccessRoleID
                : -1
            ),
            HomeFilter: (e) => e.homefilter,
            LoadingDashboard: (e) => e.loadingDashboard,
          },
          actions: {
            async SetUser(e) {
              if (null === e) this.activeUser = null;
              else {
                var t = this;
                (this.activeUser = { ...e }),
                  await r.Z.GroupAccess_Menu(e.GID).then((e) => {
                    t.groupMenu = [...e.data.payload];
                  });
              }
            },
            GetCurrentUser() {
              var e = this;
              return new Promise((t, s) => {
                r.Z.GetCurrentUser()
                  .then((s) => {
                    s.data &&
                      ((e.activeUser = { ...s.data }), e.GetUserAccessMenu()),
                      t(s.data);
                  })
                  .catch(() => {
                    s(null);
                  });
              });
            },
            GetUserAccessMenu() {
              var e = this;
              return new Promise((t, s) => {
                r.Z.GetUserAccessMenu(e.activeUser.ID)
                  .then((s) => {
                    (e.groupMenu = [...s.data]), t();
                  })
                  .catch(() => {
                    s();
                  });
              });
            },
            GetUserDashboards() {
              return new Promise((e, t) => {
                if (this.activeUser) {
                  var s = this;
                  (this.loadingDashboard = !0),
                    r.Z.GetUserHomeItems(this.activeUser.ID, this.homefilter)
                      .then((t) => {
                        (s.loadingDashboard = !1),
                          (s.dashboards = [...t.data]),
                          e();
                      })
                      .catch(() => {
                        (s.loadingDashboard = !1), t();
                      });
                } else e();
              });
            },
            GetUserSites() {
              if (this.activeUser) {
                var e = this;
                r.Z.GetUserSites(this.activeUser.ID).then((t) => {
                  e.sites = [...t.data];
                });
              }
            },
            GetUserProducts() {
              if (this.activeUser) {
                var e = this;
                r.Z.GetUserProducts(this.activeUser.ID).then((t) => {
                  e.businessLine = [...t.data];
                });
              }
            },
            SyncHomeFilter(e) {
              (this.homefilter = { ...e }), this.GetUserDashboards();
            },
          },
        });
      },
      6700: (e, t, s) => {
        var r = {
          "./af": 3902,
          "./af.js": 3902,
          "./ar": 6314,
          "./ar-dz": 5666,
          "./ar-dz.js": 5666,
          "./ar-kw": 6591,
          "./ar-kw.js": 6591,
          "./ar-ly": 7900,
          "./ar-ly.js": 7900,
          "./ar-ma": 5667,
          "./ar-ma.js": 5667,
          "./ar-sa": 4092,
          "./ar-sa.js": 4092,
          "./ar-tn": 1379,
          "./ar-tn.js": 1379,
          "./ar.js": 6314,
          "./az": 1699,
          "./az.js": 1699,
          "./be": 8988,
          "./be.js": 8988,
          "./bg": 7437,
          "./bg.js": 7437,
          "./bm": 7947,
          "./bm.js": 7947,
          "./bn": 2851,
          "./bn-bd": 4905,
          "./bn-bd.js": 4905,
          "./bn.js": 2851,
          "./bo": 7346,
          "./bo.js": 7346,
          "./br": 1711,
          "./br.js": 1711,
          "./bs": 3706,
          "./bs.js": 3706,
          "./ca": 112,
          "./ca.js": 112,
          "./cs": 6406,
          "./cs.js": 6406,
          "./cv": 1853,
          "./cv.js": 1853,
          "./cy": 9766,
          "./cy.js": 9766,
          "./da": 6836,
          "./da.js": 6836,
          "./de": 9320,
          "./de-at": 4904,
          "./de-at.js": 4904,
          "./de-ch": 6710,
          "./de-ch.js": 6710,
          "./de.js": 9320,
          "./dv": 3274,
          "./dv.js": 3274,
          "./el": 286,
          "./el.js": 286,
          "./en-au": 143,
          "./en-au.js": 143,
          "./en-ca": 237,
          "./en-ca.js": 237,
          "./en-gb": 2428,
          "./en-gb.js": 2428,
          "./en-ie": 3349,
          "./en-ie.js": 3349,
          "./en-il": 3764,
          "./en-il.js": 3764,
          "./en-in": 7809,
          "./en-in.js": 7809,
          "./en-nz": 9851,
          "./en-nz.js": 9851,
          "./en-sg": 5594,
          "./en-sg.js": 5594,
          "./eo": 4483,
          "./eo.js": 4483,
          "./es": 2184,
          "./es-do": 5777,
          "./es-do.js": 5777,
          "./es-mx": 9356,
          "./es-mx.js": 9356,
          "./es-us": 8496,
          "./es-us.js": 8496,
          "./es.js": 2184,
          "./et": 7578,
          "./et.js": 7578,
          "./eu": 2092,
          "./eu.js": 2092,
          "./fa": 5927,
          "./fa.js": 5927,
          "./fi": 171,
          "./fi.js": 171,
          "./fil": 2416,
          "./fil.js": 2416,
          "./fo": 9937,
          "./fo.js": 9937,
          "./fr": 5172,
          "./fr-ca": 8249,
          "./fr-ca.js": 8249,
          "./fr-ch": 7541,
          "./fr-ch.js": 7541,
          "./fr.js": 5172,
          "./fy": 7907,
          "./fy.js": 7907,
          "./ga": 6361,
          "./ga.js": 6361,
          "./gd": 2282,
          "./gd.js": 2282,
          "./gl": 2630,
          "./gl.js": 2630,
          "./gom-deva": 680,
          "./gom-deva.js": 680,
          "./gom-latn": 6220,
          "./gom-latn.js": 6220,
          "./gu": 6272,
          "./gu.js": 6272,
          "./he": 5540,
          "./he.js": 5540,
          "./hi": 6067,
          "./hi.js": 6067,
          "./hr": 9669,
          "./hr.js": 9669,
          "./hu": 3396,
          "./hu.js": 3396,
          "./hy-am": 6678,
          "./hy-am.js": 6678,
          "./id": 4812,
          "./id.js": 4812,
          "./is": 4193,
          "./is.js": 4193,
          "./it": 7863,
          "./it-ch": 959,
          "./it-ch.js": 959,
          "./it.js": 7863,
          "./ja": 6741,
          "./ja.js": 6741,
          "./jv": 8657,
          "./jv.js": 8657,
          "./ka": 3290,
          "./ka.js": 3290,
          "./kk": 8418,
          "./kk.js": 8418,
          "./km": 7687,
          "./km.js": 7687,
          "./kn": 1375,
          "./kn.js": 1375,
          "./ko": 2641,
          "./ko.js": 2641,
          "./ku": 3518,
          "./ku.js": 3518,
          "./ky": 5459,
          "./ky.js": 5459,
          "./lb": 1978,
          "./lb.js": 1978,
          "./lo": 6915,
          "./lo.js": 6915,
          "./lt": 8948,
          "./lt.js": 8948,
          "./lv": 2548,
          "./lv.js": 2548,
          "./me": 8608,
          "./me.js": 8608,
          "./mi": 333,
          "./mi.js": 333,
          "./mk": 6611,
          "./mk.js": 6611,
          "./ml": 999,
          "./ml.js": 999,
          "./mn": 4098,
          "./mn.js": 4098,
          "./mr": 6111,
          "./mr.js": 6111,
          "./ms": 3717,
          "./ms-my": 265,
          "./ms-my.js": 265,
          "./ms.js": 3717,
          "./mt": 8980,
          "./mt.js": 8980,
          "./my": 6895,
          "./my.js": 6895,
          "./nb": 5348,
          "./nb.js": 5348,
          "./ne": 1493,
          "./ne.js": 1493,
          "./nl": 4419,
          "./nl-be": 5576,
          "./nl-be.js": 5576,
          "./nl.js": 4419,
          "./nn": 6907,
          "./nn.js": 6907,
          "./oc-lnc": 2321,
          "./oc-lnc.js": 2321,
          "./pa-in": 9239,
          "./pa-in.js": 9239,
          "./pl": 7627,
          "./pl.js": 7627,
          "./pt": 5703,
          "./pt-br": 1623,
          "./pt-br.js": 1623,
          "./pt.js": 5703,
          "./ro": 2747,
          "./ro.js": 2747,
          "./ru": 4420,
          "./ru.js": 4420,
          "./sd": 2148,
          "./sd.js": 2148,
          "./se": 2461,
          "./se.js": 2461,
          "./si": 2783,
          "./si.js": 2783,
          "./sk": 3306,
          "./sk.js": 3306,
          "./sl": 341,
          "./sl.js": 341,
          "./sq": 2768,
          "./sq.js": 2768,
          "./sr": 2451,
          "./sr-cyrl": 3371,
          "./sr-cyrl.js": 3371,
          "./sr.js": 2451,
          "./ss": 8812,
          "./ss.js": 8812,
          "./sv": 3820,
          "./sv.js": 3820,
          "./sw": 3615,
          "./sw.js": 3615,
          "./ta": 2869,
          "./ta.js": 2869,
          "./te": 2044,
          "./te.js": 2044,
          "./tet": 5861,
          "./tet.js": 5861,
          "./tg": 6999,
          "./tg.js": 6999,
          "./th": 1772,
          "./th.js": 1772,
          "./tk": 7443,
          "./tk.js": 7443,
          "./tl-ph": 9786,
          "./tl-ph.js": 9786,
          "./tlh": 2812,
          "./tlh.js": 2812,
          "./tr": 6952,
          "./tr.js": 6952,
          "./tzl": 9573,
          "./tzl.js": 9573,
          "./tzm": 5990,
          "./tzm-latn": 6961,
          "./tzm-latn.js": 6961,
          "./tzm.js": 5990,
          "./ug-cn": 2610,
          "./ug-cn.js": 2610,
          "./uk": 9498,
          "./uk.js": 9498,
          "./ur": 3970,
          "./ur.js": 3970,
          "./uz": 9006,
          "./uz-latn": 26,
          "./uz-latn.js": 26,
          "./uz.js": 9006,
          "./vi": 9962,
          "./vi.js": 9962,
          "./x-pseudo": 8407,
          "./x-pseudo.js": 8407,
          "./yo": 1962,
          "./yo.js": 1962,
          "./zh-cn": 8909,
          "./zh-cn.js": 8909,
          "./zh-hk": 4014,
          "./zh-hk.js": 4014,
          "./zh-mo": 996,
          "./zh-mo.js": 996,
          "./zh-tw": 6327,
          "./zh-tw.js": 6327,
        };
        function a(e) {
          var t = o(e);
          return s(t);
        }
        function o(e) {
          if (!s.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          }
          return r[e];
        }
        (a.keys = function () {
          return Object.keys(r);
        }),
          (a.resolve = o),
          (e.exports = a),
          (a.id = 6700);
      },
    },
    t = {};
  function s(r) {
    var a = t[r];
    if (void 0 !== a) return a.exports;
    var o = (t[r] = { id: r, loaded: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, s), (o.loaded = !0), o.exports;
  }
  (s.m = e),
    (() => {
      var e = [];
      s.O = (t, r, a, o) => {
        if (!r) {
          var n = 1 / 0;
          for (d = 0; d < e.length; d++) {
            for (var [r, a, o] = e[d], i = !0, l = 0; l < r.length; l++)
              (!1 & o || n >= o) && Object.keys(s.O).every((e) => s.O[e](r[l]))
                ? r.splice(l--, 1)
                : ((i = !1), o < n && (n = o));
            if (i) {
              e.splice(d--, 1);
              var u = a();
              void 0 !== u && (t = u);
            }
          }
          return t;
        }
        o = o || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > o; d--) e[d] = e[d - 1];
        e[d] = [r, a, o];
      };
    })(),
    (() => {
      s.n = (e) => {
        var t = e && e.__esModule ? () => e["default"] : () => e;
        return s.d(t, { a: t }), t;
      };
    })(),
    (() => {
      s.d = (e, t) => {
        for (var r in t)
          s.o(t, r) &&
            !s.o(e, r) &&
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      };
    })(),
    (() => {
      (s.f = {}),
        (s.e = (e) =>
          Promise.all(
            Object.keys(s.f).reduce((t, r) => (s.f[r](e, t), t), [])
          ));
    })(),
    (() => {
      s.u = (e) =>
        "js/" +
        e +
        "." +
        { 288: "bdb85fdb", 862: "f32d6ef8", 944: "6c88ae5b" }[e] +
        ".js";
    })(),
    (() => {
      s.miniCssF = (e) =>
        "css/" +
        ({ 143: "app", 736: "vendor" }[e] || e) +
        "." +
        { 143: "8af4056a", 288: "9da5ed11", 736: "d85938f6" }[e] +
        ".css";
    })(),
    (() => {
      s.g = (function () {
        if ("object" === typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if ("object" === typeof window) return window;
        }
      })();
    })(),
    (() => {
      s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    })(),
    (() => {
      var e = {},
        t = "quasar-project:";
      s.l = (r, a, o, n) => {
        if (e[r]) e[r].push(a);
        else {
          var i, l;
          if (void 0 !== o)
            for (
              var u = document.getElementsByTagName("script"), d = 0;
              d < u.length;
              d++
            ) {
              var c = u[d];
              if (
                c.getAttribute("src") == r ||
                c.getAttribute("data-webpack") == t + o
              ) {
                i = c;
                break;
              }
            }
          i ||
            ((l = !0),
            (i = document.createElement("script")),
            (i.charset = "utf-8"),
            (i.timeout = 120),
            s.nc && i.setAttribute("nonce", s.nc),
            i.setAttribute("data-webpack", t + o),
            (i.src = r)),
            (e[r] = [a]);
          var p = (t, s) => {
              (i.onerror = i.onload = null), clearTimeout(h);
              var a = e[r];
              if (
                (delete e[r],
                i.parentNode && i.parentNode.removeChild(i),
                a && a.forEach((e) => e(s)),
                t)
              )
                return t(s);
            },
            h = setTimeout(
              p.bind(null, void 0, { type: "timeout", target: i }),
              12e4
            );
          (i.onerror = p.bind(null, i.onerror)),
            (i.onload = p.bind(null, i.onload)),
            l && document.head.appendChild(i);
        }
      };
    })(),
    (() => {
      s.r = (e) => {
        "undefined" !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      };
    })(),
    (() => {
      s.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e);
    })(),
    (() => {
      s.p = "/clientapp/dist/pwa/";
    })(),
    (() => {
      var e = (e, t, s, r) => {
          var a = document.createElement("link");
          (a.rel = "stylesheet"), (a.type = "text/css");
          var o = (o) => {
            if (((a.onerror = a.onload = null), "load" === o.type)) s();
            else {
              var n = o && ("load" === o.type ? "missing" : o.type),
                i = (o && o.target && o.target.href) || t,
                l = new Error(
                  "Loading CSS chunk " + e + " failed.\n(" + i + ")"
                );
              (l.code = "CSS_CHUNK_LOAD_FAILED"),
                (l.type = n),
                (l.request = i),
                a.parentNode.removeChild(a),
                r(l);
            }
          };
          return (
            (a.onerror = a.onload = o),
            (a.href = t),
            document.head.appendChild(a),
            a
          );
        },
        t = (e, t) => {
          for (
            var s = document.getElementsByTagName("link"), r = 0;
            r < s.length;
            r++
          ) {
            var a = s[r],
              o = a.getAttribute("data-href") || a.getAttribute("href");
            if ("stylesheet" === a.rel && (o === e || o === t)) return a;
          }
          var n = document.getElementsByTagName("style");
          for (r = 0; r < n.length; r++) {
            (a = n[r]), (o = a.getAttribute("data-href"));
            if (o === e || o === t) return a;
          }
        },
        r = (r) =>
          new Promise((a, o) => {
            var n = s.miniCssF(r),
              i = s.p + n;
            if (t(n, i)) return a();
            e(r, i, a, o);
          }),
        a = { 143: 0 };
      s.f.miniCss = (e, t) => {
        var s = { 288: 1 };
        a[e]
          ? t.push(a[e])
          : 0 !== a[e] &&
            s[e] &&
            t.push(
              (a[e] = r(e).then(
                () => {
                  a[e] = 0;
                },
                (t) => {
                  throw (delete a[e], t);
                }
              ))
            );
      };
    })(),
    (() => {
      var e = { 143: 0 };
      (s.f.j = (t, r) => {
        var a = s.o(e, t) ? e[t] : void 0;
        if (0 !== a)
          if (a) r.push(a[2]);
          else {
            var o = new Promise((s, r) => (a = e[t] = [s, r]));
            r.push((a[2] = o));
            var n = s.p + s.u(t),
              i = new Error(),
              l = (r) => {
                if (s.o(e, t) && ((a = e[t]), 0 !== a && (e[t] = void 0), a)) {
                  var o = r && ("load" === r.type ? "missing" : r.type),
                    n = r && r.target && r.target.src;
                  (i.message =
                    "Loading chunk " + t + " failed.\n(" + o + ": " + n + ")"),
                    (i.name = "ChunkLoadError"),
                    (i.type = o),
                    (i.request = n),
                    a[1](i);
                }
              };
            s.l(n, l, "chunk-" + t, t);
          }
      }),
        (s.O.j = (t) => 0 === e[t]);
      var t = (t, r) => {
          var a,
            o,
            [n, i, l] = r,
            u = 0;
          if (n.some((t) => 0 !== e[t])) {
            for (a in i) s.o(i, a) && (s.m[a] = i[a]);
            if (l) var d = l(s);
          }
          for (t && t(r); u < n.length; u++)
            (o = n[u]), s.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return s.O(d);
        },
        r = (globalThis["webpackChunkquasar_project"] =
          globalThis["webpackChunkquasar_project"] || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var r = s.O(void 0, [736], () => s(9213));
  r = s.O(r);
})();
