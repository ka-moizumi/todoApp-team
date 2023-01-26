import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { exportedListData } from "./constant";
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
      if (sort === exportedListData.sortItem.id) {
        todoType = [a.id, b.id];
        return todoType[0] - todoType[1];
      } else if (sort === exportedListData.sortItem.content) {
        todoType = [a.title, b.title];
        return todoType[0] < todoType[1] ? -1 : 1;
      } else if (sort === exportedListData.sortItem.detail) {
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
        <Tab>{exportedListData.display.incomplete}</Tab>
        <Tab>{exportedListData.display.complete}</Tab>
        <SPrimaryButton onClick={onClickReverse}>
          {sortOrder
            ? exportedListData.sortOrder.desc
            : exportedListData.sortOrder.asc}
        </SPrimaryButton>
        <select name="sort" onChange={(e) => onClickSort(e)}>
          <option value={exportedListData.sortItem.id}>
            {exportedListData.display.id}
          </option>
          <option value={exportedListData.sortItem.content}>
            {exportedListData.display.content}
          </option>
          <option value={exportedListData.sortItem.detail}>
            {exportedListData.display.detail}
          </option>
          <option value={exportedListData.sortItem.deadline}>
            {exportedListData.display.deadline}
          </option>
        </select>
      </TabList>
      <TabPanel>
        <TodoTabArea
          completionStatus={0}
          todos={todos}
          onClickCompleteChange={onClickCompleteChange}
          onClickEdit={onClickEdit}
        />
      </TabPanel>
      <TabPanel>
        <TodoTabArea
          completionStatus={1}
          todos={todos}
          onClickCompleteChange={onClickCompleteChange}
          onClickEdit={onClickEdit}
        />
      </TabPanel>
    </Tabs>
  );
};
