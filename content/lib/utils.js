export const AS_COMPONENTS = [
  "WebExtensions: Frontend",
  "WebExtensions: General",
];
// TODO: support both!!!
// const {ipcRenderer, shell} = window.require("electron");
import {prefs} from "./prefs";
import querystring from "querystring";

const FAKE_TIME = new Date().toISOString();
const FAKE_BUGS = [
  {
    id: 1441984,
    whiteboard: "[Message Center]",
    summary: "Add section reordering, snippets IndexedDB, strings, bug fixes to a Activity Stream",
    assigned_to: "khudson@mozilla.com",
    priority: "P1",
    last_change_time: FAKE_TIME,
    status: "RESOLVED",
  },
  {
    id: 1384094 	,
    whiteboard: "[Perf]",
    summary: "High CPU. network traffic and memory usage when open Newtab page if you have opened / bookmarked a problematic/ huge game page in the past",
    assigned_to: "khudson@mozilla.com",
    priority: "P1",
    last_change_time: FAKE_TIME,
    status: "ASSIGNED",
  },
  {
    id: 1421682 	,
    whiteboard: "",
    summary: "Activity Streams exhausts file descriptors capturing screenshots when large numbers of bookmarks are added at once",
    assigned_to: "khudson@mozilla.com",
    priority: "P1",
    last_change_time: FAKE_TIME,
    status: "ASSIGNED",
  },
];

export async function runQuery(query) {
  if (prefs.get("offline_debug")) return FAKE_BUGS;
  let data = {};
  const resp = await fetch("/api/bugs", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query),
    method: "POST"
  });
  try {
    data = await resp.json();
  } catch (e) {
    console.log(resp);
    console.log(query);
    console.error(e);
  }
  return data;
}

// export function runQuery(query) {
//   if (prefs.get("offline_debug")) return Promise.resolve(FAKE_BUGS);
//   return new Promise(async (resolve) => {
//     const id = Math.random();
//     const onData = (e, resp) => {
//       if (resp.id === id) {
//         ipcRenderer.removeListener("responseRunQuery", onData);
//         resolve(resp.data);
//       }
//     };
//     ipcRenderer.on("responseRunQuery", onData);
//     ipcRenderer.send("runQuery", {id, query});
//   });
// }

export function isBugResolved(bug) {
  return ["RESOLVED", "VERIFIED", "CLOSED"].includes(bug.status);
}
