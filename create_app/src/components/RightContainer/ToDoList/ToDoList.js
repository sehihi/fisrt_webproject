// ToDoList.js
import React, { useState } from "react";
import moment from "moment";
import "./ToDoList.css";

const ToDoList = ({
  tasks,
  updateTask,
  deleteTask,
  selectedDate,
  onDateChange,
}) => {
  const [editingTask, setEditingTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleEditClick = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewContent(task.content);
  };

  const handleSaveEdit = () => {
    if (editingTask) {
      updateTask(editingTask.id, {
        ...editingTask,
        title: newTitle,
        content: newContent,
      });
      setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Format the selected date to compare with task dates
  const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD");

  // Filter tasks based on the selected date
  const filteredTasks = tasks.filter(
    (task) => moment(task.date).format("YYYY-MM-DD") === formattedSelectedDate
  );

  return (
    <div>
      <h2>할 일 목록</h2>
      <div className="navigation">
        <button
          onClick={() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() - 1);
            onDateChange(newDate);
          }}
        >
          {"<"}
        </button>
        <span>{moment(selectedDate).format("YYYY년 MM월 DD일")}</span>
        <button
          onClick={() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() + 1);
            onDateChange(newDate);
          }}
        >
          {">"}
        </button>
      </div>
      <ul>
        {filteredTasks.length === 0 ? (
          <li>할 일 목록이 없습니다.</li>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id} className="todo-item">
              <div className="task-content">
                <div className="title">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      updateTask(task.id, {
                        ...task,
                        completed: !task.completed,
                      })
                    }
                  />
                  {editingTask && editingTask.id === task.id ? (
                    <input
                      type="text"
                      className="edit-input"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="제목을 입력하세요"
                    />
                  ) : (
                    <span>{task.title}</span>
                  )}
                </div>
                <div className="description">
                  {editingTask && editingTask.id === task.id ? (
                    <textarea
                      className="edit-textarea"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="내용을 입력하세요"
                    />
                  ) : (
                    <p>{task.content}</p>
                  )}
                </div>
                <div className="buttons">
                  {editingTask && editingTask.id === task.id ? (
                    <>
                      <button className="save-button" onClick={handleSaveEdit}>
                        저장
                      </button>
                      <button
                        className="cancel-button"
                        onClick={handleCancelEdit}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(task)}
                      >
                        수정
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => deleteTask(task.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
