import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { CONSTANT_DATA } from "./constant";
import { SPrimaryButton, TodoTabArea } from "./TodoTabArea";

export const ListTabs = (props) => {
  const { todos, setTodos, onClickCompleteChange, onClickEdit } = props;

  const [sortOrder, setsortOrder] = useState(false);

  // 順番を逆転
  const onClickReverse = () => {
    const reversedTodos = [...todos].reverse();
    setTodos(reversedTodos);
    setsortOrder(!sortOrder);
  };

  // ソート
  const onClickSort = (e) => {
    const sort = e.target.value;
    let todoType;
    todos.sort((a, b) => {
      if (sort === CONSTANT_DATA.sortItem.id) {
        todoType = [a.id, b.id];
        return todoType[0] - todoType[1];
      } else if (sort === CONSTANT_DATA.sortItem.content) {
        todoType = [a.title, b.title];
        return todoType[0] < todoType[1] ? -1 : 1;
      } else if (sort === CONSTANT_DATA.sortItem.detail) {
        todoType = [a.content, b.content];
        return todoType[0] < todoType[1] ? -1 : 1;
      } else {
        todoType = [new Date(a.deadline), new Date(b.deadline)];
        return todoType[0] - todoType[1];
      }
    });
    if (sortOrder) {
      const newTodos = [...todos].reverse();
      setTodos(newTodos);
    } else {
      const newTodos = [...todos];
      setTodos(newTodos);
    }
  };

  return (
    <Tabs>
      <TabList>
        <Tab>{CONSTANT_DATA.display.incomplete}</Tab>
        <Tab>{CONSTANT_DATA.display.complete}</Tab>
        <SPrimaryButton onClick={onClickReverse}>
          {sortOrder
            ? CONSTANT_DATA.sortOrder.desc
            : CONSTANT_DATA.sortOrder.asc}
        </SPrimaryButton>
        <select name="sort" onChange={(e) => onClickSort(e)}>
          <option value={CONSTANT_DATA.sortItem.id}>
            {CONSTANT_DATA.display.id}
          </option>
          <option value={CONSTANT_DATA.sortItem.content}>
            {CONSTANT_DATA.display.content}
          </option>
          <option value={CONSTANT_DATA.sortItem.detail}>
            {CONSTANT_DATA.display.detail}
          </option>
          <option value={CONSTANT_DATA.sortItem.deadline}>
            {CONSTANT_DATA.display.deadline}
          </option>
        </select>
      </TabList>
      <TabPanel>
        <TodoTabArea
          completionStatus={CONSTANT_DATA.display.status.incomplete}
          todos={todos}
          onClickCompleteChange={onClickCompleteChange}
          onClickEdit={onClickEdit}
        />
      </TabPanel>
      <TabPanel>
        <TodoTabArea
          completionStatus={CONSTANT_DATA.display.status.complete}
          todos={todos}
          onClickCompleteChange={onClickCompleteChange}
          onClickEdit={onClickEdit}
        />
      </TabPanel>
    </Tabs>
  );
};
