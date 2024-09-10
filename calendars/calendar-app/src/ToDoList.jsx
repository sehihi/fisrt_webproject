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
  const [modalInput, setModalInput] = useState({ title: "", content: "" });
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskUpdateClick = (id, title, content) => {
    setSelectedTaskId(id);
    setModalInput({ title, content });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalInput({ title: "", content: "" });
  };

  const handleModalSubmit = () => {
    if (modalInput.title) {
      handleTaskUpdate(selectedTaskId, modalInput.title, modalInput.content);
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
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.content}</p>
                </div>
                <button
                  onClick={() =>
                    handleTaskUpdateClick(task.id, task.title, task.content)
                  }
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
        contentLabel="일정 수정"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>일정 제목과 내용을 변경하세요</h2>
        <input
          type="text"
          value={modalInput.title}
          onChange={(e) =>
            setModalInput((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          value={modalInput.content}
          onChange={(e) =>
            setModalInput((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <button onClick={handleModalSubmit}>저장</button>
        <button onClick={handleModalClose}>닫기</button>
      </ReactModal>
    </div>
  );
}

export default ToDoList;
