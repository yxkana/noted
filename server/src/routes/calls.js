import express from "express";

const router = express.Router({ mergeParams: true });


router.post("/notes/register", async (req, res) => {
    const email = req.body.user;
    const _identity = uniqueString();
    const _shortIdentity = _identity.slice(0, 5);
    const finallIdentity = "#" + _shortIdentity;
  
    try {
      const emails = await USER.findOne({ email: email });
      if (emails === null) {
        const user = await new USER({
          email: req.body.user,
          password: req.body.pword,
          identity: finallIdentity,
          username: req.body.user,
        }).save();
        res.status(200).send("User saved");
        console.log("User saved");
      } else {
        res.status(409).send("Error");
      }
    } catch (err) {
      res.send(err);
    }
  });
  
  /* app.get("/notes/test", (req,res)=>{
      const _identity = uniqueString();
        const _shortIdentity = _identity.slice(0,5);
        const finallIdentity = "#" + _shortIdentity;
      res.send(finallIdentity);
    
  }); */
  
  router.post("/notes/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.pwd;
  
    try {
      const user = await USER.findOne({ email: email, password: password });
      if (user !== null) {
        console.log("User find");
        const accessToken = jwt.sign(
          {
            email: email,
          },
          process.env.ACCES_TOKEN_SECRET,
          { expiresIn: "2m" }
        );
  
        const refreshToken = jwt.sign(
          {
            email: email,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "3d" }
        );
  
        user.refreshToken = refreshToken;
        const result = await user.save();
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
      } else {
        res.status(400).send("Error");
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  router.get("/notes/logout", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const foundUser = await USER.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
      return res.sendStatus(204);
    }
  
    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  });
  
  router.get("/notes/refresh", async (req, res) => {
    const cookies = req.cookies;
  
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
  
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err || user.email !== decoded.email) return res.sendStatus(403);
          const accessToken = jwt.sign(
            {
              email: user.email,
            },
            process.env.ACCES_TOKEN_SECRET,
            { expiresIn: "2m" }
          );
          res.json({ accessToken });
        }
      );
    } catch (err) {
      res.send(err);
    }
  });
  
  router.use(verifyJWT);
  
  router.post("/notes/createnote", async (req, res) => {
    const cookies = req.cookies;
    const note = req.body;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    try {
      const _note = {
        id: note.id,
        title: note.title,
        content: note.note,
        priority: note.selectedPriority,
        tags: note.tagList,
        status: "todo",
      };
  
      user.notes.unshift(_note);
      user.save();
      res.status(200);
    } catch (err) {}
  });
  
  router.post("/notes/deletenote", async (req, res) => {
    const cookies = req.cookies;
    const _index = req.body.index;
  
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    try {
      user.notes.splice(_index, 1);
      await user.save();
      res.status(200);
      res.send("Oke");
    } catch (err) {
      res.send(err);
    }
  });
  
  router.patch("/notes/movetoprogress", async (req, res) => {
    const cookies = req.cookies;
    const _index = req.body.index;
    const _id = req.body.id;
    console.log(_id);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    try {
      const user = await USER.findOneAndUpdate(
        { refreshToken, "notes.id": _id },
        { $set: { "notes.$.status": "progress" } }
      );
      console.log("succes");
      res.status(200);
      res.send("Oke");
    } catch (err) {
      console.log(err);
      return res.sendStatus(403);
    }
  });
  
  router.get("/notes/getfriends", async (req, res) => {
    const cookies = req.cookies;
    console.log("yoooooooooooooooooooooooo");
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    try {
      res.send(user.friendList);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.post("/notes/addfriend", async (req, res) => {
    console.log("ssss");
    const cookies = req.cookies;
    const _friendId = req.body.id;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    const userForAdd = await USER.findOne({ identity: _friendId }).exec();
    if (!userForAdd) return res.sendStatus(403);
    try {
      userForAdd.friendList.push({
        userId: user.identity,
        userName: user.username,
        accepted: false,
      });
      console.log("user Added");
      userForAdd.save();
    } catch (err) {
      console.log(err);
    }
  });
  
  router.post("/notes/acceptFriend", async (req, res) => {
    const cookies = req.cookies;
    const _friendId = req.body.senderId;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    try {
      const user = await USER.findOneAndUpdate(
        {
          refreshToken,
          "friendList.userId": _friendId,
        },
        { $set: { "friendList.$.accepted": true } }
      );
  
      await USER.findOneAndUpdate(
        {
          identity: _friendId,
        },
        {
          $push: { friendList: { userId: user.identity,userName: user.username, accepted: true } },
        }
      );
  
      res.status(200);
      res.send("Oke");
    } catch (err) {
      console.log(err);
    }
  });
  
  router.patch("/notes/movetocomplete", async (req, res) => {
    const cookies = req.cookies;
    const _id = req.body.id;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    try {
      const user = await USER.findOneAndUpdate(
        { refreshToken, "notes.id": _id },
        { $set: { "notes.$.status": "complete" } }
      );
      console.log(user);
      res.status(200);
      res.send("Oke");
    } catch (err) {
      console.log(err);
      return res.sendStatus(403);
    }
  });
  
  //DashBoard => UserTab => Functions
  /* ---------------------------------------- Start ---------------------------------------- */
  router.get("/notes/gg",(req,res)=>{
    res.send("Yooo");
  })
  
  
  
  router.get("/notes/getuserinfo", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    try {
      let _todo = 0;
      let _progress = 0;
      let _complete = 0;
      [...user.notes].map((item) => {
        if (item.status === "todo") {
          _todo += 1;
        } else if (item.status === "progress") {
          _progress += 1;
        } else if (item.status === "complete") {
          _complete += 1;
        }
      });
      const identity = user.identity;
      const email = user.email;
      const notesStatus = {
        todo: _todo,
        progress: _progress,
        complete: _complete,
      };
      const username = user.username;
  
      res.send(JSON.stringify({ identity, username, email, notesStatus }));
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.patch("/notes/changename", async (req, res) => {
    const _newName = req.body.value;
  
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    try {
      await USER.findOneAndUpdate({ refreshToken }, { username: _newName });
      res.status(200);
      res.send("oke");
    } catch (err) {
      console.log(err);
    }
  });
  /* ---------------------------------------- End ---------------------------------------- */
  router.get("/notes", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    try {
      const notes = user.notes.reverse();
      res.send(notes);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.post("/notes/findUser", async (req, res) => {
    const _user = req.body.user;
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
  });
  
  router.post("/notes/postproject", async (req, res) => {
    const cookies = req.cookies;
    const _project = req.body;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    try {
      const project = await new PROJECT({
        title: _project.title,
        desc: _project.description,
        tasks: [],
        team: [..._project.team, user.identity],
        todoStatus: 0,
        progressStatus: 0,
        completeStatus: 0,
      }).save();
  
      project.team.map(async (item, index) => {
        console.log(item);
        await USER.findOneAndUpdate(
          { identity: item },
          { $push: { projectList: project._id } }
        );
      });
  
      res.status(200).send();
    } catch (err) {
      console.log(err);
    }
  });
  
  router.get("/notes/fetchProjectsInfo", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await USER.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);
    const _projects = [];
    try {
      await Promise.all(
        user.projectList.map(async (item, index) => {
          await PROJECT.findOne({ _id: item })
            .exec()
            .then((data) => {
              _projects.push({
                _id: data._id,
                title: data.title,
                desc: data.desc,
                team: data.team,
                todo: data.todoStatus,
                progress: data.progressStatus,
                complete: data.completeStatus,
              });
            });
        })
      );
      res.send(_projects);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });
  
  /* Project Tasks API CRUD OPERATION */
  /* -------------------------------START------------------------------- */
  
  router.post("/notes/fetchProjectsTasks", async (req, res) => {
    const cookies = req.cookies;
    const id = req.body.projectId;
    console.log(req.body);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const project = await PROJECT.findOne({ _id: id }).exec();
    if (!project) return res.sendStatus(404);
    try {
      console.log("sssss");
      res.send(project);
    } catch (err) {
      console.log(err);
    }
  });
  
  router.post("/notes/saveProjectTask", async (req, res) => {
    const cookies = req.cookies;
    console.log("popopyyyyopopop");
    const { projectId, taskId, title, msg, priority, tags, status,creator } = req.body;
  
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const project = await PROJECT.findOne({ _id: projectId }).exec();
    if (!project) return res.sendStatus(404);
    try {
      const _note = {
        id: taskId,
        title,
        msg,
        priority,
        tags,
        status,
      };
      console.log(_note);
      console.log(project);
      project.todoStatus += 1;
      project.tasks.unshift(_note);
      project.save();
      res.status(200).send();
      res
    } catch (err) {
      console.log(err);
    }
  });
  
  router.patch("/notes/moveProjectTask", async (req, res) => {
    const cookies = req.cookies;
    const { projectId, taskId, status } = req.body;
    console.log(taskId);
  
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
  
    try {
      const _project = await PROJECT.findOneAndUpdate(
        { _id: projectId, "tasks.id": taskId },
        { $set: { "tasks.$.status": status } }
      );
  
      console.log(_project);
      if (status === "progress") {
        _project.todoStatus -= 1;
        _project.progressStatus += 1;
      } else if (status === "complete") {
        _project.progressStatus -= 1;
        _project.completeStatus += 1;
      }
      _project.save();
      console.log(_project);
  
      res.status(200).send();
    } catch (err) {
      console.log(err);
    }
  });
  
  router.post("/notes/deleteProjectTask", async (req, res) => {
    const cookies = req.cookies;
    const { projectId, taskId, index, status } = req.body;
    console.log(req.body);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const project = await PROJECT.findOne({ _id: projectId }).exec();
    if (!project) return res.sendStatus(404);
    try {
      if (status === "todo") {
        project.todoStatus -= 1;
      } else if (status === "progress") {
        project.progressStatus -= 1;
      } else if (status === "complete") {
        project.completeStatus -= 1;
      }
      project.tasks.splice(index, 1);
      await project.save();
      res.status(200);
      res.send("Oke");
    } catch (err) {
      console.log(err);
    }
  });
  /* -------------------------------END------------------------------- */
  
  router.post("/notes/sendTask", async (req, res) => {
    const cookies = req.cookies;
    const { data } = req.body;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const senderUser = await USER.findOne({ refreshToken }).exec();
    const reciverUser = await USER.findOne({ identity: data.reciver }).exec();
    if (!senderUser) return res.sendStatus(403);
    try {
      reciverUser.notes.unshift({ ...data, creator: senderUser.identity });
      reciverUser.save();
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });

  export default router