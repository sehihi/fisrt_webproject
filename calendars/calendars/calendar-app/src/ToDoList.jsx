import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function ToDoList({
  todoTasks,
  setTodoTasks,
  handleTaskDelete,
  handleTaskUpdate,
  currentDate,
  onDateChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskUpdateClick = (id, title) => {
    setSelectedTaskId(id);
    setModalInput(title);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalInput("");
  };

  const handleModalSubmit = () => {
    if (modalInput) {
      handleTaskUpdate(selectedTaskId, modalInput);
      handleModalClose();
    }
  };

  const handleCheckedDelete = () => {
    const checkedTaskIds = todoTasks
      .filter((task) => task.checked)
      .map((task) => task.id);
    checkedTaskIds.forEach((id) => handleTaskDelete(id));
  };

  return (
    <div className="todo-list-container">
      <h2>To-Do List</h2>
      <div className="date-navigation">
        <button onClick={() => onDateChange(-1)}>이전 날짜</button>
        <span>{currentDate}</span>
        <button onClick={() => onDateChange(1)}>다음 날짜</button>
      </div>
      <ul>
        {todoTasks.length === 0 ? (
          <li>할 일이 없습니다.</li>
        ) : (
          todoTasks
            .filter((task) => task.date === currentDate)
            .map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => {
                    setTodoTasks((prevTasks) =>
                      prevTasks.map((t) =>
                        t.id === task.id ? { ...t, checked: !t.checked } : t
                      )
                    );
                  }}
                />
                <span>{task.title}</span>
                <button
                  onClick={() => handleTaskUpdateClick(task.id, task.title)}
                >
                  변경
                </button>
              </li>
            ))
        )}
      </ul>
      <button className="delete-button" onClick={handleCheckedDelete}>
        체크된 항목 삭제
      </button>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="일정 제목 변경"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>일정 제목을 입력하세요</h2>
        <input
          type="text"
          value={modalInput}
          onChange={(e) => setModalInput(e.target.value)}
        />
        <button onClick={handleModalSubmit}>저장</button>
        <button onClick={handleModalClose}>닫기</button>
      </ReactModal>
    </div>
  );
}

export default ToDoList;
