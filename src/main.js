import SiteMenuView from "./view/site-menu.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import {UpdateType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic qC2gh6df5qrl1sa5p`;
const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const api = new Api(END_POINT, AUTHORIZATION);

const tasksModel = new TasksModel();
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

filterPresenter.init();
boardPresenter.init();

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(UpdateType.INIT, tasks);

    render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

    document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardPresenter.createTask();
    });
  })
  .catch(() => {
    tasksModel.setTasks(UpdateType.INIT, []);

    render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

    document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardPresenter.createTask();
    });
  });
