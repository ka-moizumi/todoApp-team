import styled from "styled-components";

export const ListTable = (props) => {
  const { todos, onClickEdit, onClickcompletionChange } = props;

  return (
    <STodos>
      <thead>
        <SHeaderTr>
          <SIdTh>id</SIdTh>
          <STitleTh>内容</STitleTh>
          <SContentTh>詳細</SContentTh>
          <SPriorityTh>優先度</SPriorityTh>
          <SAdminTh>管理</SAdminTh>
        </SHeaderTr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <STodo key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.content}</td>
            <td>{todo.priority}</td>
            <td>
              <SEditButton onClick={onClickEdit}>編集</SEditButton>
              <SCompleteButton onClick={onClickcompletionChange}>
                完了
              </SCompleteButton>
            </td>
          </STodo>
        ))}
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

export const SPrimaryButton = styled.button`
  margin: 5px 10px;
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

const SHeaderTr = styled.tr`
  border-bottom: 2px solid #8da0b6;
`;

const SIdTh = styled.th`
  width: 5%;
`;

const STitleTh = styled.th`
  width: 32%;
`;

const SContentTh = styled.th`
  width: 42%;
`;

const SPriorityTh = styled.th`
  width: 7%;
`;

const SAdminTh = styled.th`
  width: 14%;
`;
