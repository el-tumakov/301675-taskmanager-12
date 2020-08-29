import SiteMenuView from "./view/site-menu.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import {generateTask} from "./mock/task.js";
import {render, RenderPosition} from "./utils/render.js";
import Api from "./api.js";

const TASK_COUNT = 25;
const AUTHORIZATION = `Basic qC2gh6df5qrl1sa5p`;
const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const api = new Api(END_POINT, AUTHORIZATION);

api.getTasks().then((tasks) => {
  console.log(tasks);
});

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
