import useAxiosPrivate from "../hooks/usePrivateAxios";

export class UserInfo {
  constructor() {
    const axiosPrivate = useAxiosPrivate();
    this.getProfileInfo = async function (param) {
      return axiosPrivate.get("/notes/getuserinfo").then((res) => res.data);
    };
    this.renameProfile = async function (value) {
      return axiosPrivate.patch(
        "/notes/changename",
        JSON.stringify({
          value,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    };
  }
}

export class UserFriends {
  constructor() {
    var friends = [];
    const axiosPrivate = useAxiosPrivate();
    this.fetchFriends = async function (param) {
      return axiosPrivate.get("/notes/getfriends").then((res) => {
        friends = res;
        return res;
      });
    };
    this.deleteFriend = async function (data) {
      return axiosPrivate.patch(
        "/notes/deleteFriend",
        JSON.stringify({data}),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        
      );
    };
    this.sendNote = function (data) {
      return axiosPrivate.post("notes/sendTask", JSON.stringify({data}), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    };
  }
}

export class ProjectApiHandle {
  constructor() {
    const axiosPrivate = useAxiosPrivate();
    this.postProject = async function ({ title, description, team }) {
      return axiosPrivate.post(
        "/notes/postproject",
        JSON.stringify({
          title,
          description,
          team,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    };
    (this.getProjetct = async function () {
      return axiosPrivate
        .get("/notes/fetchProjectsInfo")
        .then((res) => res.data);
    }),
      (this.getProjectNotes = async function (id) {
        return axiosPrivate.post(
          "/notes/fetchProjectsTasks",
          JSON.stringify({ projectId: id }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      });
  }
}

export class ProjectTaskHandle {
  constructor() {
    const axiosPrivate = useAxiosPrivate();
    this.postTask = function ({
      projectId,
      taskId,
      title,
      msg,
      priority,
      tags,
      status,
      creator
    }) {
      return axiosPrivate.post(
        "/notes/saveProjectTask",
        JSON.stringify({
          projectId,
          taskId,
          title,
          msg,
          priority,
          tags,
          status,
          creator
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    };
    this.moveTask = function (data) {
      return axiosPrivate.patch(
        "/notes/moveProjectTask",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    };
    this.deleteTask = function (data) {
      return axiosPrivate.post(
        "/notes/deleteProjectTask",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    };
  }
}
