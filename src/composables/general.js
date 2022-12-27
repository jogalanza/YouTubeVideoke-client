import useRouter from "../router/index";
//import { useRouter } from "vue-router";
import { Notify, Dialog, useQuasar } from "quasar";
import moment from "moment";
import { computed } from "vue";

var router = useRouter();

const currentFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PhP",
});

const numberFormatter = new Intl.NumberFormat("en-US");

const q = useQuasar();

export function useGeneral() {
  const mobileView = computed(() => q.screen.width < 600);

  const navigateTo = (item, replace = false) => {
    console.warn(item, replace, router);
    //if (router === undefined) router = useRouter2();
    if (item.name || item.path) {
      if (replace) {
        router.replace(item);
      } else {
        router.push(item);
      }
    }
  };

  const NotifyUser = (data, actions, opts) => {
    Notify.create({
      type:
        opts !== undefined
          ? opts.type !== undefined
            ? opts.type
            : data.success
            ? "positive"
            : "negative"
          : data.success
          ? "positive"
          : "negative",
      message: data.message,
      multiLine:
        opts !== undefined
          ? opts.multiLine !== undefined
            ? opts.multiLine
            : false
          : false,
      position:
        opts !== undefined
          ? opts.position !== undefined
            ? opts.position
            : "bottom"
          : "bottom",
      icon:
        opts !== undefined
          ? opts.icon !== undefined
            ? opts.icon
            : undefined
          : undefined,
      html: true,
      actions: actions !== undefined ? actions : undefined,
      progress:
        opts !== undefined
          ? opts.progress !== undefined
            ? opts.progress
            : false
          : false,
      timeout:
        opts !== undefined
          ? opts.timeout !== undefined
            ? opts.timeout
            : 6000
          : 6000,
    });
  };

  const ConfirmDelete = (size, okCallback) => {
    Dialog.create({
      title: "Confirm",
      message: `Would you like to delete ${size > 1 ? "these" : "this"} record${
        size > 1 ? "s" : ""
      }?`,
      cancel: true,
      ok: {
        label: "Yes",
      },
      persistent: true,
    }).onOk(() => {
      okCallback();
    });
  };

  const ConfirmAction = (msg, okCallback) => {
    Dialog.create({
      title: "Confirm",
      message: msg,
      cancel: true,
      ok: {
        label: "Yes",
      },
      persistent: true,
    }).onOk(() => {
      okCallback();
    });
  };

  const UseLightTheme = () => {
    var x = window.localStorage.getItem("app_theme");
    if (x !== null) {
      return x === "1";
    }
    return false;
  };

  const getObjValue = (arr, key, value) => {
    var x = null;
    var b = false;

    if (value !== undefined && value !== null) {
      arr.forEach((element) => {
        if ((key === undefined ? element : element[key]) === value && !b) {
          x = element;
          b = true;
        }
      });
    }
    return x;
  };

  const getObjLabel = (arr, key, value, label) => {
    var x = "";
    var b = false;
    if (value !== undefined && value !== null) {
      arr.forEach((element) => {
        if (element[key] !== undefined) {
          if (element[key] === value && !b) {
            if (element[label] !== undefined) x = element[label];
            b = true;
          }
        }
      });
    }

    return x;
  };

  const hasSelectedItem = (arr) => {
    var x = false;
    arr.every((element) => {
      if (element.isSelected) {
        x = true;
        return false;
      }
      return true;
    });

    return x;
  };

  const formatCurrency = (data) => {
    return currentFormatter.format(parseFloat(data));
  };

  const formatNumber = (data) => {
    return numberFormatter.format(parseFloat(data | "0"));
  };

  const getMoment = () => {
    return moment();
  };

  const formatDate = (data, format = "DD MMM YYYY") => {
    if (format === undefined || format === null) format = "DD MMM YYYY";
    if (!data || data == null || data == "/Date(-62135596800000)/") {
      return "";
    } else if (moment(data).isValid()) {
      return moment(data).format(format);
    } else {
      return "";
    }
  };

  const formatValue = (val, options) => {
    if (options !== undefined) {
      if (options.type !== undefined && options.type === "date") {
        return formatDate(val, options.dateFormat);
      }
    }
    return val;
  };

  const selectAll = (data) => {
    data.map((e) => {
      e.isSelected = true;
    });
  };

  const unSelectAll = (data) => {
    data.map((e) => {
      e.isSelected = false;
    });
  };

  const toggleDarkMode = () => {
    var x = window.localStorage.getItem("app_theme");

    if (x === "1") {
      window.localStorage.setItem("app_theme", "0");
      //q.dark.set(true);
    } else {
      window.localStorage.setItem("app_theme", "1");
      //q.dark.set(false);
    }
  };

  const hasKey = (arr, key) => {
    var x = false;
    if (key !== undefined) {
      arr.every((element) => {
        if (
          element.toLowerCase().substring(0, key.length) === key.toLowerCase()
        ) {
          //element.toLowerCase().indexOf(key.toLowerCase()
          x = true;
          return false;
        }
        return true;
      });
    } else {
      x = true;
    }

    return x;
  };

  //password test
  const pwMinChars = (data) => {
    let check = new RegExp("(?=.{8,})");
    return check.test(data);
  };

  const pwUppercase = (data) => {
    let check = new RegExp("(?=.*[A-Z])");
    return check.test(data);
  };

  const pwLowercase = (data) => {
    let check = new RegExp("(?=.*[a-z])");
    return check.test(data);
  };

  const pwHasDigit = (data) => {
    let check = new RegExp("(?=.*[0-9])");
    return check.test(data);
  };

  const pwMatch = (data, data2) => {
    return data === data2;
  };

  const ParseName = (r) => {
    if (r === undefined) return "";
    var x = r.split(" ");
    if (x.length > 1) {
      return x[0].substring(0, 1) + x[1].substring(0, 1);
    }

    return x[0].substring(0, 2);
  };

  const SetValueToArr = (arr, value, key) => {
    //console.warn("SetValueToArr", arr, value, key);
    if (!arr) return;
    var i = arr.indexOf(key ? value[key] : value);
    if (i === -1) {
      arr.push(key ? value[key] : value);
    } else {
      arr.splice(i, 1);
    }
  };

  const FillArr = (arr, opts, key, config) => {
    if (!arr) return;
    if (!opts) return;
    opts.forEach((e) => {
      console.warn("FillArr", arr, arr.indexOf(key !== undefined ? e[key] : e));
      if (arr.indexOf(key !== undefined ? e[key] : e) == -1) {
        if (config !== undefined && config.pushObj) {
          arr.push(e);
        } else {
          arr.push(key ? e[key] : e);
        }
      }
    });
  };

  const getMultiObjValue = (arr, key, value, evalAsString = true) => {
    var x = [];
    if (value !== undefined && value !== null) {
      value.forEach((v) => {
        arr.forEach((element) => {
          if (
            (key !== undefined && element[key] !== undefined
              ? element[key]
              : element) ===
              (key !== undefined && v[key] !== undefined ? v[key] : v) ||
            (evalAsString &&
              (key === undefined ? element : element[key]).toString() ===
                v.toString())
          ) {
            x.push(element);
          }
        });
      });
    }

    return x;
  };

  const StripHTML = (txt) => {
    var x = "";
    try {
      const regexForStripHTML = /<([^</> ]+)[^<>]*?>[^<>]*?<\/\1> */gi;
      x = txt.replaceAll(regexForStripHTML, "");
    } catch {
      //
    }

    return x;
  };

  return {
    mobileView,
    navigateTo,
    getObjValue,
    getObjLabel,
    getMoment,
    NotifyUser,
    ConfirmDelete,
    hasSelectedItem,
    formatCurrency,
    selectAll,
    unSelectAll,
    formatDate,
    UseLightTheme,
    formatValue,
    toggleDarkMode,
    ConfirmAction,
    hasKey,
    pwMinChars,
    pwUppercase,
    pwLowercase,
    pwHasDigit,
    pwMatch,
    formatNumber,
    ParseName,
    SetValueToArr,
    FillArr,
    getMultiObjValue,
    StripHTML,
  };
}
