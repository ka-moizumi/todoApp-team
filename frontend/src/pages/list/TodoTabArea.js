import styled from "styled-components";
import { exportedListData } from "./constant";

export const TodoTabArea = (props) => {
  const { completionStatus, onClickEdit, onClickCompleteChange, todos } = props;

  const todoList = (index) => {
    const dividedTodos = todos.filter((todo) => {
      return todo.completion === index;
    });
    return dividedTodos;
  };

  return (
    <STodos>
      <thead>
        <SHeaderTr>
          <SIdTh>{exportedListData.display.id}</SIdTh>
          <STitleTh>{exportedListData.display.content}</STitleTh>
          <SContentTh>{exportedListData.display.detail}</SContentTh>
          <SDeadlineTh>{exportedListData.display.deadline}</SDeadlineTh>
          <SAdminTh>{exportedListData.display.admin}</SAdminTh>
        </SHeaderTr>
      </thead>
      <tbody>
        {todoList(completionStatus).map((todo) => {
          return (
            <STodo key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.content}</td>
              <td>{todo.deadline}</td>
              <td>
                <SEditButton onClick={() => onClickEdit(todo)}>
                  {exportedListData.display.edit}
                </SEditButton>
                {completionStatus === 0 ? (
                  <SCompleteButton onClick={() => onClickCompleteChange(todo)}>
                    {exportedListData.display.complete}
                  </SCompleteButton>
                ) : (
                  <SBackButton onClick={() => onClickCompleteChange(todo)}>
                    {exportedListData.display.return}
                  </SBackButton>
                )}
              </td>
            </STodo>
          );
        })}
      </tbody>
    </STodos>
  );
};

const STodos = styled.table`
  text-align: left;
  width: 100%;
  margin: 20px 0 10px 0;
  border-collapse: collapse;
`;

const STodo = styled.tr`
  margin-top: 30px;
  :nth-child(even) {
    background-color: #bccddb;
  }
`;

const SHeaderTr = styled.tr`
  border-bottom: 2px solid #8da0b6;
`;

const SIdTh = styled.th`
  width: 5%;
`;

const STitleTh = styled.th`
  width: 33%;
`;

const SContentTh = styled.th`
  width: 40%;
`;

const SDeadlineTh = styled.th`
  width: 7%;
`;

const SAdminTh = styled.th`
  width: 15%;
`;

export const SPrimaryButton = styled.button`
  margin: 5px 3px;
  padding: 3px 8px;
  border-radius: 8px;
  border: none;
  background-color: #ededed;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #808080;
    color: #ffffff;
  }
`;

const SEditButton = styled(SPrimaryButton)`
  color: #fcc800;
  &:hover {
    background-color: #fcc800;
  }
`;

const SCompleteButton = styled(SPrimaryButton)`
  color: #37a34a;
  &:hover {
    background-color: #37a34a;
  }
`;

const SBackButton = styled(SPrimaryButton)`
  color: #4496d3;
  &:hover {
    background-color: #4496d3;
  }
`;
