import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "react-tabs/style/react-tabs.css";
import { TodoTabArea } from "./TodoTabArea";

export const ListTabs = (props) => {
  const { todos, setTodos, onClickCompleteChange, onClickEdit } = props;

  const [reverseToggle, setReverseToggle] = useState(false);

  const onClickReverse = () => {
    const reversedTodos = [...todos].reverse();
    setTodos(reversedTodos);
    setReverseToggle(!reverseToggle);
  };

  const onClickSort = (e) => {
    const value = e.target.value;
    let todoType;
    todos.sort((a, b) => {
      if (value === "0") {
        todoType = [a.id, b.id];
        return todoType[0] - todoType[1];
      } else if (value === "1") {
        todoType = [a.title, b.title];
        return todoType[0] < todoType[1] ? -1 : 1;
      } else if (value === "2") {
        todoType = [a.content, b.content];
        return todoType[0] < todoType[1] ? -1 : 1;
      } else {
        todoType = [new Date(a.deadline), new Date(b.deadline)];
        return todoType[0] - todoType[1];
      }
    });
    if (reverseToggle) {
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
        <Tab>未完了</Tab>
        <Tab>完了</Tab>
        <button onClick={onClickReverse}>
          {reverseToggle ? "降順" : "昇順"}
        </button>
        <select name="sort" onChange={(e) => onClickSort(e)}>
          <option value="0">ID</option>
          <option value="1">内容</option>
          <option value="2">詳細</option>
          <option value="3">優先度</option>
        </select>
      </TabList>
      <TabPanel>
        <TodoTabArea
          compIndex={0}
          todos={todos}
          onClickCompleteChange={onClickCompleteChange}
          onClickEdit={onClickEdit}
        />
      </TabPanel>
      <TabPanel>
        <TodoTabArea
          compIndex={1}
          todos={todos}
          onClickCompleteChange={onClickCompleteChange}
          onClickEdit={onClickEdit}
        />
      </TabPanel>
    </Tabs>
  );
};
